-- =============================================================================
--  Fortune Innovatives — Course landing page CMS
-- =============================================================================
--  Adds the two tables behind  Admin > Landing Pages.
--  SAFE to run on a live database: every statement is idempotent and nothing
--  existing is modified.
--
--  Run this in the Supabase SQL editor against the project pointed to by
--  VITE_SUPABASE_URL.
--
--  Until it is run, the landing pages keep working exactly as before (they fall
--  back to the content in the code) and the admin screen shows a
--  "run the migration" notice.
--
--  What is NOT in here, because it already exists in the CMS:
--    - duration / salary / career roles  -> public.courses
--    - student projects                  -> public.gallery_items (type = portfolio)
--    - placed students / hiring partners -> public.testimonials / hiring_partners
-- =============================================================================

create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
--  1) course_landing : one row per landing page, keyed by the URL slug
-- -----------------------------------------------------------------------------
create table if not exists public.course_landing (
    slug text primary key,                       -- matches /courses/<slug>

    -- Offer ------------------------------------------------------------------
    price_inr  integer check (price_inr is null or price_inr >= 0),
    mrp_inr    integer check (mrp_inr   is null or mrp_inr   >= 0),
    price_note text,                             -- e.g. "Inclusive of GST"
    emi_note   text,                             -- e.g. "EMI from ₹3,500 / month"

    -- Batch ------------------------------------------------------------------
    mode        text check (mode is null or mode in ('Online Live', 'Classroom', 'Hybrid')),
    city        text,                            -- e.g. "Tiruppur"
    batch_label text,                            -- e.g. "November batch"
    batch_start date,
    seats_left  integer check (seats_left is null or seats_left >= 0),
    timings     text,                            -- e.g. "Mon to Fri, 10 AM to 1 PM"

    -- Social proof (each is shown only when filled in) --------------------------
    rating           numeric(2,1) check (rating is null or (rating >= 0 and rating <= 5)),
    rating_count     integer check (rating_count     is null or rating_count     >= 0),
    learners_trained integer check (learners_trained is null or learners_trained >= 0),
    placement_percent integer check (placement_percent is null or (placement_percent between 0 and 100)),

    -- Content overrides (null = use the default text that ships with the site) --
    faq          jsonb,                          -- [{"q": "...", "a": "..."}]
    modules      jsonb,                          -- [{"title": "...", "topics": ["..."]}]
    tools        text[],
    demand_stats jsonb,                          -- [{"value": "32%", "label": "..."}]
    sources      text,                           -- citation line under the market chart

    updated_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
--  2) course_reviews : learner quotes shown on a landing page
--     Nothing is public until is_approved = true.
-- -----------------------------------------------------------------------------
create table if not exists public.course_reviews (
    id uuid primary key default gen_random_uuid(),

    course_slug text not null,                   -- matches course_landing.slug
    quote       text not null check (char_length(quote) between 10 and 600),
    name        text not null,
    role        text,                            -- e.g. "UI/UX Designer"
    company     text,
    image_url   text,
    rating      smallint check (rating is null or rating between 1 and 5),

    is_approved   boolean not null default false,
    display_order integer not null default 0,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists course_reviews_slug_idx
    on public.course_reviews (course_slug, display_order);

-- -----------------------------------------------------------------------------
--  updated_at maintenance
-- -----------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists course_landing_touch on public.course_landing;
create trigger course_landing_touch
    before update on public.course_landing
    for each row execute function public.touch_updated_at();

drop trigger if exists course_reviews_touch on public.course_reviews;
create trigger course_reviews_touch
    before update on public.course_reviews
    for each row execute function public.touch_updated_at();

-- -----------------------------------------------------------------------------
--  Row level security
--    course_landing : anyone can read, only logged-in admins can write
--    course_reviews : anyone can read APPROVED rows, admins can do everything
-- -----------------------------------------------------------------------------
alter table public.course_landing enable row level security;
alter table public.course_reviews enable row level security;

drop policy if exists "Public read course_landing" on public.course_landing;
create policy "Public read course_landing"
    on public.course_landing for select using (true);

drop policy if exists "Admin write course_landing" on public.course_landing;
create policy "Admin write course_landing"
    on public.course_landing for all to authenticated
    using (true) with check (true);

drop policy if exists "Public read approved course_reviews" on public.course_reviews;
create policy "Public read approved course_reviews"
    on public.course_reviews for select using (is_approved = true);

drop policy if exists "Admin read all course_reviews" on public.course_reviews;
create policy "Admin read all course_reviews"
    on public.course_reviews for select to authenticated using (true);

drop policy if exists "Admin write course_reviews" on public.course_reviews;
create policy "Admin write course_reviews"
    on public.course_reviews for all to authenticated
    using (true) with check (true);

-- -----------------------------------------------------------------------------
--  Seed one empty row per landing page so each shows up in the admin list.
--  (Empty = the page keeps using the text that ships with the site.)
-- -----------------------------------------------------------------------------
insert into public.course_landing (slug) values
    ('ui-ux-design'),
    ('digital-marketing'),
    ('fashion-cadd'),
    ('textile-garment-design'),
    ('packaging-design'),
    ('graphic-designing'),
    ('video-editing')
on conflict (slug) do nothing;

-- Ask PostgREST to refresh its schema cache so the new tables are usable now.
notify pgrst, 'reload schema';

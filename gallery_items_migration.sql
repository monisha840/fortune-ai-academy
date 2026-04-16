-- =============================================================================
--  Fortune Innovatives — gallery_items table
-- =============================================================================
--  Unified table for both "Empowerment Arena" and "Placed Students" galleries.
--  Run this in the Supabase SQL editor against the project pointed to by
--  VITE_SUPABASE_URL.
-- =============================================================================

-- Enable gen_random_uuid() (Supabase usually has this already)
create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
--  Table
-- -----------------------------------------------------------------------------
create table if not exists public.gallery_items (
    id uuid primary key default gen_random_uuid(),

    -- 'arena' = Empowerment Arena moments, 'placement' = placed students
    type text not null check (type in ('arena', 'placement')),

    -- Image source (Supabase Storage public URL or public/ asset path)
    image_url text not null,

    -- Placement-specific fields (nullable for arena)
    position text,              -- Role the student was placed as (e.g. "UI/UX Designer")
    company  text,              -- Hiring partner / company name
    location text,              -- Work city
    salary   text,              -- Optional salary highlight

    -- Optional metadata
    title       text,           -- Caption / headline (any type)
    description text,

    -- Sorting & control
    display_order integer default 0,
    is_featured   boolean default false,

    -- Timestamps
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Safe to run against an older install that doesn't yet have `position`
alter table public.gallery_items
    add column if not exists position text;

-- Keep updated_at in sync automatically
create or replace function public.set_gallery_items_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

drop trigger if exists gallery_items_set_updated_at on public.gallery_items;
create trigger gallery_items_set_updated_at
    before update on public.gallery_items
    for each row execute function public.set_gallery_items_updated_at();

-- Helpful indexes
create index if not exists gallery_items_type_order_idx
    on public.gallery_items (type, display_order);
create index if not exists gallery_items_featured_idx
    on public.gallery_items (is_featured) where is_featured = true;

-- -----------------------------------------------------------------------------
--  Row Level Security
-- -----------------------------------------------------------------------------
alter table public.gallery_items enable row level security;

-- Public can read everything
drop policy if exists "Public can view gallery" on public.gallery_items;
create policy "Public can view gallery"
    on public.gallery_items
    for select
    using (true);

-- Authenticated admins can write
drop policy if exists "Admin can insert" on public.gallery_items;
create policy "Admin can insert"
    on public.gallery_items
    for insert
    with check (auth.role() = 'authenticated');

drop policy if exists "Admin can update" on public.gallery_items;
create policy "Admin can update"
    on public.gallery_items
    for update
    using (auth.role() = 'authenticated');

drop policy if exists "Admin can delete" on public.gallery_items;
create policy "Admin can delete"
    on public.gallery_items
    for delete
    using (auth.role() = 'authenticated');

-- =============================================================================
--  Seed data — mirrors the hard-coded arrays currently in src/pages/Gallery.tsx
--  Safe to re-run: we clear existing rows first so the seed is idempotent.
--  Comment out the DELETE if you only want to add rows.
-- =============================================================================
delete from public.gallery_items;

-- ---------- Arena (15 images) ------------------------------------------------
insert into public.gallery_items (type, image_url, display_order) values
    ('arena', '/gallery/arena/arena1.png',  1),
    ('arena', '/gallery/arena/arena2.png',  2),
    ('arena', '/gallery/arena/arena3.png',  3),
    ('arena', '/gallery/arena/arena4.png',  4),
    ('arena', '/gallery/arena/arena5.png',  5),
    ('arena', '/gallery/arena/arena6.png',  6),
    ('arena', '/gallery/arena/arena7.png',  7),
    ('arena', '/gallery/arena/arena8.png',  8),
    ('arena', '/gallery/arena/arena9.png',  9),
    ('arena', '/gallery/arena/arena10.png', 10),
    ('arena', '/gallery/arena/arena11.png', 11),
    ('arena', '/gallery/arena/arena12.png', 12),
    ('arena', '/gallery/arena/arena13.png', 13),
    ('arena', '/gallery/arena/arena14.png', 14),
    ('arena', '/gallery/arena/arena15.png', 15);

-- ---------- Placements (17 students) ----------------------------------------
-- `position` = role shown on the announcement card
-- `company`  = partner logo shown at the bottom of the card
-- `location` = work city printed next to the role
insert into public.gallery_items
    (type, image_url, position, company, location, display_order)
values
    ('placement', '/gallery/placements/anjalien.jpeg',     'Front End Developer',                   'Connex',                              'Salem',      1),
    ('placement', '/gallery/placements/dhanusri.png',      'Graphic Designer',                      'Texture Graphic Solutions',           'Perundurai', 2),
    ('placement', '/gallery/placements/gayathri.png',      'UI Designer (Creative Trainee)',        'Bean Infotech',                       'Coimbatore', 3),
    ('placement', '/gallery/placements/manikandan.png',    'UI/UX Designer (Intern)',               'The Coding Cult',                     'Hyderabad',  4),
    ('placement', '/gallery/placements/suberiya.png',      'Architect Editor',                      'EPYX Creations',                      'Kangeyam',   5),
    ('placement', '/gallery/placements/surya-prakash.jpeg','Junior Graphic Designer',               'Nextab Branding',                     'Coimbatore', 6),
    ('placement', '/gallery/placements/tamil.png',         'UI/UX Designer',                        'Cloud & Clouds',                      'Singapore',  7),
    ('placement', '/gallery/placements/student1.png',      'Graphic Designer + Digital Marketing',  'Coimbatore Baby Props & Baby Studio', 'Coimbatore', 8),
    ('placement', '/gallery/placements/student2.png',      'Graphic Designer',                      'Yuga Toys',                           'Erode',      9),
    ('placement', '/gallery/placements/student3.png',      'Graphic Designer',                      'Astro',                               'Chennai',    10),
    ('placement', '/gallery/placements/student4.png',      'Graphic Designer',                      'Dazzle Tech Solutions',               'Coimbatore', 11),
    ('placement', '/gallery/placements/student5.png',      'Printing Designer',                     'AS International Zoza',               'Tirupur',    12),
    ('placement', '/gallery/placements/student6.png',      'UX/UI Designer (Intern)',               'Hypergrow',                           'Coimbatore', 13),
    ('placement', '/gallery/placements/student7.png',      'Frontend Developer (Intern)',           'VizWeb Solutions',                    'Tirupur',    14),
    ('placement', '/gallery/placements/student8.png',      'Frontend Developer (Intern)',           'VizWeb Solutions',                    'Tirupur',    15),
    ('placement', '/gallery/placements/student9.png',      'Graphic Designer',                      'Yuva FX Info Solution',               'Coimbatore', 16),
    ('placement', '/gallery/placements/student10.png',     'Graphic Designer',                      'Kalso Digital',                       'Tirupur',    17);

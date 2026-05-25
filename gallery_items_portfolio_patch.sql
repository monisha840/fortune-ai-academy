-- =============================================================================
--  Fortune Innovatives — Portfolio patch for gallery_items
-- =============================================================================
--  SAFE to run on a live database. Adds the columns + extended CHECK constraints
--  needed for the new "portfolio" gallery type. Does NOT touch existing rows.
--
--  Run this in the Supabase SQL editor against the project pointed to by
--  VITE_SUPABASE_URL.
-- =============================================================================

-- 1. New columns (idempotent — safe to re-run)
alter table public.gallery_items
    add column if not exists media_type text default 'image';

alter table public.gallery_items
    add column if not exists student_name text;

alter table public.gallery_items
    add column if not exists course_name text;

-- 2. Backfill: existing rows get media_type = 'image'
update public.gallery_items
   set media_type = 'image'
 where media_type is null;

-- 3. Re-apply CHECK constraints so the table accepts 'portfolio' + video
alter table public.gallery_items
    drop constraint if exists gallery_items_type_check;
alter table public.gallery_items
    add constraint gallery_items_type_check
    check (type in ('arena', 'placement', 'portfolio'));

alter table public.gallery_items
    drop constraint if exists gallery_items_media_type_check;
alter table public.gallery_items
    add constraint gallery_items_media_type_check
    check (media_type in ('image', 'video'));

-- 4. Nudge PostgREST to refresh its schema cache (otherwise the API
--    keeps returning "Could not find the 'course_name' column..." for a minute)
notify pgrst, 'reload schema';

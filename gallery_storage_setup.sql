-- =============================================================================
--  Fortune Innovatives — gallery-images storage bucket policies
-- =============================================================================
--  Run this AFTER creating a public bucket named `gallery-images` in
--  Supabase → Storage. It allows logged-in admins to upload / replace / delete
--  files, while keeping reads public.
-- =============================================================================

-- Public read (anyone can view images)
drop policy if exists "Public read gallery-images" on storage.objects;
create policy "Public read gallery-images"
    on storage.objects
    for select
    using (bucket_id = 'gallery-images');

-- Authenticated admins can upload
drop policy if exists "Admin upload gallery-images" on storage.objects;
create policy "Admin upload gallery-images"
    on storage.objects
    for insert
    with check (
        bucket_id = 'gallery-images'
        and auth.role() = 'authenticated'
    );

-- Authenticated admins can overwrite / rename
drop policy if exists "Admin update gallery-images" on storage.objects;
create policy "Admin update gallery-images"
    on storage.objects
    for update
    using (
        bucket_id = 'gallery-images'
        and auth.role() = 'authenticated'
    );

-- Authenticated admins can delete
drop policy if exists "Admin delete gallery-images" on storage.objects;
create policy "Admin delete gallery-images"
    on storage.objects
    for delete
    using (
        bucket_id = 'gallery-images'
        and auth.role() = 'authenticated'
    );

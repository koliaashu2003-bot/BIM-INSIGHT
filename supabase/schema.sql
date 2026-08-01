-- ============================================================================
-- BIM Insight — Supabase setup for the shared community script library.
-- Run this in your Supabase project: Dashboard → SQL Editor → New query → paste
-- → Run. Then create the Storage bucket (see the Storage section at the bottom).
-- Free tier only; no paid features used.
-- ============================================================================

-- 1) Metadata table -----------------------------------------------------------
create table if not exists public.scripts (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  description    text not null default '',
  category       text not null default 'Modeling',
  author_name    text not null default 'Anonymous',
  dynamo_version text,
  revit_version  text,
  tags           text[],
  file_path      text not null,             -- path inside the "scripts" bucket
  created_at     timestamptz not null default now()
);

-- 2) Row-Level Security -------------------------------------------------------
alter table public.scripts enable row level security;

-- Anyone (even not logged in) can READ scripts → public browse.
drop policy if exists "scripts public read" on public.scripts;
create policy "scripts public read"
  on public.scripts for select
  to anon, authenticated
  using (true);

-- Anyone can INSERT a script (simple, name-based uploads — no login needed).
-- Tighten to "to authenticated" later if you want to require sign-in.
drop policy if exists "scripts public insert" on public.scripts;
create policy "scripts public insert"
  on public.scripts for insert
  to anon, authenticated
  with check (
    length(title) between 1 and 200
    and length(coalesce(description, '')) <= 4000
    and file_path is not null
  );

-- (No update/delete policies → those are denied for anon/authenticated.)

-- ============================================================================
-- 3) Storage bucket  (do this in the dashboard, then run the policies below)
-- ----------------------------------------------------------------------------
-- Dashboard → Storage → New bucket:
--     Name:   scripts
--     Public: ON  (so files are downloadable via a public URL)
--     (optional) Restrict file size to 5 MB.
--
-- Then run these Storage policies (SQL Editor). They let anyone upload to and
-- read from the "scripts" bucket. Public read is also implied by the bucket
-- being public, but this makes uploads work:
-- ============================================================================

drop policy if exists "scripts bucket read" on storage.objects;
create policy "scripts bucket read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'scripts');

drop policy if exists "scripts bucket insert" on storage.objects;
create policy "scripts bucket insert"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'scripts');

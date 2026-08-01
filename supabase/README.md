# Supabase setup — shared community script library

The script library reads/writes to Supabase (free tier). Do this once, then
paste two values into `src/config.ts` and the shared library goes live.

## 1. Create the project
1. **supabase.com** → sign in → **New project** (name `bim-insight`, set a DB password, pick a region).
2. When it's ready: **Settings → API** → copy the **Project URL** and the **anon public** key.

## 2. Create the table + policies
- **SQL Editor → New query** → paste the contents of [`schema.sql`](./schema.sql) → **Run**.

## 3. Create the Storage bucket
- **Storage → New bucket** → Name `scripts`, **Public: ON** → Create.
- (The last two policies in `schema.sql` allow uploading to it — run them if you
  hadn't already.)

## 4. Wire the app
In `src/config.ts` set:

```ts
export const SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co'
export const SUPABASE_ANON_KEY = 'YOUR-ANON-PUBLIC-KEY'
```

The anon key is **safe to commit** — it's public by design; security comes from
the Row-Level Security policies above.

## What this gives you
- Anyone can **browse and download** every uploaded script (public read).
- Uploads push the `.dyn` to Storage and the metadata to the `scripts` table —
  visible to **all users worldwide**, not just the uploader's browser.
- No paid features. Free-tier limits: 500 MB DB, 1 GB storage, 5 GB egress/mo —
  plenty for a beta. (A free project pauses after ~7 days of no activity; open
  the dashboard to wake it.)

## Optional hardening later
- Require login to upload: change the insert policy `to authenticated` (both the
  table and the storage bucket), and gate the upload UI behind sign-in.
- Add moderation: add a `status` column defaulting to `pending` and only select
  `status = 'approved'` in `listCommunityScripts`, with an admin approving rows.

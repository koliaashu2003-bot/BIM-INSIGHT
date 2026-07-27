# Backend security rules (for the Firebase migration)

The live site is currently a **client-side prototype** — accounts, uploads, and
likes/comments live in each visitor's `localStorage`. There is **no Firebase
project wired up yet**, so there are no live rules to audit.

When the platform moves onto Firebase (or an equivalent), apply these first —
they lock the database and storage down instead of the dangerous default
`allow read, write: if true;`:

- **`firestore.rules`** — authenticated writes only, per-user ownership on
  profiles/scripts, public reads limited to `status == 'approved'` (moderation
  gate), and social sub-collections owned by their author. Approval to
  `approved` is done by an admin via the Admin SDK / a Cloud Function, never by
  the uploading client.
- **`storage.rules`** — only the signed-in owner may upload, `.dyn` only, 5 MB
  cap (mirrors the client validation server-side).

## Apply

```bash
# Firestore rules
firebase deploy --only firestore:rules

# Storage rules
firebase deploy --only storage
```

Or paste the contents into Firebase Console → Firestore → Rules / Storage →
Rules.

> Supabase is an alternative that gives the same building blocks (Auth +
> Postgres + Storage) with Row-Level Security policies instead of these rules.

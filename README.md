# BIM Insight

A multi-page web app for the AEC crowd: a timed quiz on the software stack, plus
a library where you can download and share Dynamo scripts.

**Live:** https://koliaashu2003-bot.github.io/BIM-INSIGHT/

## Pages

- **Home** — landing / value prop, with a lightweight animated SVG skyline.
- **Quiz** — 29 shuffled questions across 7 tools (Revit, AutoCAD & Civil 3D,
  Navisworks, Rhino & Grasshopper, Dynamo, ACC & BIM 360, Add-ins & Plugins),
  25s per question, per-category scoring, and a canvas-rendered shareable card.
- **Script Library** — download starter **Python-node scripts** (`.py`, paste
  into a Dynamo Python node) and community-uploaded **`.dyn` graphs**; like,
  rate and comment (sign-in required). Download counts are tracked live.
- **Share a Script** — submission form for the beta.
- **Dashboard** — after sign-in: uploads, "My scripts", and (for admins) a
  moderation queue to approve/reject pending uploads.
- **About / Terms**.

## Important: this is a client-side prototype

Accounts, uploads, likes/ratings/comments and download counts are stored in the
**visitor's own `localStorage`** — they do not yet sync across devices or users.
Making it a real multi-user platform means adding a backend (see below). The
demo auth is **not secure** (weak hash, client-side) — a placeholder for real
auth, so users are warned not to reuse a real password.

## Stack

React 19 + TypeScript + Vite + React Router (BrowserRouter with a GitHub Pages
SPA 404 redirect). The quiz engine is a `useReducer` (`src/state/quizReducer.ts`,
`src/hooks/useQuizEngine.ts`). No 3D dependency — the hero is inline SVG/CSS.

## Configuration (`src/config.ts`)

- `FEEDBACK_FORM_URL` — Google Form for the footer/result feedback link.
- `SUBMIT_FORM_URL` / `SUBMIT_EMAIL` — where "Share a script" goes.
- `EMAIL_CAPTURE_URL` — set to a Formspree endpoint to actually **receive**
  emails from the quiz's unlock gate (otherwise localStorage only).
- `ADMIN_EMAILS` — emails that can see the moderation queue on the dashboard.

## Development / Build

```bash
npm install
npm run dev
npm run build   # tsc + vite
npm run preview
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml` → builds and publishes
`dist/` to GitHub Pages. Vite `base` is `/BIM-INSIGHT/`.

## Next: a real backend

`backend/firestore.rules` and `backend/storage.rules` contain ready-to-apply,
locked-down rules for a Firebase migration. Supabase (Auth + Postgres + Storage
with Row-Level Security) is an equally good fit and would replace the localStorage
auth/uploads/social with genuine multi-user data.

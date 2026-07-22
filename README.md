# BIM Insight Quiz

A single-page, timed multiple-choice quiz on Revit, Navisworks, BIM coordination, and ISO 19650 — built as a lead magnet for BIM Insights.

**Live:** https://koliaashu2003-bot.github.io/BIM-INSIGHT/

## Features

- 29 questions across 4 categories, shuffled per attempt, 25s timer each
- Score + per-category breakdown, with a canvas-rendered shareable result image
- Share to WhatsApp / LinkedIn / X, native Web Share, or copy link
- Open Graph + Twitter Card meta tags so results preview nicely when shared
- Detailed explanations gated behind an email capture (mailing-list building)
- Personal history/leaderboard stored in `localStorage`
- Light/dark theme via React Context, persisted locally
- Light 3D flourishes: a rotating wireframe "building" (react-three-fiber) behind the UI, and CSS 3D tilt on cards

## Stack

React 19 + TypeScript + Vite. State is driven by a `useReducer` quiz engine (`src/state/quizReducer.ts`, `src/hooks/useQuizEngine.ts`).

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # type-checks with tsc, then builds with vite
npm run preview
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the app and publishes `dist/` to GitHub Pages via `actions/deploy-pages`. You can also trigger it manually from the Actions tab (`workflow_dispatch`).

The Vite `base` in `vite.config.ts` is set to `/BIM-INSIGHT/` to match this repo's Pages URL — update it if the repo is renamed or moved.

## Wiring up a real mailing list

Email capture in `src/utils/storage.ts` (`saveEmail`) currently only writes to the visitor's own `localStorage` — there's no backend on GitHub Pages to collect it centrally. To actually build a list, POST the email from that function to an ESP endpoint (Mailchimp, ConvertKit, Formspree, etc.).

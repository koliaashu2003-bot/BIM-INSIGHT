# BIM Insight

A multi-page platform where the **AEC industry** (Architecture, Engineering, Construction) builds together — exchange Dynamo scripts, share blogs and knowledge, grow a professional community, and test your skills.

**Live:** https://koliaashu2003-bot.github.io/BIM-INSIGHT/

## Pages

- **Home** — animated 3D hero (a Dynamo-style node graph), platform overview, stats, and how-it-works.
- **Dynamo Exchange** (`/exchange`) — browse, search, filter, sort, preview, "like", and download Dynamo graphs. Upload your own scripts (persisted to your browser). Downloads generate a real `.dyn` JSON file.
- **Blog** (`/blog`, `/blog/:slug`) — field-note articles on BIM management, computational design, coordination, and interoperability, with category filtering and social sharing.
- **Community** (`/community`) — discussions, upcoming events, featured members, live stats, and a newsletter join form.
- **Quiz** (`/quiz`) — the original timed AEC knowledge quiz, now a page within the platform.
- **About** (`/about`) — mission, values, and disciplines served.
- **Contact** (`/contact`) — a validated contact form.

## Features

- Multi-page routing with `react-router-dom` (`HashRouter`, so deep links work on GitHub Pages with no server config).
- Persistent, theme-aware **3D backgrounds** with react-three-fiber — a rotating wireframe city site-wide, plus a node-graph hero on the home page.
- Light/dark theme via React Context, persisted to `localStorage`.
- Fully client-side: user-uploaded scripts, likes, newsletter, and quiz history live in `localStorage`, so the whole flow works with no backend.
- Responsive throughout, with a collapsible mobile nav.
- Open Graph + Twitter Card meta tags for nice link previews.

## Stack

React 19 + TypeScript + Vite + react-three-fiber + react-router-dom. The quiz engine is driven by a `useReducer` (`src/state/quizReducer.ts`, `src/hooks/useQuizEngine.ts`).

## Project structure

```
src/
  components/   Layout, NavBar, Footer, Scene3D, HeroScene, + quiz components
  pages/        HomePage, ExchangePage, BlogPage, BlogPostPage,
                CommunityPage, QuizPage, AboutPage, ContactPage, NotFoundPage
  data/         scripts.ts, blog.ts, community.ts, questions.ts, categories.ts
  utils/        exchangeStorage.ts, format.ts, storage.ts, scoring.ts, ...
```

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

## Going from demo to production

The platform is intentionally backend-free so it runs on static hosting. To make it multi-user, wire these client-only spots to a real API:

- **Script uploads / likes** — `src/utils/exchangeStorage.ts` currently reads/writes `localStorage`. POST to your API instead.
- **Newsletter / contact** — `CommunityPage` and `ContactPage` capture forms client-side; connect them to an ESP (Mailchimp, ConvertKit) or Formspree.
- **Blog** — articles live in `src/data/blog.ts`; swap for a CMS or MDX pipeline if you want non-developers to publish.

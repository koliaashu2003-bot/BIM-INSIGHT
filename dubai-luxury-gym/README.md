# AURUM — Dubai's Elite Performance Club

A premium, cinematic marketing site for a luxury gym, engineered to feel like an
Apple product launch crossed with Nike, Gymshark, and Tesla. Dark UI, glassmorphism,
gold accents, 3D hero, smooth scrolling, and conversion-first design throughout.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** — design tokens for black / charcoal / white / gold
- **Three.js** + **React Three Fiber** + **drei** — 3D animated hero
- **GSAP** (+ ScrollTrigger) & **Lenis** — smooth scroll, scroll-triggered motion
- **Framer Motion** — reveals, magnetic buttons, counters, page motion

## Pages

Home · Membership · Classes · Trainers · Transformations · Schedule · Blog (+ articles) · Gallery · Contact

## Key features (built)

- 3D animated hero with cinematic word reveal + video background (drop-in `public/videos/hero.mp4`)
- Magnetic buttons, mouse-follow ambient lighting, animated counters, scroll storytelling
- Before/After comparison slider (drag + keyboard accessible)
- BMI / Body-fat (US Navy) / Macro (Mifflin-St Jeor) calculators
- AI training concierge (rule-based; ready to swap for the Claude Messages API)
- Interactive class booking + weekly schedule grid
- Membership comparison table with monthly/annual toggle
- Google Reviews section, Google Maps embed, trainer Instagram links
- WhatsApp floating CTA + sticky mobile booking bar
- Newsletter + CRM-ready lead form (`/api/lead` stub)
- Bilingual EN/AR scaffold with RTL, SEO metadata, JSON-LD schema, sitemap & robots
- Accessibility: skip link, focus rings, reduced-motion, 44px touch targets

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Integrations to wire up (need keys / backend)

| Feature | Where | What to add |
|---|---|---|
| Payments (Stripe / Apple Pay / Google Pay) | `components/sections/MembershipPlans.tsx` | Stripe keys + a checkout route using the Payment Request API |
| Live Google Reviews | `components/sections/Reviews.tsx` | Google Places Details API (server route) + `place_id` |
| AI assistant (real LLM) | `components/ai/FitnessAssistant.tsx` | `/api/assistant` proxying the Claude Messages API (key server-side) |
| CRM lead capture | `app/api/lead/route.ts` | HubSpot / Salesforce / Zoho endpoint + key |
| Newsletter | `components/forms/NewsletterForm.tsx` | Mailchimp / Klaviyo endpoint |
| Full Arabic translations | `lib/i18n.tsx` | Expand the `ar` dictionary (RTL already wired) |
| Hero video | `public/videos/hero.mp4` | Licensed cinematic loop |
| Virtual tour | `app/gallery/page.tsx` | Matterport / YouTube 360 embed |

## Performance & SEO

- Next `<Image>` with AVIF/WebP, lazy 3D (`dynamic(..., { ssr: false })`)
- Metadata + OpenGraph/Twitter, JSON-LD (`HealthClub`/`LocalBusiness` + `Article`)
- `sitemap.xml` and `robots.txt` generated at build

Images are Unsplash demo URLs (allow-listed in `next.config.mjs`) — replace with
owned photography for production.

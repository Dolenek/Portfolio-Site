# Architecture

## App Composition
- Entry point: `src/main.tsx`.
- Root app and route map: `src/App.tsx`.
- Shared shell: `src/components/layout/AppLayout.tsx`.

## Routing Model
- Browser router with nested routes under `AppLayout`.
- `/` -> `HomePage` (section-based layout).
- `/about` -> `AboutPage`.
- Unknown routes redirect to `/`.

## Providers
- `ThemeProvider`
  - Stores theme in `localStorage` key `portfolio-site-theme`.
  - Applies/removes `dark` class on `<html>`.
- `ScrollSpyProvider`
  - Tracks active section visibility on home.
  - Exposes `scrollToSection` and `scrollToTop` for header navigation.

## Content Boundaries
- `src/data/profile.ts` - Identity/contact links.
- `src/data/projects.ts` - Project metadata for cards and outbound links.
- `src/data/skills.ts` - Skill card model.
- `src/data/siteMeta.ts` - Canonical URLs and locale metadata.

## SEO Layer
- `src/components/common/Seo.tsx` manages document title, meta tags, canonical/hreflang links, and JSON-LD.
- Links are keyed by managed scope to avoid accidental canonical/alternate collisions.

## API Service
- `api/server.mjs` exposes:
  - `GET /healthz`
  - `POST /api/contact`
- Includes body validation, honeypot handling, rate limiting, and structured logs.

# Architecture

## App Composition
- Entry point: `src/main.tsx`.
- Root app and route map: `src/App.tsx`.
- Shared route shell: `src/components/layout/AppLayout.tsx`.

## Routing Model
- Browser router with nested routes under `AppLayout`.
- Home route (`/`) renders section-based landing content.
- About route (`/about`) renders profile timeline content.
- Unknown routes redirect to `/`.

## Providers
- `ThemeProvider`
  - Stores theme in localStorage key `portfolio-site-theme`.
  - Applies/removes `dark` class on `<html>`.
  - Falls back to OS preference when no explicit stored preference exists.
- `ScrollSpyProvider`
  - Tracks section visibility via `IntersectionObserver`.
  - Exposes active section and scroll helpers for header navigation.

## Layout Responsibilities
- `SiteHeader` handles:
  - route navigation (`/about`)
  - section scrolling on home
  - theme and language controls
  - responsive mobile menu
- `SiteFooter` renders localized footer text.

## Data Boundaries
- `src/data/profile.ts` - Personal identity/contact/social links.
- `src/data/projects.ts` - Project cards metadata and external links.
- `src/data/skills.ts` - Skill icon list and visual accents.
- `src/data/siteMeta.ts` - Base URL, locale metadata, and social image config.

## Utility Boundaries
- `src/utils/animation.ts` - Shared motion easing/variant helpers (`MOTION_EASE`).
- `src/utils/cn.ts` - Class name composition utility.
- `src/utils/seo.ts` - Locale and canonical URL helpers.


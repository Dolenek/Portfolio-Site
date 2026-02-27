# Sections and Content

## Home Sections

### Hero (`HeroSection.tsx` + `sections/hero/*`)
- Theme-aware day/night backdrop.
- Animated stars/clouds generated from deterministic config.
- Portrait image from `profile.portraitImage` with initials fallback.

### Projects (`ProjectsSection.tsx` + `sections/projects/*`)
- Card list generated from `src/data/projects.ts`.
- Desktop: hover/focus overlay reveals summary + actions.
- Mobile: tap toggles active overlay.
- Every card links to `/projects/:slug` case-study route.

### Skills (`SkillsSection.tsx`)
- Card grid generated from `skillHighlights`.
- Skill labels are localized via `skills.cards` keys.

### Contact (`ContactSection.tsx`)
- Direct contact actions only:
  - copy email
  - open GitHub
  - open LinkedIn
- Includes localized copied feedback for screen readers.

## About Page (`AboutPage.tsx`)
- Localized intro paragraph with emphasized fragments.
- Timeline list from locale key `about.timeline`.
- Optional timeline links (`label`, `href`) per item.

## Project Detail Page (`ProjectDetailPage.tsx`)
- Renders case-study sections from localized typed data.
- Uses slug-to-project mapping from `projects.ts`.
- Falls back to home redirect when slug is unknown.

## Content Update Rules
- Project metadata: `src/data/projects.ts`.
- Case-study body content:
  - `src/data/case-studies/en.ts`
  - `src/data/case-studies/cs.ts`
- Locale UI copy:
  - `src/i18n/locales/en/common.json`
  - `src/i18n/locales/cs/common.json`

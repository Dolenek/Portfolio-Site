# Sections and Content

## Home Sections

### Hero (`HeroSection.tsx` + `sections/hero/*`)
- Theme-aware day/night backdrop.
- Animated stars/clouds generated from deterministic config.
- Portrait image from `profile.portraitImage` with initials fallback.

### Projects (`ProjectsSection.tsx` + `sections/projects/*`)
- Card list generated from `src/data/projects.ts`.
- Project order follows the array order; place the newest or highest-priority portfolio work first.
- Desktop: hover/focus overlay reveals summary + actions.
- Mobile: tap toggles active overlay.
- Card actions expose outbound GitHub/demo links when available.

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

## Content Update Rules
- Project metadata, outbound links, stack labels, and preview image paths: `src/data/projects.ts`.
- Locale UI copy:
  - `src/i18n/locales/en/common.json`
  - `src/i18n/locales/cs/common.json`

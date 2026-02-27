# Sections and Content

## Home Page Sections

### Hero (`HeroSection.tsx`, `HeroSection.css`)
- Theme-aware mountain artwork uses shared shape layers for day/night variants.
- Day scene includes generated drifting clouds (`createHeroCloudField`).
- Night scene includes generated star field.
- Portrait image comes from `profile.portraitImage`; fallback renders initials.
- Header is transparent, so foreground ridge and app background should stay visually aligned.

### Projects (`ProjectsSection.tsx`, `ProjectsSection.css`)
- Renders alternating left/right project cards from `src/data/projects.ts`.
- Card media prefers `previewImage`; falls back to gradient placeholder.
- Desktop behavior: hover/focus overlay reveals details and links.
- Mobile/touch behavior: tap toggles active overlay state.
- Maintain translated copy in locale `projects.items` keys aligned to project IDs.

### Skills (`SkillsSection.tsx`, `SkillsSection.css`)
- Renders skill icon cards from `skillHighlights` in `src/data/skills.ts`.
- Localized labels come from `skills.cards` in locale resources.
- Keep skill IDs synchronized between data and locale maps.

### Contact (`ContactSection.tsx`)
- Uses data from `profile.ts` (email and social links).
- Includes localized email copy feedback (`copy`/`copied`).
- Includes CTA route to the About page.

## About Page (`AboutPage.tsx`)
- Renders localized intro and timeline (`about.timeline`).
- Supports optional timeline link object (`label`, `href`) per item.
- Uses `useScrollTopReset` to replay timeline reveal logic after top reset.

## Content Update Rules
- Add/edit structured content in `src/data/*`.
- Add/edit user-facing copy in:
  - `src/i18n/locales/en/common.json`
  - `src/i18n/locales/cs/common.json`
- Keep locale schemas aligned to avoid missing runtime text.
- Add project screenshots/icons under `public/projects` and `public/skills`.


# Sections and Content

## Home Sections

### Hero (`HeroSection.tsx` + `sections/hero/*`)
- Monospace hero intro using JetBrains Mono.
- Theme-aware nature backdrop: Latte light mode uses sun/clouds, dark mode uses stars/moon.
- Copy is localized through `hero.*` keys and supports highlighted fragments in `hero.description`.
- Social/about links use `profile.github` and the `/about` route.

### Projects (`ProjectsSection.tsx` + `sections/projects/*`)
- Home card list is generated from `featuredProjects` in `src/data/projects.ts`.
- Project order follows the array order; place the newest or highest-priority portfolio work first.
- Cards show preview media next to always-visible copy, stack, and actions.
- The home section links to `/projects` through the "Show more projects" CTA.
- Card actions expose outbound GitHub/demo links when available.

## More Projects Page (`/projects`)
- Uses `additionalProjects` from `src/data/projects.ts`.
- Presents non-featured project work with the same visible-detail card layout as the home section.
- Includes route-specific SEO metadata and a back action to the home projects section.

### Skills (`SkillsSection.tsx`)
- Card grid generated from `skillHighlights`.
- Skill labels are localized via `skills.cards` keys.

### Contact (`ContactSection.tsx`)
- Direct contact actions only:
  - copy email
  - open GitHub
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

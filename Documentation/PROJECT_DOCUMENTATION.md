# Portfolio Site Documentation

## Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Styling System](#styling-system)
  - [Global Styles](#global-styles)
  - [Section-Specific Styling](#section-specific-styling)
- [Internationalisation (i18n)](#internationalisation-i18n)
- [Theme Management](#theme-management)
- [Routing & Layout](#routing--layout)
- [Providers](#providers)
  - [ScrollSpyProvider](#scrollspyprovider)
  - [ThemeProvider](#themeprovider)
- [Content Sections](#content-sections)
  - [Hero](#hero)
  - [Projects](#projects)\n  - [Skills](#skills)
  - [Contact](#contact)
  - [About Page](#about-page)
- [Data Sources](#data-sources)
- [Utilities](#utilities)
- [Animations & Motion](#animations--motion)
- [Accessibility Considerations](#accessibility-considerations)
- [Extending the Project](#extending-the-project)
  - [Adding a New Section](#adding-a-new-section)
  - [Adding a New Locale](#adding-a-new-locale)
  - [Customising Theme Tokens](#customising-theme-tokens)
- [Deployment Notes](#deployment-notes)

## Overview
This repository contains a React + TypeScript portfolio site that showcases personal experience, projects, skills, and contact information. The application is designed to feel dynamic and visually rich while remaining performant and accessible. Dark and light themes are supported, with the hero section responding to the active theme by swapping between a starry mountain night scene and a sunlit daytime scene.

Key features include:
- Theme-aware hero artwork with animated decorative elements.
- Internationalisation (English & Czech) handled by `react-i18next`.
- Scroll-spy navigation highlighting the active section while the user scrolls.
- Smooth scroll helpers and animated section reveals powered by `framer-motion`.
- Tailwind CSS utility layering combined with bespoke CSS modules for complex visuals.

## Technology Stack
- **React 19** with **TypeScript** for the component architecture.
- **Vite** for development tooling and bundling.
- **Tailwind CSS** for utility-first styling, augmented with custom CSS files where needed.
- **Framer Motion** for declarative animations.
- **react-router-dom** for client-side routing.
- **react-i18next** for localisation support.
- **lucide-react** for iconography.

## Getting Started

### Prerequisites
- Node.js 18+ is recommended.
- npm 9+ (Node installs npm by default).

### Installation
```bash
npm install
```
This project uses a `package-lock.json`; prefer npm over other package managers.

### Available Scripts
- `npm run dev`  Start the Vite development server with hot module replacement.
- `npm run build`  Type-check via `tsc -b` and create a production bundle.
- `npm run preview`  Serve the built assets locally (runs `vite preview`).
- `npm run lint`  Run ESLint with `--max-warnings=0` (ensure fast-refresh rules pass).
- `npm run typecheck`  Run TypeScript without emitting files.

## Project Structure
```
src/
  assets/               // Static assets (SVGs, images)
  components/
    common/             // Reusable UI primitives (ThemeToggle, LanguageToggle)
    layout/             // Shell layout components (header, footer, layout)
    sections/           // Page sections (Hero, Projects river, Contact)
  data/                 // Static data consumed by sections (profile, projects, skills)
  i18n/                 // i18next configuration and locale bundles
  pages/                // Route-level pages (Home, About)
  providers/            // React context providers (Theme, ScrollSpy)
  utils/                // Shared helpers (e.g. className combiner)
  App.tsx               // Route and provider wiring
  main.tsx              // React root bootstrap
```

## Styling System
Styling blends Tailwind utilities with targeted CSS modules for art-heavy sections.

### Global Styles
- `src/index.css` defines Tailwind layers, base typography, and a `container-xl` helper.
- `tailwind.config.js` extends the palette with brand colours, background gradients, and custom shadows.
- Layout background treatments live in `AppLayout.tsx` using Tailwind classes.

### Section-Specific Styling
Complex visuals (e.g. animated mountains, sun/moon, portrait card) are managed via dedicated CSS files:
- `HeroSection.css`  Handles background gradients, star animations, mountain layers, sun/moon/cloud animations, and the portrait card styling.
- `ProjectsSection.css` - Shapes the river path, alternating project card anchors, and icon states.
Tailwind classes complement these styles for spacing, typography, and general layout.

## Internationalisation (i18n)
- Configured in `src/i18n/index.ts` using `react-i18next`.
- Locale bundles live in `src/i18n/locales/{en,cz}/common.json` and mirror a common schema.
- Components request strings with `useTranslation`. For grouped content (e.g. hero headline pieces), `{ returnObjects: true }` retrieves structured objects.
- `LanguageToggle.tsx` (in `components/common`) switches i18n language state.

## Theme Management
- Theme preference is persisted in localStorage under the key `portfolio-site-theme` (see `ThemeProvider.tsx`).
- Initial theme respects saved preference or `prefers-color-scheme` media query.
- The `<html>` element gets a `dark` class toggle, allowing Tailwinds `dark:` variants to react.
- `ThemeToggle.tsx` toggles the theme via context, updating the provider state and DOM class list.
- The hero section listens to the `dark` class to swap between night/day DOM elements.

## Routing & Layout
- Routing is declared in `App.tsx` with `react-router-dom` using nested routes under `AppLayout`.
- `AppLayout` wraps pages with shared header/footer and background effects. The light theme shell now pins the base gradient to `#e3ebf8` so the hero's front ridge blends seamlessly with the rest of the page.
- `SiteHeader` integrates navigation, theme toggle, and mobile drawer. It collaborates with the `ScrollSpyProvider` to keep nav state in sync and now stays transparent across themes, relying on the hero sky for contrast.
- `SiteFooter` renders translated footer copy and year metadata.

## Providers

### ScrollSpyProvider
Location: `src/providers/ScrollSpyProvider.tsx`.
- Observes intersections between sections and viewport using `IntersectionObserver`.
- Exposes `activeSection`, `scrollToSection`, `scrollToTop`, and a registration API via context.
- Sections opt-in by setting `data-section` attributes and using helper hooks.

### ThemeProvider
Location: `src/providers/ThemeProvider.tsx`.
- Manages theme state (`light` | `dark`) and exposes `toggleTheme` / `setTheme`.
- Syncs DOM class list and localStorage, and listens to system theme changes to keep defaults in line when no explicit preference is stored.

## Content Sections

### Hero
Files: `HeroSection.tsx`, `HeroSection.css`, hero strings under `hero` key in locale JSON.
- Two-column layout: left column hero portrait card, right column copy.
- Background artwork renders shared SVG ridge paths for both themes; each theme supplies its own gradient palette so the silhouettes stay identical while colours change.
  - Dark mode: four mountain layers in progressively darker blues, subtle drop-shadow glows, drifting starfield, and moon.
  - Light mode: the same geometry with softened blues, sun, and clouds generated at runtime.
- Day clouds are seeded by `createHeroCloudField` (HeroSection.tsx), which pseudo-randomises spawn height, scale, travel duration, and opacity for 11 drifting layers. Tweak density or range by adjusting the generator constants.
- The front-most ridge colour matches the site background (`#e3ebf8`) and the section applies a negative top margin so the mountains rise behind the transparent header without leaving a dark strip.
- Uses Framer Motion for staged entrance animations.
- Pulls dynamic strings `hero.intro`, `hero.headline` (object with `lead`, `accent`, `trail`), `hero.subheadline`, and `hero.description`. The accent span uses the `.hero-headline-accent` gradient so update colours in CSS when you tweak branding.
- Portrait media renders the optional `profile.portraitImage` (sourced from `/public/projects/` or similar); omit the field to fall back to initials derived from `profile.name`.
- Adjust ridge heights or glow in `HERO_MOUNTAIN_LAYERS` and `.hero-mountain-path--ridge-*` respectively.

### Projects
Files: `ProjectsSection.tsx`, `ProjectsSection.css`.
- Renders a staggered column of large preview cards; each card prefers an uploaded screenshot referenced via `project.previewImage` (falling back to the gradient defined in `project.previewGradient`) and keeps the project title visible inside a base band that hugs the screenshot edge.
- Place screenshots inside `public/projects/` and point `project.previewImage` at the file (e.g. `/projects/your-project.png`). Omit the field to continue using the gradient placeholder.
- Hover/focus reveals the detail overlay by sliding it from the bottom: summary, impact, stack chips, and CTA icons animate upward using the shared cubic-bezier stored in `cardVariants`. Touch breakpoints keep the overlay visible and hide the duplicated base band while the hover state gently darkens/soft-blurs the preview image instead of adding an opaque scrim.
- GitHub and optional demo buttons live in the overlay footer beside the tech stack with translated `aria-label`s assembled from the project title.
- Tweak sizing in `ProjectsSection.css` (`projects-river__card` width/height, overlay padding) and mirror any changes against Tailwind spacing in the JSX to maintain alignment for alternating left/right nodes.

### Skills
Files: `SkillsSection.tsx`, `SkillsSection.css`.
- Showcases four skill clusters sourced from `skillClusters` and the `skills` locale subtree; cards animate via the shared stagger variants.
- The highlight constellation reads from `skillHighlights` and the `skills.callout` list (keep JavaScript, Python, Supabase, PostgreSQL, SQL visible in copy).
- Tweak gradients or chip styles in `skills.ts` and `SkillsSection.css`; always update both locale files when adding or reordering skills.
### Contact
File: `ContactSection.tsx`.
- Provides contact CTA, email copy-to-clipboard interaction, and social links from `profile.ts` using icons.
- Exposes copy feedback (`Copy`  `Copied!`) sourced from i18n.

### About Page
File: `pages/AboutPage.tsx`.
- Expands on biography, timeline (experience, education), and working values.
- Consumes the same locale schema for consistent translations.

## Data Sources
- `profile.ts`  Centralised personal info (name, email, social URLs, location). Set `profile.portraitImage` to surface a portrait in the hero (falls back to initials from `profile.name`).
- `projects.ts`  Metadata for portfolio entries: slug, type, tech stack, summary, and optional links.
- `skills.ts`  Stores `skillHighlights` (icon + gradient accent) consumed by the skills icon row; edit `skills.highlightLabels` in the locale files so tooltips stay translated.
These modules keep presentation components stateless and easy to localise.

## Utilities
- `utils/cn.ts`  Class name combiner built on `clsx` semantics, allowing conditional Tailwind usage.
- Additional helpers (e.g. scroll spy registration) live inside provider files.

## Animations & Motion
- Framer Motion is imported directly in sections requiring motion.
- Shared transition config `TRANSITION_EASE` ensures consistent easing curves.
- Hero uses `motion.div`/`motion.h1` with variant-based staggered reveals.
- CSS keyframes in `HeroSection.css` cover the full backdrop: stars use `hero-star-drift` + `hero-twinkle` for continuous movement and flicker, while `hero-float`, `hero-sun-glow`, and `hero-cloud-glide` drive the moon, sun, and day clouds moving right-to-left.

## Accessibility Considerations
- Theme toggle and nav buttons include `aria-label`/`aria-expanded` attributes (see `SiteHeader.tsx`).
- Focus states rely on Tailwind ring utilities for keyboard navigation visibility.
- Copy-to-clipboard button announces status changes via text updates.
- Hero art is decorative only; imagery elements are implemented as background divs/spans with no semantic burden.

## Extending the Project

### Adding a New Section
1. Create a component in `src/components/sections` with corresponding styles if necessary.
2. Register the section ID with `data-section` for scroll-spy support.
3. Add translation keys to locale JSON files.
4. Import and place the section in `HomePage.tsx` (or another route) at the desired location.

### Adding a New Locale
1. Duplicate `src/i18n/locales/en/common.json` into a new language folder.
2. Update `src/i18n/index.ts` to include the new namespace.
3. Ensure translation keys follow the existing structure to avoid runtime `undefined` content.
4. Update `LanguageToggle.tsx` to surface the new language option.

### Customising Theme Tokens
- Update `tailwind.config.js` to adjust colour palette or shadows.
- Modify `ThemeProvider.tsx` if additional theme modes or persistence keys are needed.
- Update `HeroSection.css` to keep day/night artwork in sync with palette changes.

## Deployment Notes
- Production build: `npm run build` (includes type-checking).
- Preview locally: `npm run preview`.
- Deploy the contents of `dist/` to any static hosting provider (e.g. GitHub Pages, Netlify, Vercel). Ensure the server serves `index.html` on unknown routes to support client-side routing.
- When updating translations or data files, re-run `npm run lint` and `npm run build` before pushing to maintain quality gates.

---
For further questions or enhancements, review the component-specific comments inside the codebase or reach out to the maintainer listed in `profile.ts`.



























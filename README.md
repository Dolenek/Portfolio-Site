# Jakub Dolének � Portfolio Site

This repository hosts my personal portfolio built with React, Vite, and Tailwind CSS. The site showcases experience, featured projects, and contact details with smooth scroll navigation, theme switching, and room for localisation.

## Features
- **Modern stack** | React 19 + Vite 7 with TypeScript, Tailwind CSS, and Framer Motion animations.
- **Single-page flow with deep links** | sticky header navigates sections on the home view (hero, projects, skills, contact) and routes to a dedicated About page.
- **Theme persistence** | light/dark mode remembered in `localStorage` and synced with OS preference changes.
- **Content driven** | projects, skills, and personal data stored in typed modules for easy updates without touching layout code.
- **Internationalisation ready** | `react-i18next` scaffolded (EN ready, CZ placeholder) with language detector cache.
- **Production friendly** | ESLint, TypeScript strictness, and Tailwind plugins for forms/typography.

## Project structure
```
src/
  components/
    common/        # Shared UI atoms (theme toggle, etc.)
    layout/        # Header, footer, layout shell
    sections/      # Home page sections (hero/projects/skills/contact)
  data/            # Structured content (profile, projects, skill categories)
  i18n/            # i18next setup and locale JSONs
  pages/           # Route components (HomePage, AboutPage)
  providers/       # Scroll spy + theme context providers
  utils/           # Shared utilities (e.g., class name helper)
```

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on <http://localhost:5173>. Update content in `src/data` and translation strings in `src/i18n/locales/en/common.json`. The Czech locale can be completed later by mirroring keys in `locales/cz`.

### Available scripts
- `npm run dev`       | launch Vite development server with HMR.
- `npm run build`     | type-check and output production build into `dist/`.
- `npm run preview`   | serve the built site locally.
- `npm run lint`      | run ESLint with zero-warning policy.
- `npm run typecheck` | run TypeScript in no-emit mode.

## Styling & theming
- Tailwind config (`tailwind.config.js`) defines brand palette, fonts, and background utilities. The project relies on the `dark` class on `<html>` managed by the custom `ThemeProvider`.
- Global utilities live in `src/index.css`. `container-xl` centralises page width, and smooth scrolling is enabled on `html`.

## Scroll navigation
- `ScrollSpyProvider` watches `[data-section]` elements to mark the active nav item.
- Header buttons either route to `/about` or call `scrollIntoView`. Mobile navigation collapses after navigation.

## Internationalisation primer
- i18next initialises with English and Czech namespaces (`src/i18n/index.ts`).
- Text copy is stored under semantic keys (e.g., `hero`, `projects`, `about`).
- To finish CZ localisation, translate entries in `src/i18n/locales/cz/common.json` and add a language switcher back to the header.

## Future enhancements
- Complete Czech localisation and reintroduce the language toggle.

---
Feel free to open issues or suggestions in the repo once published.

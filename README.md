# Jakub Dolének – Portfolio Site

This repository hosts my personal portfolio built with React, Vite, and Tailwind CSS. The site showcases experience, featured projects, and contact details with smooth scroll navigation, theme switching, and localisation.

## Features
- **Modern stack** | React 19 + Vite 7 with TypeScript, Tailwind CSS, and Framer Motion animations.
- **Single-page flow with deep links** | sticky header navigates sections on the home view (hero, projects, skills, contact) and routes to a dedicated About page.
- **Theme persistence** | light/dark mode remembered in `localStorage` and synced with OS preference changes.
- **Content driven** | projects, skills, and personal data stored in typed modules for easy updates without touching layout code.
- **Internationalisation** | English and Czech copy powered by `react-i18next` with browser-language detection and manual toggle.
- **Timeline resilience** | About page timeline replay guarded by a scroll-to-top reset hook so users see the animation even when arriving from the bottom of the Home view.
- **Production friendly** | ESLint, TypeScript strictness, and Tailwind plugins for forms/typography.

## Featured projects
- **Recepty v Akci** — Self-hosted recipe portal styled after supermarket flyers. Supabase and n8n automations ingest daily PDF leaflets, generate structured recipes, and surface them through a React + TanStack Query frontend with leaflet-style layouts.
- **Discord Automation** — Desktop WPF app embedding the Discord client via WebView2. A custom automation layer drives DevTools input events, deduplicates outgoing messages, and captures structured logs for review.
- **Smithing Master Bot** — Python automation toolkit using PyAutoGUI and OpenCV to control an Android emulator, removing repetitive in-game crafting loops.
- **Mobile Game in Unity** — Casual RPG prototype for Android with crafting-heavy mechanics, built in Unity with C# scripting.
- **Portfolio Site** — The site itself, powered by React, Tailwind CSS, and Framer Motion, localised in English and Czech with animated hero artwork.

## Project structure
```
src/
  components/
    common/        # Shared UI atoms (theme toggle, language toggle, etc.)
    layout/        # Header, footer, layout shell
    sections/      # Home page sections (hero/projects/skills/contact)
  data/            # Structured content (profile, projects, skill categories)
  i18n/            # i18next setup and locale JSONs
  pages/           # Route components (HomePage, AboutPage)
  providers/       # Scroll spy + theme context providers
  hooks/           # Reusable React hooks (scroll-to-top animation reset, ...)
  utils/           # Shared utilities (e.g., class name helper)
```

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on <http://localhost:5173>. Update content in `src/data` and keep translation strings in `src/i18n/locales/en/common.json` and `src/i18n/locales/cz/common.json` aligned when editing copy.

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
- Language preferences persist via `localStorage` (`portfolio-site-language`) and respect browser defaults on first visit.

## Future enhancements
- Expand locale coverage, add more project write-ups, and integrate automated visual regression checks for animated sections.

---
Feel free to open issues or suggestions in the repo once published.

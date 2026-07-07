# Architecture

## App Composition
- `src/main.tsx` mounts the React app and initializes i18n.
- `src/App.tsx` owns the browser router and route map.
- `src/components/layout/AppLayout.tsx` provides the shared shell, skip link, header, footer, and background treatment.
- `src/components/layout/SiteHeader.tsx` renders the primary navigation and a route-aware terminal prompt such as `kuba@Portfolio:~`.

## Routing
- Routes are nested under `AppLayout`.
- `/` renders `HomePage`.
- `/projects` renders `ProjectsPage`.
- `/about` renders `AboutPage`.
- `*` redirects to `/`.

## Providers
- `ThemeProvider` owns the active theme, persists it in `localStorage`, and applies the `dark` class on `<html>`.
- `ScrollSpyProvider` tracks the active home section and exposes section/top scrolling commands for navigation.

## Source Boundaries
- `src/components/common` contains shared controls such as `Seo`, `ThemeToggle`, and `LanguageToggle`.
- `src/components/layout` contains shell components.
- `src/components/sections` contains home sections and section-local styles/helpers.
- `src/pages` contains route-level pages.
- `src/data` contains typed project, skill, profile, and site metadata.
- `src/i18n` contains i18n setup, locale resources, and react-i18next typing.
- `src/utils` contains shared utility functions.

## Data Ownership
- `src/data/profile.ts` owns identity and contact links.
- `src/data/projects.ts` exports `featuredProjects` and `additionalProjects`.
- `src/data/skills.ts` owns skill card data and icon references.
- `src/data/siteMeta.ts` owns canonical URL and locale metadata.

## Extension Points
- Add routes in `src/App.tsx` and create a route page in `src/pages`.
- Add shared app state through focused providers under `src/providers`.
- Add section-specific rendering helpers inside the owning section folder.

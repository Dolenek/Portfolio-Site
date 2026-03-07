# Overview

This project is a React + TypeScript portfolio site built with Vite.
It presents featured projects, skills, experience, and direct contact links.

## Core Capabilities
- Home page with section navigation (`hero`, `projects`, `skills`, `contact`).
- Dedicated About route (`/about`) with timeline content.
- Light/dark theme with persistence.
- English/Czech localization with URL syncing (`?lang=cs` for Czech).
- Route-aware SEO metadata + JSON-LD.

## Technology Stack
- React 19
- TypeScript 5
- Vite 7
- Tailwind CSS 3
- Framer Motion
- react-router-dom 7
- react-i18next + i18next-browser-languagedetector

## Runtime Surface
- Routes:
  - `/`
  - `/about`
  - `*` redirects to `/`
- Public assets are served from `public/`.
- Optional backend service for contact delivery runs from `api/`.

## Source Layout (High Level)
- `src/components/common` - Shared controls (`Seo`, toggles).
- `src/components/layout` - App shell (`AppLayout`, `SiteHeader`, `SiteFooter`).
- `src/components/sections` - Home sections and section-specific styles.
- `src/pages` - Route pages (`HomePage`, `AboutPage`).
- `src/data` - Typed content and localized UI data.
- `src/i18n` - i18n setup and locale resources.
- `api` - Express contact API (`/api/contact`, `/healthz`).

# Overview

This project is a React + TypeScript portfolio site built with Vite.  
It presents projects, skills, and contact details with localized content and theme-aware visuals.

## Core Capabilities
- Single-page home flow with deep-section navigation (`hero`, `projects`, `skills`, `contact`).
- Dedicated `/about` route with timeline content.
- Light/dark theme toggle with persistence and OS preference fallback.
- English/Czech localization with browser detection and manual language switch.
- SEO metadata, canonical/alternate locale links, and structured data.

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
  - `/` (home with sections)
  - `/about` (timeline/about content)
  - `*` redirects to `/`
- Public assets are served from `public/` (project screenshots, skill icons, SEO files).

## Source Layout (High Level)
- `src/components/common` - Reusable controls (`Seo`, theme/language toggles).
- `src/components/layout` - Shell (`AppLayout`, `SiteHeader`, `SiteFooter`).
- `src/components/sections` - Home sections.
- `src/pages` - Route pages (`HomePage`, `AboutPage`).
- `src/providers` - Theme and scroll-spy context providers.
- `src/data` - Typed content metadata (profile, projects, skills, site meta).
- `src/i18n` - i18n setup and locale resources (`cs`, `en`).


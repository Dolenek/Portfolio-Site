# Overview

This repository contains a React + TypeScript portfolio site built with Vite.
It presents selected projects, skills, experience, and contact actions for the portfolio owner.

## Capabilities
- Home page with section navigation for `hero`, `projects`, `skills`, and `contact`.
- `/projects` route for additional non-featured project work.
- `/about` route with experience and education timeline content.
- Light/dark theme with persisted preference.
- English and Czech localization with URL synchronization.
- Route-aware SEO metadata and JSON-LD.

## Routes
- `/` - home sections.
- `/projects` - additional project archive.
- `/about` - profile timeline.
- Unknown routes redirect to `/`.

## Stack
- React 19
- TypeScript 5
- Vite 7
- Tailwind CSS 3 with section CSS
- Framer Motion
- react-router-dom 7
- react-i18next with i18next-browser-languagedetector

## Source References
- App structure and provider ownership: [Architecture](architecture.md).
- Section behavior and content ownership: [Sections and Content](sections-and-content.md).
- Locale, theme, and SEO behavior: [i18n, Theme, and SEO](i18n-theme-seo.md).

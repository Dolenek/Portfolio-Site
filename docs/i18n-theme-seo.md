# i18n, Theme, and SEO

## Localization (i18n)
- Setup: `src/i18n/index.ts`.
- Supported locales: `en`, `cs`.
- Default locale: `en`.
- Detection order: query string (`lang`) -> localStorage -> navigator -> html tag.
- Language preference key: `portfolio-site-language`.

## Locale URL Behavior
- Default locale (`en`) uses clean URL without query parameter.
- Czech locale uses `?lang=cs`.
- Language toggle updates i18n state and URL query in-place.

## Theme Behavior
- Theme state: `ThemeProvider`.
- Persistence key: `portfolio-site-theme`.
- Dark mode uses `dark` class on `<html>`.
- Falls back to OS preference if no stored selection exists.

## SEO Implementation
- `Seo.tsx` manages:
  - title + description
  - canonical URL
  - hreflang alternates (`en`, `cs`, `x-default`)
  - Open Graph and Twitter meta
  - robots directive
  - `<html lang>` sync
  - JSON-LD payload
- Canonical and alternate links are upserted with stable managed keys.

## Structured Data
- Home: `Person`, `WebSite`, `WebPage`.
- About: `WebPage`, `BreadcrumbList`.

## Crawl and Index Files
- `public/robots.txt`
- `public/sitemap.xml`

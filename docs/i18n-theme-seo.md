# i18n, Theme, and SEO

## Localization (i18n)
- i18n setup lives in `src/i18n/index.ts`.
- Supported locales:
  - `cs` (default)
  - `en`
- Locale resources:
  - `src/i18n/locales/cs/common.json`
  - `src/i18n/locales/en/common.json`
- Detection order: query string (`lang`) -> localStorage -> navigator -> html tag.
- Language preference localStorage key: `portfolio-site-language`.

## Locale URL Behavior
- Language toggle syncs URLs with `?lang=` for non-default locale usage.
- SEO helpers generate localized canonical and alternate URLs from current locale.

## Theme Behavior
- Theme state is managed by `ThemeProvider`.
- Theme persistence key: `portfolio-site-theme`.
- `<html>` receives `dark` class for dark-mode Tailwind variants.
- If no explicit stored preference exists, OS `prefers-color-scheme` is used.

## SEO Implementation
- `src/components/common/Seo.tsx` manages:
  - page title and description
  - canonical URL
  - `hreflang` alternates
  - Open Graph and Twitter metadata
  - robots directives
  - `<html lang>` synchronization
- `src/data/siteMeta.ts` is the single source for:
  - base URL and fallback URL
  - locale metadata (`htmlLang`, `hrefLang`, `ogLocale`)
  - shared social preview image path

## Structured Data
- Home page includes `Person`, `WebSite`, and `WebPage` JSON-LD.
- About page includes `WebPage` and `BreadcrumbList` JSON-LD.

## Crawl/Index Files
- `public/robots.txt`
- `public/sitemap.xml`


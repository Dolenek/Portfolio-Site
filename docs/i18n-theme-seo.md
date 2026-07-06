# i18n, Theme, and SEO

## Localization
- i18n setup lives in `src/i18n/index.ts`.
- Supported locales are `en` and `cs`.
- Default locale is `en`.
- Detection order is query string, localStorage, navigator, then html tag.
- Language preference is stored under `portfolio-site-language`.

## Locale URLs
- English uses the clean route URL.
- Czech uses `?lang=cs`.
- The language toggle updates i18n state and the current URL in place.
- Canonical and alternate URLs are generated from `src/data/siteMeta.ts`.

## Theme
- Theme state is owned by `ThemeProvider`.
- Theme preference is stored under `portfolio-site-theme`.
- Dark mode is applied with the `dark` class on `<html>`.
- OS color-scheme preference is used when no stored choice exists.

## SEO
- `src/components/common/Seo.tsx` manages document title, description, robots, canonical link, hreflang links, Open Graph, Twitter metadata, `<html lang>`, and JSON-LD.
- Managed links and meta tags use stable attributes so route updates can replace previous values.
- Social image metadata points to `siteMeta.socialImage`.

## Structured Data
- Home route emits `Person`, `WebSite`, and `WebPage`.
- About route emits `WebPage` and `BreadcrumbList`.
- Projects route emits `WebPage` and `BreadcrumbList`.

## Crawl Files
- `public/robots.txt`
- `public/sitemap.xml`

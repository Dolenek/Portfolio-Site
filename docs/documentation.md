# Portfolio Documentation Index

This `docs/` directory is the canonical documentation source for this repository.

## Canonical Rules
- Keep canonical docs English-first.
- Describe current behavior only.
- Do not keep changelog/history narrative in canonical pages.
- Do not duplicate full specs across files; link to the canonical page instead.
- Keep docs focused and small (prefer multiple files over one large page).

## Documentation Map
- `docs/overview.md` - Product overview, stack, routes, and main capabilities.
- `docs/development-setup.md` - Local setup, scripts, API service, and Docker deployment.
- `docs/architecture.md` - Codebase structure, routing/layout, providers, and data boundaries.
- `docs/sections-and-content.md` - Home/About sections and content schema.
- `docs/i18n-theme-seo.md` - Localization, theming, metadata, and crawl/index behavior.
- `docs/case-studies-and-contact-api.md` - Project case-study model and contact API contract.

## Minimum Doc Impact Review
For substantial changes, review whether updates are needed in:
- `README.md` for onboarding-level facts.
- `docs/overview.md` for user-visible behavior and scope.
- `docs/architecture.md` for structure/provider/data-flow changes.
- `docs/sections-and-content.md` for section behavior or content-schema changes.
- `docs/i18n-theme-seo.md` for locale, theme, URL, or metadata changes.
- `docs/case-studies-and-contact-api.md` for case-study or API contract updates.
- `docs/development-setup.md` for scripts, tooling, and deployment prerequisites.

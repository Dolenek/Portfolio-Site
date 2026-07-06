# Documentation Governance

## Canonical Rules
- `docs/` is the source of truth for project documentation.
- Canonical docs are English-first.
- Canonical docs describe current behavior only.
- Changelog, migration, or historical narrative does not belong in canonical pages.
- Do not duplicate full specifications across pages; link to the canonical page instead.
- Keep each documentation page focused and under roughly 120 lines.

## Page Boundaries
- Use `overview.md` for product scope, capabilities, stack, and user-visible routes.
- Use `architecture.md` for code structure, provider responsibilities, and source boundaries.
- Use `sections-and-content.md` for UI section behavior and content update locations.
- Use `i18n-theme-seo.md` for locale, theme, metadata, structured data, and crawl behavior.
- Use `performance-and-memory.md` for runtime rendering and animation cost controls.
- Use `development-setup.md` for scripts, prerequisites, and deployment entry points.

## Impact Review
For each substantial code task, check whether documentation updates are needed in:
- `overview.md` for user-visible behavior, routes, or stack scope.
- `architecture.md` for structure, providers, data flow, or ownership boundaries.
- `sections-and-content.md` for section behavior, content shape, or content file ownership.
- `i18n-theme-seo.md` for locale, theme, URL, metadata, structured data, or crawl changes.
- `performance-and-memory.md` for rendering, animation, or memory behavior.
- `development-setup.md` for scripts, tooling, prerequisites, or deployment flow.

## Linking Rules
- Add every canonical page to `documentation.md`.
- Prefer links to existing canonical pages over repeating their full content.
- Keep README references short and route readers to `docs/` for details.

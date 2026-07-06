# Sections and Content

## Home Page
- `HeroSection` renders the localized intro, highlighted description text, GitHub link, and about link.
- `ProjectsSection` renders `featuredProjects` on the home page.
- `SkillsSection` renders `skillHighlights` with localized labels from `skills.cards`.
- `ContactSection` renders copy-email and GitHub contact actions.

## Project Content
- Featured project cards come from `featuredProjects` in `src/data/projects.ts`.
- Additional project cards come from `additionalProjects` in `src/data/projects.ts`.
- Project card copy comes from `projects.items` in locale files.
- Card actions expose GitHub and demo links when present.

## Additional Routes
- `/projects` renders featured projects first and additional projects below them.
- The home-page "more projects" CTA opens `/projects` and scrolls to the additional project list.
- `/about` renders localized intro text and timeline entries from `about.timeline`.
- `/about` intro supports regular `<highlight>` spans and a `<projectsLink>` inline link to `/projects`.
- Timeline entries support optional outbound links through `label` and `href`.

## Content Files
- Project metadata and preview image paths: `src/data/projects.ts`.
- Skill card metadata and icon paths: `src/data/skills.ts`.
- Identity/contact links: `src/data/profile.ts`.
- English copy: `src/i18n/locales/en/common.json`.
- Czech copy: `src/i18n/locales/cs/common.json`.

## Asset Rules
- Project preview images live under `public/projects/`.
- Skill icons live under `public/skills/`.
- Public asset paths in data files use root-relative paths such as `/projects/example.png`.

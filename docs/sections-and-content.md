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
- Each project copy entry contains a title, short summary, motivation sentence, and technical impact sentence.
- Card actions expose GitHub and demo links when present.

## Additional Routes
- `/projects` renders featured projects first and additional projects below them.
- The home-page "more projects" CTA opens `/projects` and scrolls to the additional project list.
- `/about` renders localized intro text and timeline entries from `about.timeline`.
- `/about` intro supports regular `<highlight>` spans and a `<projectsLink>` inline link to `/projects`.
- Timeline entries support optional outbound links through `label` and `href`.

## Content Files
- Project metadata: `src/data/projects.ts`.
- Generated project media manifest: `src/data/generated/media.ts`.
- Skill card metadata and icon references: `src/data/skills.ts`.
- Identity/contact links: `src/data/profile.ts`.
- English copy: `src/i18n/locales/en/common.json`.
- Czech copy: `src/i18n/locales/cs/common.json`.

## Asset Rules
- Large source images live under `assets/source/` and are not served directly.
- `npm run images:optimize` writes responsive public assets under `public/assets/generated/`.
- Project cards render generated AVIF/WebP sources with JPEG fallback.
- Small static SVG skill icons live under `public/skills/`.

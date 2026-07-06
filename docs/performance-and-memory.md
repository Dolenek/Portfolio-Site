# Performance and Memory

## Hero Scene Profile
- `useHeroPerformanceProfile` selects the hero scene budget.
- The profile considers reduced motion preference, device memory, CPU hints, browser signals, and viewport size.
- Scene budgets control star count, cloud count, twinkle behavior, and visual effect density.
- The default profile uses a balanced budget of 48 stars and 6 clouds before device constraints.

## Theme Scene Rendering
- The hero renders only the active theme scene.
- Light theme renders sun, clouds, and day mountains.
- Dark theme renders moon, stars, and night mountains.

## Animation Cost Controls
- `prefers-reduced-motion` disables cloud and star animations in CSS.
- Lean profiles disable twinkle and reduce shadow/filter intensity.
- The backdrop uses `contain: layout paint` to constrain repaint scope.
- CSS variables drive per-node movement and opacity without React state updates.
- Hero scene animations pause when the hero is offscreen or the document is hidden.
- Section reveal effects use a small IntersectionObserver helper instead of a general animation runtime.

## Media Pipeline
- Source images live under `assets/source/`.
- `npm run images:optimize` generates public AVIF/WebP/JPEG project previews.
- Generated media metadata lives in `src/data/generated/media.ts`.
- Project cards use `<picture>` sources, explicit dimensions, lazy loading, and async decoding.
- Brand favicon, social metadata image, and the large AI skill icon are generated variants.

## Bundle And Caching
- `/about` and `/projects` are lazy-loaded route chunks.
- Vite splits React/router, i18n, and icon dependencies into stable vendor chunks.
- Nginx gzips text assets and caches `/assets/` for one year with `immutable`.
- The SPA HTML fallback is served with `Cache-Control: no-cache`.

## Deferred Sections
- Below-the-fold home sections use the `deferred-section` utility.
- `content-visibility: auto` delays rendering work until sections approach the viewport.
- `contain-intrinsic-size` preserves predictable layout before full rendering.

## Verification Scope
- Run `npm run images:optimize` after source image changes.
- Run `npm run build` after performance-sensitive rendering changes.
- Use browser checks for visual regressions in both light and dark themes.

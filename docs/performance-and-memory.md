# Performance and Memory

## Hero Scene Profile
- `useHeroPerformanceProfile` selects the hero scene budget.
- The profile considers reduced motion preference, device memory, CPU hints, browser signals, and viewport size.
- Scene budgets control star count, cloud count, twinkle behavior, and visual effect density.

## Theme Scene Rendering
- The hero renders only the active theme scene.
- Light theme renders sun, clouds, and day mountains.
- Dark theme renders moon, stars, and night mountains.

## Animation Cost Controls
- `prefers-reduced-motion` disables cloud and star animations in CSS.
- Lean profiles disable twinkle and reduce shadow/filter intensity.
- The backdrop uses `contain: layout paint` to constrain repaint scope.
- CSS variables drive per-node movement and opacity without React state updates.

## Deferred Sections
- Below-the-fold home sections use the `deferred-section` utility.
- `content-visibility: auto` delays rendering work until sections approach the viewport.
- `contain-intrinsic-size` preserves predictable layout before full rendering.

## Verification Scope
- Run `npm run build` after performance-sensitive rendering changes.
- Use browser checks for visual regressions in both light and dark themes.

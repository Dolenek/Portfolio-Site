# Performance and Memory

## Hero Runtime Optimization
- Hero scene uses a runtime performance profile (`useHeroPerformanceProfile`).
- Scene complexity is adapted by device/browser signals:
  - reduced motion preference
  - low memory / low CPU hints
  - Chrome-specific lean profile
  - small viewport
- The hero still renders the same visual concepts (sun/moon, mountains, clouds/stars), but with lower animation density on constrained profiles.

## Theme Scene Rendering
- The hero now renders only the active theme scene (day or night), not both at the same time.
- This reduces DOM node count and active animation workload in the initial viewport.

## Animation Cost Controls
- Expensive per-node animation pressure was reduced:
  - lighter star glow and twinkle behavior
  - twinkle can be disabled by performance profile
  - reduced filter/shadow effects in lean mode
- Backdrop uses paint containment (`contain: layout paint`) to limit repaint impact.

## Below-the-Fold Rendering
- Home sections below hero are wrapped with `deferred-section` utility.
- `content-visibility: auto` delays full rendering cost until near viewport.
- `contain-intrinsic-size` preserves layout predictability before content is rendered.

## Current Guarantees
- No user-facing features were removed.
- Theme toggle, animations, localized content, and section navigation remain intact.
- Lint and typecheck pass with the optimization changes.

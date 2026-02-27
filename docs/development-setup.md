# Development Setup

## Prerequisites
- Node.js `^20.19.0 || >=22.12.0` (required by Vite 7 in this project).
- npm (the repository is locked with `package-lock.json`).

## Installation
```bash
npm install
```

## Scripts
- `npm run dev` - Start Vite dev server with HMR.
- `npm run build` - Run `tsc -b` and create production bundle.
- `npm run preview` - Serve built assets locally.
- `npm run lint` - ESLint with zero-warning budget.
- `npm run typecheck` - TypeScript no-emit type check.

## Local Development Notes
- Default dev URL is `http://localhost:5173`.
- Keep typed content in `src/data/*`.
- Keep translatable strings aligned in:
  - `src/i18n/locales/en/common.json`
  - `src/i18n/locales/cs/common.json`

## Deployment Basics
- Build with `npm run build`.
- Deploy `dist/` to static hosting.
- Host must serve `index.html` for unknown routes to support client routing.


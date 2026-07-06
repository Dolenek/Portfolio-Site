# Development Setup

## Prerequisites
- Node.js 20+
- npm 10+
- Docker and Docker Compose for container deployment

## Local Development
```bash
npm install
npm run dev
```

The Vite dev server runs at `http://localhost:5173` by default.

## Scripts
- `npm run dev` starts the Vite dev server.
- `npm run lint` runs ESLint with zero warnings allowed.
- `npm run typecheck` runs TypeScript without emitting files.
- `npm run build` runs TypeScript project build and Vite production build.
- `npm run preview` serves the production build locally.

## Deployment Entry Points
- Docker frontend image: `deploy/frontend.Dockerfile`.
- Compose stack: `deploy/docker-compose.yml`.
- Nginx config: `deploy/frontend-nginx.conf`.

## Docker Run
```bash
cd deploy
docker compose up --build
```

The frontend service is exposed on `http://localhost:8081`.

# Development Setup

## Prerequisites
- Node.js 20+
- npm 10+
- Optional Docker + Docker Compose for container deployment

## Frontend Local Run
```bash
npm install
npm run dev
```

The Vite app runs at `http://localhost:5173`.

## Root Scripts
- `npm run dev` - start Vite dev server.
- `npm run lint` - run ESLint.
- `npm run typecheck` - run TypeScript type checks.
- `npm run build` - produce production frontend build.

## Docker Deployment
From `deploy/`:
```bash
docker compose up --build
```

Services:
- `frontend` on `http://localhost:8081`

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

## API Local Run
```bash
cd api
npm install
npm run dev
```

API default address: `http://localhost:8080`.

### API Environment
Copy `api/.env.example` to `api/.env` and set values:
- `CONTACT_TO`
- `CONTACT_FROM`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
- `ALLOWED_ORIGINS`
- `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX`

## Root Scripts
- `npm run dev` - start Vite dev server.
- `npm run lint` - run ESLint.
- `npm run typecheck` - run TypeScript type checks.
- `npm run build` - produce production frontend build.
- `npm run api:dev` - run API in watch mode.
- `npm run api:start` - run API once.

## Docker Deployment
From `deploy/`:
```bash
docker compose up --build
```

Services:
- `reverse-proxy` on `http://localhost:8081`
- `frontend` internal service
- `api` internal service

Proxy routes:
- `/` -> frontend
- `/api/*` -> API

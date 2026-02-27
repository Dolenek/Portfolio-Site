# Case Studies and Contact API

## Project Case-Study Model

Project case studies are split into two parts:
- metadata: `src/data/projects.ts`
- localized body content: `src/data/case-studies/{en,cs}.ts`

### Metadata Fields (`Project`)
- `id`, `slug`, `year`
- `role`, `teamSize`, `duration`, `featured`
- `tech[]`
- `links.github`, `links.demo`
- `previewGradient`, `previewImage`

### Case-Study Fields (`ProjectCaseStudy`)
- `problem`
- `constraints[]`
- `architecture[]` (`title`, `detail`)
- `decisions[]` (`title`, `rationale`, `tradeoff`)
- `outcomes[]` (`label`, `value`)
- `nextImprovements[]`

### Resolution Flow
- Slug -> project lookup via `findProjectBySlug`.
- Locale -> case-study lookup via `getProjectCaseStudy`.
- UI route: `/projects/:slug`.

## Contact API

Implementation: `api/server.mjs`

### Endpoints
- `GET /healthz`
  - Response: `{ "ok": true, "service": "portfolio-contact-api" }`
- `POST /api/contact`
  - JSON body:
    - `name` (required)
    - `email` (required)
    - `message` (required)
    - `company` (optional)
    - `website` (optional honeypot)
  - Success response: `{ "success": true, "requestId": "..." }`

### Validation and Protection
- Payload validation with `zod`.
- Rate limiting with `express-rate-limit`.
- Honeypot rejection path (`website` value).
- Security headers via `helmet`.
- Structured JSON logs with `requestId`.

### Delivery Behavior
- If SMTP config exists, API sends email via `nodemailer`.
- Without SMTP config, request is accepted and logged for observability.

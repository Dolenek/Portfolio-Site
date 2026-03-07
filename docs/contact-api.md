# Contact API

Implementation: `api/server.mjs`

## Endpoints
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

## Validation and Protection
- Payload validation with `zod`.
- Rate limiting with `express-rate-limit`.
- Honeypot rejection path (`website` value).
- Security headers via `helmet`.
- Structured JSON logs with `requestId`.

## Delivery Behavior
- If SMTP config exists, API sends email via `nodemailer`.
- Without SMTP config, request is accepted and logged for observability.

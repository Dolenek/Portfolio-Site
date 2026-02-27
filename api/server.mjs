import crypto from "node:crypto";
import process from "node:process";

import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import nodemailer from "nodemailer";
import { z } from "zod";

const app = express();
const port = Number(process.env.PORT ?? 8080);

const requestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().email().max(200),
  message: z.string().trim().min(10).max(5000),
  company: z.string().trim().max(120).optional(),
  website: z.string().trim().max(200).optional()
});

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("CORS blocked"));
  }
};

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000),
  limit: Number(process.env.RATE_LIMIT_MAX ?? 10),
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests"
  }
});

const createMailTransport = () => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user,
      pass
    }
  });
};

const transporter = createMailTransport();

const logEvent = (event, payload) => {
  const entry = {
    timestamp: new Date().toISOString(),
    event,
    ...payload
  };
  console.log(JSON.stringify(entry));
};

app.disable("x-powered-by");
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "32kb" }));

app.get("/healthz", (_req, res) => {
  res.status(200).json({ ok: true, service: "portfolio-contact-api" });
});

app.post("/api/contact", limiter, async (req, res) => {
  const requestId = crypto.randomUUID();
  const parseResult = requestSchema.safeParse(req.body);

  if (!parseResult.success) {
    logEvent("contact.validation_failed", {
      requestId,
      issues: parseResult.error.issues.map((issue) => issue.message)
    });

    res.status(400).json({
      success: false,
      requestId,
      error: "Invalid request body"
    });
    return;
  }

  const payload = parseResult.data;

  if (payload.website && payload.website.length > 0) {
    logEvent("contact.honeypot", { requestId, email: payload.email });
    res.status(200).json({ success: true, requestId });
    return;
  }

  const recipient = process.env.CONTACT_TO;
  const fromAddress = process.env.CONTACT_FROM ?? process.env.SMTP_USER;

  try {
    if (transporter && recipient && fromAddress) {
      await transporter.sendMail({
        from: fromAddress,
        to: recipient,
        subject: `[Portfolio] New contact from ${payload.name}`,
        text: [
          `Request ID: ${requestId}`,
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          payload.company ? `Company: ${payload.company}` : "",
          "",
          payload.message
        ]
          .filter(Boolean)
          .join("\n")
      });
    } else {
      logEvent("contact.received_no_mailer", {
        requestId,
        name: payload.name,
        email: payload.email,
        hasMessage: Boolean(payload.message)
      });
    }

    logEvent("contact.accepted", { requestId, email: payload.email });
    res.status(200).json({ success: true, requestId });
  } catch (error) {
    logEvent("contact.delivery_failed", {
      requestId,
      message: error instanceof Error ? error.message : "unknown"
    });

    res.status(500).json({
      success: false,
      requestId,
      error: "Unable to process message"
    });
  }
});

app.listen(port, () => {
  logEvent("service.started", { port, hasMailer: Boolean(transporter) });
});

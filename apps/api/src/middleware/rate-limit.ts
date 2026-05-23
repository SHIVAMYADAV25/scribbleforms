// apps/api/src/middleware/rate-limit.ts
import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const rateLimiters = {
  global: rateLimit({
    windowMs:        60_000,
    max:             200,
    standardHeaders: true,
    legacyHeaders:   false,
    message:         { code: "RATE_LIMITED", message: "Too many requests, please slow down." },
  }),

  auth: rateLimit({
    windowMs:              15 * 60_000,
    max:                   10,
    skipSuccessfulRequests: true,
    standardHeaders:       true,
    legacyHeaders:         false,
    message:               { code: "RATE_LIMITED", message: "Too many auth attempts. Try again in 15 minutes." },
  }),

  formSubmit: rateLimit({
    windowMs:    60_000,
    max:         5,
    keyGenerator: (req) => `${ipKeyGenerator(req.ip ?? "unkown")}:${(req.params as any)["slug"] ?? "unknown"}`,
    message:     { code: "RATE_LIMITED", message: "Too many submissions. Please wait before submitting again." },
  }),

  analytics: rateLimit({
    windowMs: 60_000,
    max:      120,
    message:  { code: "RATE_LIMITED", message: "Too many analytics events." },
  }),

  passwordReset: rateLimit({
    windowMs: 60 * 60_000,
    max:      3,
    message:  { code: "RATE_LIMITED", message: "Too many password reset requests." },
  }),

  upload: rateLimit({
    windowMs: 60_000,
    max:      20,
    message:  { code: "RATE_LIMITED", message: "Too many upload requests." },
  }),
};

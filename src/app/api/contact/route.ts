import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/redis/rate-limit";

const VALID_SUBJECTS = [
  "General support",
  "Billing / refund",
  "Privacy request",
  "Enterprise inquiry",
  "Bug report",
  "Other",
] as const;

type ValidContact = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// ── Input validation ──────────────────────────────────────────────────────────

function validateBody(body: unknown): ValidContact | string {
  if (typeof body !== "object" || body === null) return "Invalid request body";

  const { name, email, subject, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2)
    return "Name must be at least 2 characters";
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    return "A valid email address is required";
  if (typeof subject !== "string" || !VALID_SUBJECTS.includes(subject as (typeof VALID_SUBJECTS)[number]))
    return "Invalid subject";
  if (typeof message !== "string" || message.trim().length < 10)
    return "Message must be at least 10 characters";
  if (message.trim().length > 5000)
    return "Message must be under 5000 characters";

  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject,
    message: message.trim(),
  };
}

async function deliverContactMessage(contact: ValidContact, ip: string) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      ok: false,
      status: 503,
      error: "Contact delivery is not configured. Please email support@intractify.com.",
    };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...contact,
        ip,
        source: "intractify-contact-form",
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      return {
        ok: false,
        status: 502,
        error: "We could not send your message. Please email support@intractify.com.",
      };
    }
  } catch {
    return {
      ok: false,
      status: 502,
      error: "We could not send your message. Please email support@intractify.com.",
    };
  }

  return { ok: true, status: 201, error: "" };
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Extract real IP — works behind Vercel, Cloudflare, and nginx proxies
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "0.0.0.0";

  // 5 submissions per IP per 10-minute window
  const { allowed, remaining, resetInSeconds } = await checkRateLimit(
    ip,
    "contact",
    5,
    600,
  );

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": "0",
          "Retry-After": String(resetInSeconds),
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validated = validateBody(body);
  if (typeof validated === "string") {
    return NextResponse.json({ error: validated }, { status: 400 });
  }

  const delivered = await deliverContactMessage(validated, ip);
  if (!delivered.ok) {
    return NextResponse.json(
      { error: delivered.error },
      { status: delivered.status },
    );
  }

  return NextResponse.json(
    { success: true },
    {
      status: 201,
      headers: {
        "X-RateLimit-Limit": "5",
        "X-RateLimit-Remaining": String(remaining),
      },
    },
  );
}

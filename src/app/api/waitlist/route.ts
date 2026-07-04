import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/redis/rate-limit";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const VALID_PLANS = ["free", "starter", "pro", "enterprise"] as const;

type ValidWaitlist = {
  email: string;
  plan: string;
};

function validateBody(body: unknown): ValidWaitlist | string {
  if (typeof body !== "object" || body === null) return "Invalid request body";

  const { email, plan } = body as Record<string, unknown>;

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return "A valid email address is required";
  }

  if (typeof plan !== "string" || !VALID_PLANS.includes(plan as (typeof VALID_PLANS)[number])) {
    return "Please select a valid plan option";
  }

  return {
    email: email.trim().toLowerCase(),
    plan,
  };
}

export async function POST(req: NextRequest) {
  // Extract real IP
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "0.0.0.0";

  // Rate limit: 3 submissions per IP per 5-minute window
  const { allowed, remaining, resetInSeconds } = await checkRateLimit(
    ip,
    "waitlist",
    3,
    300
  );

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again in a few minutes." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": "3",
          "X-RateLimit-Remaining": "0",
          "Retry-After": String(resetInSeconds),
        },
      }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Waitlist registration is not configured yet. Please try again later." },
      { status: 503 }
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

  const { visitor_id, session_id } = (body as Record<string, unknown>) || {};

  try {
    const { error } = await supabase.from("waitlist").insert([
      {
        email: validated.email,
        plan: validated.plan,
        visitor_id: typeof visitor_id === "string" ? visitor_id.trim().substring(0, 256) : null,
        session_id: typeof session_id === "string" ? session_id.trim().substring(0, 256) : null,
      },
    ]);

    if (error) {
      // 23505 is PostgreSQL code for unique constraint violation (duplicate key value violates unique constraint)
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email has already been registered on our waitlist." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: error.message || "Failed to join waitlist. Please try again later." },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true },
    {
      status: 201,
      headers: {
        "X-RateLimit-Limit": "3",
        "X-RateLimit-Remaining": String(remaining),
      },
    },
  );
}

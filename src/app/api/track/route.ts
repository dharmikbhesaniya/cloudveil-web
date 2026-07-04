import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Database tracking not configured" },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid body structure" }, { status: 400 });
  }

  const {
    visitor_id,
    session_id,
    path,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    gclid,
    gbraid,
    wbraid,
    gad_source,
    referrer,
  } = body as Record<string, unknown>;

  // Basic validation for required fields
  if (typeof visitor_id !== "string" || !visitor_id.trim()) {
    return NextResponse.json({ error: "visitor_id is required" }, { status: 400 });
  }
  if (typeof session_id !== "string" || !session_id.trim()) {
    return NextResponse.json({ error: "session_id is required" }, { status: 400 });
  }
  if (typeof path !== "string" || !path.trim()) {
    return NextResponse.json({ error: "path is required" }, { status: 400 });
  }

  // Extract client IP and User Agent
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "0.0.0.0";
  const userAgent = req.headers.get("user-agent") ?? "Unknown";

  try {
    const { error: dbError } = await supabase.from("page_visits").insert([
      {
        visitor_id: visitorIdSanitize(visitor_id),
        session_id: sessionIdSanitize(session_id),
        path: path.trim().substring(0, 2048),
        utm_source: typeof utm_source === "string" ? utm_source.trim().substring(0, 1024) : null,
        utm_medium: typeof utm_medium === "string" ? utm_medium.trim().substring(0, 1024) : null,
        utm_campaign: typeof utm_campaign === "string" ? utm_campaign.trim().substring(0, 1024) : null,
        utm_term: typeof utm_term === "string" ? utm_term.trim().substring(0, 1024) : null,
        utm_content: typeof utm_content === "string" ? utm_content.trim().substring(0, 1024) : null,
        gclid: typeof gclid === "string" ? gclid.trim().substring(0, 1024) : null,
        gbraid: typeof gbraid === "string" ? gbraid.trim().substring(0, 1024) : null,
        wbraid: typeof wbraid === "string" ? wbraid.trim().substring(0, 1024) : null,
        gad_source: typeof gad_source === "string" ? gad_source.trim().substring(0, 1024) : null,
        referrer: typeof referrer === "string" ? referrer.trim().substring(0, 2048) : null,
        user_agent: userAgent.substring(0, 2048),
        ip,
      },
    ]);

    if (dbError) {
      console.error("Supabase tracking insert error:", dbError);
      return NextResponse.json({ error: "Failed to write tracking log" }, { status: 500 });
    }
  } catch (err) {
    console.error("Unexpected database write error during page visit tracking:", err);
    return NextResponse.json({ error: "Database write failure" }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

function visitorIdSanitize(val: string): string {
  return val.trim().substring(0, 256).replace(/[^\w-]/g, "");
}

function sessionIdSanitize(val: string): string {
  return val.trim().substring(0, 256).replace(/[^\w-]/g, "");
}

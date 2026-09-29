/**
 * POST /api/contact — delivers a contact-form submission to the Cloudex Technologies mailbox.
 *
 * `force-dynamic`: the handler sends mail through the cloudex-mail API, so it must never
 * be statically evaluated at build time.
 */

import { NextResponse } from "next/server";

import {
  buildMessage,
  readEnv,
  sendMessage,
  validate,
} from "@/lib/contact-mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Best-effort per-IP throttle. In-memory, so it resets on redeploy and is per-process —
 * with more than one instance behind a load balancer each gets its own budget. It is a
 * speed bump for casual abuse, NOT a security control; put real rate limiting at the
 * reverse proxy if this ever gets hammered.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function recentCount(ip: string): number {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length) hits.set(ip, recent);
  else hits.delete(ip);
  return recent.length;
}

/**
 * Counting is deliberately split from checking. Only a real delivery attempt is
 * recorded, so a visitor who mistypes their email five times is not locked out for ten
 * minutes over five 400s — the budget exists to limit mail we actually send.
 */
function record(ip: string): void {
  const recent = hits.get(ip) ?? [];
  recent.push(Date.now());
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude unbounded-growth guard
}

export async function POST(request: Request): Promise<NextResponse> {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (recentCount(ip) >= MAX_PER_WINDOW) {
    return NextResponse.json(
      { error: "Too many messages from this address. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request body." }, { status: 400 });
  }

  const result = validate(body);

  // A filled honeypot: report success so the bot learns nothing, but send no mail.
  if (result.ok === "honeypot") return NextResponse.json({ ok: true });
  if (result.ok === false) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  let env;
  try {
    env = readEnv();
  } catch (error) {
    // Misconfiguration is ours, not the visitor's: log it loudly, stay vague publicly.
    console.error("[contact] configuration error:", error);
    return NextResponse.json(
      { error: "The contact form is not configured. Please email us directly." },
      { status: 500 },
    );
  }

  try {
    record(ip);
    await sendMessage(env, buildMessage(result.fields, env));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] send failed:", error);
    return NextResponse.json(
      { error: "We could not send your message. Please try again or email us directly." },
      { status: 502 },
    );
  }
}

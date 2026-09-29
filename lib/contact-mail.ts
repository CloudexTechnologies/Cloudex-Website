/**
 * Contact-form mail transport and payload validation.
 *
 * Kept out of the route handler so the validation can be unit-tested without a live
 * mail service. Delivery goes through the cloudex-mail Worker's HTTP API
 * (`POST /api/send` on mail.cloudextechnologies.io), not SMTP: the Worker sends with
 * Cloudflare Email Sending from a mailbox it owns, so SPF/DKIM pass for the domain.
 */

import { CONTACT_FORM_FIELDS, CONTACT_HONEYPOT_FIELDS } from
  "@/components/contact/contact-fields";

/** Max accepted length per field. Anything longer is almost certainly abuse. */
const MAX_LEN: Record<string, number> = { Message: 5000 };
const DEFAULT_MAX_LEN = 200;

export interface ContactPayload {
  readonly fields: Record<string, string>;
}

export type ValidationResult =
  | { ok: true; fields: Record<string, string> }
  | { ok: false; status: number; error: string }
  /** A honeypot decoy was filled: silently drop, but report success to the bot. */
  | { ok: "honeypot" };

/** RFC-5322 is not worth implementing; this rejects the mistakes people actually make. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, status: 400, error: "Malformed request body." };
  }
  const raw = body as Record<string, unknown>;

  // Honeypots first: if a decoy is filled we never reach the transport, but the caller
  // still gets a 200 so a bot cannot use the response to learn the trap exists.
  for (const decoy of CONTACT_HONEYPOT_FIELDS) {
    const v = raw[decoy];
    if (typeof v === "string" && v.trim() !== "") return { ok: "honeypot" };
  }

  const fields: Record<string, string> = {};
  for (const field of CONTACT_FORM_FIELDS) {
    const v = raw[field.name];
    if (typeof v !== "string") {
      return { ok: false, status: 400, error: `Missing field: ${field.label}.` };
    }
    const value = v.trim();
    if (field.required && value === "") {
      return { ok: false, status: 400, error: `${field.label} is required.` };
    }
    const max = MAX_LEN[field.name] ?? DEFAULT_MAX_LEN;
    if (value.length > max) {
      return { ok: false, status: 400, error: `${field.label} is too long.` };
    }
    if (field.type === "email" && !EMAIL_RE.test(value)) {
      return { ok: false, status: 400, error: "Please enter a valid email address." };
    }
    fields[field.name] = value;
  }
  return { ok: true, fields };
}

/* -------------------------------------------------------------------------- */
/* Transport                                                                   */
/* -------------------------------------------------------------------------- */

export interface MailEnv {
  /** Worker origin, e.g. https://mail.cloudextechnologies.io (no trailing slash). */
  url: string;
  /** Bearer key minted in the Worker's `api_keys` table. */
  apiKey: string;
  /** Must be an active mailbox in the Worker, or it answers 404. */
  from: string;
  to: string;
}

/** Throws with a precise message naming the variable that is missing. */
export function readEnv(): MailEnv {
  const need = (k: string): string => {
    const v = process.env[k];
    if (!v) throw new Error(`${k} is not set. See .env.example.`);
    return v;
  };
  return {
    url: need("CLOUDEX_MAIL_URL").replace(/\/+$/, ""),
    apiKey: need("CLOUDEX_MAIL_API_KEY"),
    from: need("CONTACT_FROM"),
    to: need("CONTACT_TO"),
  };
}

const esc = (s: string): string =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function buildMessage(fields: Record<string, string>, env: MailEnv) {
  const name = [fields["Name"], fields["Last name"]].filter(Boolean).join(" ");
  const email = fields["Email"] ?? "";
  const rows = CONTACT_FORM_FIELDS.map((f) => [f.label, fields[f.name] ?? ""] as const);

  // The Worker sets its own thread Reply-To on every send, so "Reply" in webmail would
  // come back to our own mailbox. The visitor's address therefore leads the subject and
  // body: reply by writing to it directly.
  return {
    from: env.from,
    to: env.to,
    subject: `New enquiry from ${name} <${email}>`,
    text: `Reply to: ${email}\n\n` + rows.map(([l, v]) => `${l}:\n${v}`).join("\n\n"),
    html:
      `<p style="font:14px/1.5 system-ui,sans-serif">Reply to: ` +
      `<a href="mailto:${esc(email)}">${esc(email)}</a></p>` +
      `<table style="font:14px/1.5 system-ui,sans-serif;border-collapse:collapse">` +
      rows
        .map(
          ([l, v]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">${esc(l)}</td>` +
            `<td style="padding:6px 0">${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
        )
        .join("") +
      `</table>`,
  };
}

/** Delivers through cloudex-mail. Throws with the Worker's error text on any non-2xx. */
export async function sendMessage(env: MailEnv, message: ReturnType<typeof buildMessage>): Promise<void> {
  const res = await fetch(`${env.url}/api/send`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(message),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    throw new Error(`cloudex-mail ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}

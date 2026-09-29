/**
 * Contact-form mail transport and payload validation.
 *
 * Kept out of the route handler so the validation can be unit-tested without a live
 * SMTP server, and so the transport is created once per server process rather than
 * once per request (nodemailer pools connections).
 */

import nodemailer, { type Transporter } from "nodemailer";

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
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
  rejectUnauthorized: boolean;
}

/** Throws with a precise message naming the variable that is missing. */
export function readEnv(): MailEnv {
  const need = (k: string): string => {
    const v = process.env[k];
    if (!v) throw new Error(`${k} is not set. See .env.example.`);
    return v;
  };
  const port = Number(process.env.SMTP_PORT ?? 587);
  return {
    host: need("SMTP_HOST"),
    port,
    // 465 is implicit TLS; 587 and 25 start plaintext and upgrade with STARTTLS.
    secure: (process.env.SMTP_SECURE ?? String(port === 465)) === "true",
    user: need("SMTP_USER"),
    pass: need("SMTP_PASS"),
    from: need("CONTACT_FROM"),
    to: need("CONTACT_TO"),
    // Self-signed certs are common on a self-hosted mailserver. Opt out explicitly.
    rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false",
  };
}

let cached: Transporter | null = null;

export function getTransport(env: MailEnv): Transporter {
  if (cached) return cached;
  cached = nodemailer.createTransport({
    host: env.host,
    port: env.port,
    secure: env.secure,
    auth: { user: env.user, pass: env.pass },
    tls: { rejectUnauthorized: env.rejectUnauthorized },
    pool: true,
    maxConnections: 3,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return cached;
}

const esc = (s: string): string =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function buildMessage(fields: Record<string, string>, env: MailEnv) {
  const name = [fields["Name"], fields["Last name"]].filter(Boolean).join(" ");
  const rows = CONTACT_FORM_FIELDS.map((f) => [f.label, fields[f.name] ?? ""] as const);

  return {
    from: env.from,
    to: env.to,
    // The visitor's address must NOT be the From, or SPF/DKIM for the domain fail and
    // the mail is filed as spam. Reply-To makes "Reply" in the mail client still work.
    replyTo: `${name} <${fields["Email"]}>`,
    subject: `New enquiry from ${name}`,
    text: rows.map(([l, v]) => `${l}:\n${v}`).join("\n\n"),
    html:
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

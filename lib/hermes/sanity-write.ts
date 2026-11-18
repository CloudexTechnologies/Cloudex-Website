/**
 * Minimal Sanity HTTP client for /api/hermes/posts: GROQ reads, mutations and image
 * uploads, authenticated with SANITY_WRITE_TOKEN (an Editor token for project so1isjsl).
 * Every call has a timeout; nothing here retries, because mutations are not idempotent.
 */

import { apiVersion, dataset, projectId } from "@/sanity/env";

const TIMEOUT_MS = 15_000;
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export class SanityWriteError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
  }
}

function token(): string {
  const value = process.env.SANITY_WRITE_TOKEN;
  if (!value) throw new SanityWriteError("SANITY_WRITE_TOKEN is not configured");
  return value;
}

export function isWriteConfigured(): boolean {
  return Boolean(process.env.SANITY_WRITE_TOKEN);
}

const base = () => `https://${projectId}.api.sanity.io/v${apiVersion}`;

async function call<T>(url: string, init: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${token()}`, ...init.headers },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 300);
    throw new SanityWriteError(`Sanity ${response.status}: ${detail}`, response.status);
  }
  return (await response.json()) as T;
}

/** Uncached GROQ read through the API (not the CDN), so it sees writes immediately. */
export async function query<T>(groq: string, params: Record<string, unknown> = {}): Promise<T> {
  const url = new URL(`${base()}/data/query/${dataset}`);
  url.searchParams.set("query", groq);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(`$${k}`, JSON.stringify(v));
  url.searchParams.set("perspective", "raw");
  const body = await call<{ result: T }>(url.toString(), { method: "GET" });
  return body.result;
}

export async function mutate(mutations: unknown[]): Promise<void> {
  await call(`${base()}/data/mutate/${dataset}?returnIds=true&visibility=sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mutations }),
  });
}

/**
 * Downloads an https image and uploads it as a Sanity asset. Returns the asset id.
 * The Worker's `global_fetch_strictly_public` flag keeps the download on the public
 * internet, so a crafted URL cannot reach internal addresses.
 */
export async function uploadImageFromUrl(imageUrl: string, filename: string): Promise<string> {
  const source = await fetch(imageUrl, { signal: AbortSignal.timeout(TIMEOUT_MS), redirect: "follow" });
  if (!source.ok) throw new SanityWriteError(`coverImage.url returned ${source.status}`, 400);
  const type = source.headers.get("content-type")?.split(";")[0].trim() ?? "";
  if (!/^image\/(png|jpe?g|webp|gif|avif)$/.test(type)) {
    throw new SanityWriteError(`coverImage.url is not a supported image (got "${type || "unknown"}")`, 400);
  }
  const declared = Number(source.headers.get("content-length") ?? 0);
  if (declared > MAX_IMAGE_BYTES) throw new SanityWriteError("coverImage is larger than 10 MB", 400);
  const bytes = await source.arrayBuffer();
  if (bytes.byteLength > MAX_IMAGE_BYTES) throw new SanityWriteError("coverImage is larger than 10 MB", 400);

  const url = `${base()}/assets/images/${dataset}?filename=${encodeURIComponent(filename)}`;
  const result = await call<{ document: { _id: string } }>(url, {
    method: "POST",
    headers: { "Content-Type": type },
    body: bytes,
  });
  return result.document._id;
}

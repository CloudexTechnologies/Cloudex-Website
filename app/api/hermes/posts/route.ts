/**
 * /api/hermes/posts — the Hermes agent publishes insights articles here.
 *
 *   POST  create an article in Sanity (or replace one with "overwrite": true)
 *   GET   list Hermes-generated articles, drafts and held ones included
 *
 * Both require `Authorization: Bearer <HERMES_API_KEY>`. The body is the shared
 * contract in `lib/hermes/contract.ts` (same as Crystal Telecom), plus the optional
 * Cloudex fields in `lib/hermes/cloudex-fields.ts`. On this site `category` is
 * required and must be a topic pillar slug; a 400 response lists the valid ones.
 *
 * The article is written to Sanity, then the affected pages are revalidated so it is
 * live within seconds. The Python pipeline in `pipeline/` keeps working unchanged.
 */

import { NextResponse, type NextRequest } from "next/server";

import { MAX_BODY_BYTES, isAuthorized, validatePostInput } from "@/lib/hermes/contract";
import { validateCloudexFields } from "@/lib/hermes/cloudex-fields";
import { revalidateInsights } from "@/lib/hermes/revalidate";
import { makeKeyFactory, markdownToPortableText, plainText } from "@/lib/hermes/portable-text";
import {
  SanityWriteError,
  isWriteConfigured,
  mutate,
  waitForCdn,
  query,
  uploadImageFromUrl,
} from "@/lib/hermes/sanity-write";
import { siteUrl } from "@/sanity/env";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };
const AUTHOR_ID = "author-cloudex-research-desk";
const GENERATED_BY = "hermes-api/1.0";
const MAX_DECK = 320;

function json(body: unknown, status = 200): NextResponse {
  return NextResponse.json(body, { status, headers: NO_STORE });
}

async function authorize(request: NextRequest): Promise<NextResponse | null> {
  if (!process.env.HERMES_API_KEY) {
    console.error("[hermes] HERMES_API_KEY is not configured");
    return json({ error: "Publishing is not configured on this site." }, 503);
  }
  const ok = await isAuthorized(request.headers.get("authorization"), process.env.HERMES_API_KEY);
  return ok ? null : json({ error: "Unauthorized" }, 401);
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ") > max / 2 ? cut.lastIndexOf(" ") : cut.length)}…`;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const denied = await authorize(request);
  if (denied) return denied;
  if (!isWriteConfigured()) {
    console.error("[hermes] SANITY_WRITE_TOKEN is not configured");
    return json({ error: "Publishing is not configured on this site." }, 503);
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return json({ error: "Content-Type must be application/json." }, 415);
  }
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return json({ error: `Body must be at most ${MAX_BODY_BYTES} bytes.` }, 413);
  }
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Body is not valid JSON." }, 400);
  }

  try {
    const pillars = await query<{ _id: string; slug: string }[]>(
      `*[_type == "category" && defined(slug.current)] | order(order asc) { _id, "slug": slug.current }`,
    );
    const pillarSlugs = pillars.map((p) => p.slug);

    const base = validatePostInput(body, pillarSlugs);
    const extra = validateCloudexFields(typeof body === "object" && body ? body : {});
    const errors = [...(base.ok ? [] : base.errors), ...(extra.ok ? [] : extra.errors)];
    if (typeof body !== "object" || body === null || !body.category) {
      errors.push(`category is required: one of ${pillarSlugs.join(", ")}.`);
    }
    if (errors.length || !base.ok || !extra.ok) return json({ error: "Invalid post.", details: errors }, 400);
    const input = base.value;
    const fields = extra.value;
    const pillar = pillars.find((p) => p.slug === input.category)!;

    const key = makeKeyFactory();
    const blocks = markdownToPortableText(input.markdown, key);
    const text = plainText(blocks);
    if (!text.trim()) return json({ error: "Invalid post.", details: ["markdown has no text."] }, 400);

    const existing = await query<{ _id: string; pillar?: string } | null>(
      `*[_type == "post" && slug.current == $slug][0]{ _id, "pillar": pillar->slug.current }`,
      { slug: input.slug },
    );
    if (existing && !input.overwrite) {
      return json({ error: `An article with slug "${input.slug}" already exists. Send "overwrite": true to replace it.` }, 409);
    }

    let heroImage: Record<string, unknown> | undefined;
    if (input.coverImage) {
      try {
        const assetId = await uploadImageFromUrl(input.coverImage.url, `${input.slug}-hero`);
        heroImage = { _type: "image", asset: { _type: "reference", _ref: assetId }, alt: input.coverImage.alt };
      } catch (error) {
        if (error instanceof SanityWriteError && error.status === 400) {
          return json({ error: "Invalid post.", details: [error.message] }, 400);
        }
        throw error;
      }
    }

    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const now = new Date().toISOString();
    const deck = input.excerpt ?? truncate(text.split("\n").find((l) => l.trim()) ?? input.title, MAX_DECK);
    const document = {
      _id: existing?._id ?? `post-hermes-${input.slug}`,
      _type: "post",
      title: input.title,
      slug: { _type: "slug", current: input.slug },
      deck,
      contentType: fields.contentType,
      pillar: { _type: "reference", _ref: pillar._id },
      author: { _type: "reference", _ref: AUTHOR_ID },
      publishedAt: input.publishedAt,
      reviewedAt: now,
      ...(heroImage ? { heroImage } : {}),
      ...(fields.keyTakeaways ? { keyTakeaways: fields.keyTakeaways } : {}),
      body: blocks,
      ...(fields.faq ? { faq: fields.faq.map((f) => ({ _type: "faqItem", _key: key(), ...f })) } : {}),
      ...(fields.citations
        ? { citations: fields.citations.map((c) => ({ _type: "citation", _key: key(), ...c, accessedAt: now })) }
        : {}),
      primaryKeyword: fields.primaryKeyword ?? input.title,
      ...(fields.secondaryKeywords ? { secondaryKeywords: fields.secondaryKeywords } : {}),
      searchIntent: fields.contentType === "commercial" ? "commercial" : "informational",
      seo: { _type: "seo", title: input.title.slice(0, 70), description: truncate(deck, 160), noIndex: false },
      wordCount,
      readingTime: Math.max(1, Math.round(wordCount / 230)),
      status: input.status,
      generatedBy: GENERATED_BY,
    };

    // createIfNotExists for new posts, so two concurrent creates of one slug cannot
    // both succeed; createOrReplace only when Hermes explicitly asked to overwrite.
    const rev = await mutate([existing ? { createOrReplace: document } : { createIfNotExists: document }]);
    // Refresh only once Sanity's CDN serves this version, or the old page would be
    // cached again for a whole ISR window (see waitForCdn).
    if (!(await waitForCdn(document._id, rev))) console.warn("[hermes] CDN did not catch up; refreshing anyway", input.slug);

    revalidateInsights(input.slug, pillar.slug);
    if (existing?.pillar && existing.pillar !== pillar.slug) revalidateInsights(undefined, existing.pillar);

    return json(
      {
        ok: true,
        created: !existing,
        id: document._id,
        slug: input.slug,
        status: input.status,
        url: `${siteUrl.replace(/\/+$/, "")}/insights/${input.slug}`,
        live: input.status === "published" && new Date(input.publishedAt) <= new Date(),
      },
      existing ? 200 : 201,
    );
  } catch (error) {
    console.error("[hermes] publishing failed", error);
    return json({ error: "Could not save the article. Try again later." }, 502);
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const denied = await authorize(request);
  if (denied) return denied;
  if (!isWriteConfigured()) return json({ error: "Publishing is not configured on this site." }, 503);
  try {
    const posts = await query(
      `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...500] {
        "slug": slug.current, title, status, "category": pillar->slug.current, publishedAt, generatedBy, "updatedAt": _updatedAt
      }`,
    );
    return json({ posts });
  } catch (error) {
    console.error("[hermes] listing failed", error);
    return json({ error: "Could not list articles. Try again later." }, 502);
  }
}

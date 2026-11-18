/**
 * Optional Cloudex-only fields Hermes may add to the shared post body, matching the
 * Sanity `post` schema (studio/schemaTypes/post.ts):
 *
 *   "contentType": "research" | "commercial"         default "research"
 *   "keyTakeaways": ["…", …]                          up to 6
 *   "primaryKeyword": "…", "secondaryKeywords": ["…"] default: the title / none
 *   "faq": [{ "question": "…", "answer": "…" }]       up to 8
 *   "citations": [{ "title": "…", "url": "https://…", "publisher": "…" }]  up to 30
 *
 * On this site "category" is required and must be a topic pillar slug.
 */

export interface CloudexFields {
  contentType: "research" | "commercial";
  keyTakeaways?: string[];
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  faq?: { question: string; answer: string }[];
  citations?: { title: string; url: string; publisher?: string }[];
}

function strings(value: unknown, max: number, maxLen: number, name: string, errors: string[]) {
  if (value === undefined || value === null) return undefined;
  if (!Array.isArray(value) || value.length > max || value.some((v) => typeof v !== "string" || !v.trim() || v.length > maxLen)) {
    errors.push(`${name} must be an array of at most ${max} non-empty strings (≤ ${maxLen} chars).`);
    return undefined;
  }
  return value.map((v: string) => v.trim());
}

function isHttps(url: unknown): url is string {
  if (typeof url !== "string") return false;
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}

export function validateCloudexFields(
  body: Record<string, unknown>,
): { ok: true; value: CloudexFields } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  let contentType: CloudexFields["contentType"] = "research";
  if (body.contentType !== undefined && body.contentType !== null) {
    if (body.contentType === "research" || body.contentType === "commercial") contentType = body.contentType;
    else errors.push('contentType must be "research" or "commercial".');
  }

  const keyTakeaways = strings(body.keyTakeaways, 6, 300, "keyTakeaways", errors);
  const secondaryKeywords = strings(body.secondaryKeywords, 10, 80, "secondaryKeywords", errors);

  let primaryKeyword: string | undefined;
  if (body.primaryKeyword !== undefined && body.primaryKeyword !== null) {
    if (typeof body.primaryKeyword === "string" && body.primaryKeyword.trim() && body.primaryKeyword.length <= 80)
      primaryKeyword = body.primaryKeyword.trim();
    else errors.push("primaryKeyword must be a non-empty string of at most 80 characters.");
  }

  let faq: CloudexFields["faq"];
  if (body.faq !== undefined && body.faq !== null) {
    const ok =
      Array.isArray(body.faq) &&
      body.faq.length <= 8 &&
      body.faq.every(
        (f) =>
          f && typeof f === "object" &&
          typeof (f as { question?: unknown }).question === "string" && (f as { question: string }).question.trim() &&
          typeof (f as { answer?: unknown }).answer === "string" && (f as { answer: string }).answer.trim(),
      );
    if (ok) {
      faq = (body.faq as { question: string; answer: string }[]).map((f) => ({
        question: f.question.trim().slice(0, 300),
        answer: f.answer.trim().slice(0, 2000),
      }));
    } else errors.push("faq must be at most 8 { question, answer } objects with non-empty strings.");
  }

  let citations: CloudexFields["citations"];
  if (body.citations !== undefined && body.citations !== null) {
    const ok =
      Array.isArray(body.citations) &&
      body.citations.length <= 30 &&
      body.citations.every(
        (c) => c && typeof c === "object" && isHttps((c as { url?: unknown }).url) &&
          typeof (c as { title?: unknown }).title === "string",
      );
    if (ok) {
      citations = (body.citations as { title: string; url: string; publisher?: unknown }[]).map((c) => ({
        title: c.title.trim().slice(0, 300),
        url: c.url,
        publisher: typeof c.publisher === "string" ? c.publisher.trim().slice(0, 120) : undefined,
      }));
    } else errors.push("citations must be at most 30 { title, url (https), publisher? } objects.");
  }

  if (errors.length) return { ok: false, errors };
  return { ok: true, value: { contentType, keyTakeaways, primaryKeyword, secondaryKeywords, faq, citations } };
}

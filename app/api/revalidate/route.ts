import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type?: string;
  slug?: string;
  pillar?: string;
};

/**
 * Optional fast path. Insights pages already revalidate on a 5-minute ISR window,
 * so the site is correct without this route; wiring a Sanity GROQ webhook here
 * just collapses that window to seconds.
 *
 * Sanity webhook configuration:
 *   URL        https://cloudextechnologies.io/api/revalidate
 *   Trigger    Create, Update, Delete
 *   Filter     _type in ["post", "category", "author"]
 *   Projection {"_type": _type, "slug": slug.current, "pillar": pillar->slug.current}
 *   Secret     same value as SANITY_REVALIDATE_SECRET
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET is not configured; relying on ISR." },
      { status: 501 },
    );
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(request, secret, true);

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    const revalidated: string[] = [];
    const revalidate = (path: string) => {
      revalidatePath(path);
      revalidated.push(path);
    };

    // Any content change can reorder the index, the feeds and the sitemap.
    revalidate("/insights");
    revalidate("/sitemap.xml");
    revalidate("/llms.txt");
    revalidate("/insights/feed.xml");

    if (body?.slug) revalidate(`/insights/${body.slug}`);
    if (body?.pillar) revalidate(`/insights/topic/${body.pillar}`);

    return NextResponse.json({ revalidated, at: Date.now() });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

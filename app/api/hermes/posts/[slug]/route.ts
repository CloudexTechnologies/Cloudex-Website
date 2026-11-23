/**
 * DELETE /api/hermes/posts/<slug> — takes an article off the site by setting its
 * status to "archived" in Sanity (it stays in the Studio and can be restored there).
 * Requires `Authorization: Bearer <HERMES_API_KEY>`.
 */

import { NextResponse, type NextRequest } from "next/server";

import { isAuthorized } from "@/lib/hermes/contract";
import { revalidateInsights } from "@/lib/hermes/revalidate";
import { isWriteConfigured, mutate, query } from "@/lib/hermes/sanity-write";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse> {
  if (!(await isAuthorized(request.headers.get("authorization"), process.env.HERMES_API_KEY))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_STORE });
  }
  if (!isWriteConfigured()) {
    return NextResponse.json({ error: "Publishing is not configured on this site." }, { status: 503, headers: NO_STORE });
  }
  const { slug } = await params;
  try {
    const doc = await query<{ _id: string; pillar?: string } | null>(
      `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0]{ _id, "pillar": pillar->slug.current }`,
      { slug },
    );
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404, headers: NO_STORE });
    await mutate([{ patch: { id: doc._id, set: { status: "archived" } } }]);
    revalidateInsights(slug, doc.pillar);
    return NextResponse.json({ ok: true, slug, status: "archived" }, { headers: NO_STORE });
  } catch (error) {
    console.error("[hermes] archiving failed", error);
    return NextResponse.json({ error: "Could not archive the article." }, { status: 502, headers: NO_STORE });
  }
}

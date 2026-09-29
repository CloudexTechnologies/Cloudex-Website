import { llmsFullTxt } from "@/lib/llms";

/** /llms-full.txt — see lib/llms.ts. Built once at build time. */
export const dynamic = "force-static";

export function GET(): Response {
  return new Response(llmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}

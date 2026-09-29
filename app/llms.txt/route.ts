import { llmsTxt, type LlmsArticle } from "@/lib/llms";
import { client } from "@/sanity/client";
import { LLMS_POSTS_QUERY } from "@/sanity/queries";

/** /llms.txt — see lib/llms.ts. Regenerated with the insights ISR window. */
export const revalidate = 300;

export async function GET(): Promise<Response> {
  let articles: LlmsArticle[] = [];
  try {
    articles = await client.fetch<LlmsArticle[]>(LLMS_POSTS_QUERY);
  } catch (error) {
    // A Sanity outage should drop the Insights list, not 500 the file.
    console.error("llms.txt: failed to load articles from Sanity", error);
  }
  return new Response(llmsTxt(articles), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}

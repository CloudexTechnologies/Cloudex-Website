import { client } from "@/sanity/client";
import { REVALIDATE_SECONDS, siteUrl } from "@/sanity/env";
import { CONTENT_INDEX_QUERY } from "@/sanity/queries";
import { STATIC_ROUTES } from "@/lib/staticRoutes";

// Next requires a literal here, so this must stay in step with REVALIDATE_SECONDS.
export const revalidate = 300;

type IndexResult = {
  posts: {
    title: string;
    slug: string;
    deck: string;
    keyTakeaways?: string[];
    contentType: string;
    publishedAt: string;
    pillar?: { title: string; slug: string };
    author?: string;
  }[];
  pillars: { title: string; slug: string; description: string }[];
};

const COMPANY_OVERVIEW = `# Cloudex Technologies

> Cloudex Technologies builds intelligent systems — AI employees, custom software, and digital growth solutions — that help businesses operate smarter and scale with confidence.

## What We Do

Cloudex Technologies is an AI and technology company specialising in:

- **AI Employees**: Autonomous digital workers that handle customer support, lead qualification, scheduling, and operational tasks around the clock — without needing to be managed.
- **AI Solutions**: Custom artificial intelligence integrations including LLM pipelines, automation workflows, data intelligence tools, and process automation built to fit existing business operations.
- **Custom Software**: Bespoke web applications, internal tools, dashboards, and platforms designed and engineered for specific business requirements.
- **Digital Growth**: High-performance websites, conversion optimisation, and digital marketing systems built for measurable growth outcomes.

## Who We Serve

We work with businesses across:

- Healthcare — reducing admin burden, automating patient communication, and streamlining clinical operations
- Financial Services — compliance automation, client onboarding, and data intelligence
- E-commerce — AI-powered customer support, personalisation, and operational automation
- Real Estate — lead nurturing, property enquiry handling, and appointment booking automation
- SaaS & Technology — product integrations, AI feature development, and scaling infrastructure
- Legal — document automation, client communication, and case management tools
- Education — student engagement systems, onboarding automation, and communication tools
- Hospitality — guest experience automation, booking management, and service workflows

## Core Belief

We believe businesses should not be limited by their headcount. AI and technology should remove the ceiling on what a team can accomplish — handling the repetitive, the time-consuming, and the scalable so people can focus on the work that actually requires them.`;

function pageSection(): string {
  const groups: Record<string, string> = {
    core: "## Pages",
    capabilities: "### Capabilities",
    industries: "### Industries",
  };

  return (["core", "capabilities", "industries"] as const)
    .map((group) => {
      const lines = STATIC_ROUTES.filter((route) => route.group === group)
        .map((route) => `- ${route.label}: ${siteUrl}${route.path}`)
        .join("\n");
      return `${groups[group]}\n\n${lines}`;
    })
    .join("\n\n");
}

/**
 * Serves the llms.txt convention: a plain-text brief an assistant can read in one
 * request instead of crawling. Articles are listed with their standfirst and key
 * takeaways so a model can cite the right page without fetching each one.
 */
export async function GET() {
  let content: IndexResult = { posts: [], pillars: [] };
  try {
    content = await client.fetch<IndexResult>(CONTENT_INDEX_QUERY);
  } catch (error) {
    console.error("llms.txt: failed to load content from Sanity", error);
  }

  const sections: string[] = [COMPANY_OVERVIEW, pageSection()];

  if (content.pillars.length > 0) {
    sections.push(
      `## Insight Topics\n\n${content.pillars
        .map(
          (pillar) =>
            `- **${pillar.title}** (${siteUrl}/insights/topic/${pillar.slug}): ${pillar.description}`,
        )
        .join("\n")}`,
    );
  }

  if (content.posts.length > 0) {
    const articles = content.posts
      .map((post) => {
        const header = `### ${post.title}`;
        const meta = [
          `URL: ${siteUrl}/insights/${post.slug}`,
          `Published: ${post.publishedAt?.slice(0, 10)}`,
          post.pillar ? `Topic: ${post.pillar.title}` : null,
          post.author ? `Author: ${post.author}` : null,
        ]
          .filter(Boolean)
          .join(" | ");

        const takeaways = post.keyTakeaways?.length
          ? `\n\nKey points:\n${post.keyTakeaways.map((item) => `- ${item}`).join("\n")}`
          : "";

        return `${header}\n\n${meta}\n\n${post.deck}${takeaways}`;
      })
      .join("\n\n");

    sections.push(
      `## Articles\n\nAll articles cite their sources and list the publication date. Full index: ${siteUrl}/insights\n\n${articles}`,
    );
  }

  sections.push(
    `## Contact\n\nTo enquire about working with Cloudex Technologies, visit: ${siteUrl}/contact`,
  );

  return new Response(sections.join("\n\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
    },
  });
}

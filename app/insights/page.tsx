import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";
import { InsightsShell } from "@/components/insights/InsightsShell";
import { InsightsBento } from "@/components/insights/InsightsBento";
import { InsightsHeader } from "@/components/insights/InsightsHeader";
import { JsonLd } from "@/components/insights/JsonLd";
import { PillarNav } from "@/components/insights/PillarNav";
import { Pagination } from "@/components/insights/Pagination";
import { collectionGraph } from "@/lib/structuredData";
import { client } from "@/sanity/client";
import { REVALIDATE_SECONDS } from "@/sanity/env";
import { PILLARS_QUERY, POSTS_COUNT_QUERY, POSTS_QUERY } from "@/sanity/queries";
import type { Pillar, PostCard } from "@/sanity/types";

// Next requires a literal here, so this must stay in step with REVALIDATE_SECONDS.
export const revalidate = 300;

const PER_PAGE = 9;

export const metadata: Metadata = {
  title: "Insights on AI Systems, Automation and Software | Cloudex Technologies",
  description:
    "Technical analysis of AI systems, agent architectures and applied automation, with practical guidance on deploying them inside a real business. Written and cited, not generated filler.",
  alternates: { canonical: "/insights", languages: { en: "/insights", "x-default": "/insights" } },
  openGraph: {
    type: "website",
    title: "Insights on AI Systems, Automation and Software",
    description:
      "Technical analysis of AI systems, agent architectures and applied automation, with practical guidance on deploying them inside a real business.",
    url: "/insights",
    siteName: "Cloudex Technologies",
  },
};

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);
  const start = (page - 1) * PER_PAGE;

  const [posts, total, pillars] = await Promise.all([
    client.fetch<PostCard[]>(POSTS_QUERY, { start, end: start + PER_PAGE }),
    client.fetch<number>(POSTS_COUNT_QUERY),
    client.fetch<Pillar[]>(PILLARS_QUERY),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <InsightsShell>
      {total > 0 && (
        <JsonLd
          data={collectionGraph({
            title: "Cloudex Insights",
            description:
              "Technical analysis of AI systems, agent architectures, and applied automation.",
            path: "/insights",
            items: posts.map((post) => ({ title: post.title, slug: post.slug })),
          })}
        />
      )}

      <InsightsHeader
        eyebrow="Insights"
        title="Thinking that helps you make better technology decisions"
        deck="Analysis of AI systems and the software around them, from people who build and deploy them for real businesses. No hype, no listicles, and every claim sourced."
      >
        {pillars.length > 0 && <PillarNav pillars={pillars} />}
      </InsightsHeader>

      {total > 0 ? (
        <section className="insights-list">
          <div className="container">
            <InsightsBento posts={posts} />
            <Pagination basePath="/insights" current={page} totalPages={totalPages} />
          </div>
        </section>
      ) : (
        <EmptyState />
      )}
    </InsightsShell>
  );
}

/**
 * Shown until the pipeline publishes its first article. Kept deliberately honest
 * — an empty grid with a "0 results" label reads worse than saying so.
 */
function EmptyState() {
  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "48px 40px",
            borderRadius: 24,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            maxWidth: 640,
            margin: "0 auto",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(37,99,235,0.1)",
              border: "1px solid rgba(37,99,235,0.2)",
            }}
          >
            <Lightbulb size={24} style={{ color: "var(--accent)" }} strokeWidth={1.5} />
          </div>
          <h2
            style={{
              fontSize: "clamp(20px, 2.5vw, 30px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: 4,
            }}
          >
            First articles publishing shortly
          </h2>
          <p
            style={{
              fontSize: "clamp(14px, 1.5vw, 16px)",
              color: "var(--text-2)",
              lineHeight: 1.75,
              maxWidth: 480,
            }}
          >
            New analysis lands twice a week. Tell us what you are trying to work out and we will
            point you at the right thinking in the meantime.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 26px",
              borderRadius: 999,
              background: "var(--accent)",
              color: "#fff",
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
              marginTop: 4,
            }}
          >
            Get in touch
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

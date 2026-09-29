import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { BlurText } from "@/components/ui/BlurText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageHeroBackground } from "@/components/ui/PageHeroBackground";
import { ArticleCard } from "@/components/insights/ArticleCard";
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
    "Technical analysis of AI systems, agent architectures, and applied automation — plus practical guidance on deploying them inside a real business. Written and cited, not generated filler.",
  alternates: { canonical: "/insights", languages: { en: "/insights", "x-default": "/insights" } },
  openGraph: {
    type: "website",
    title: "Insights on AI Systems, Automation and Software",
    description:
      "Technical analysis of AI systems, agent architectures, and applied automation — plus practical guidance on deploying them inside a real business.",
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
  // The lead slot only makes sense on the first page of the newest-first list.
  const featured = page === 1 ? posts[0] : undefined;
  const rest = featured ? posts.slice(1) : posts;

  return (
    <InnerPageLayout>
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

      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "62vh",
          display: "flex",
          alignItems: "center",
          background: "var(--bg)",
          position: "relative",
          overflow: "hidden",
          paddingTop: 76,
        }}
      >
        <PageHeroBackground />
        <div
          className="container"
          style={{ position: "relative", zIndex: 1, paddingTop: 72, paddingBottom: 64 }}
        >
          <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
            <ScrollReveal>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 18px",
                  borderRadius: 999,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  fontSize: 11,
                  color: "var(--text-3)",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 36,
                }}
              >
                Insights
              </span>
            </ScrollReveal>

            <h1
              style={{
                fontSize: "clamp(34px, 5.8vw, 70px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.06,
                marginBottom: 32,
              }}
            >
              <BlurText
                text="Thinking that helps you make better technology decisions."
                delay={0.1}
                wordDelay={0.036}
              />
            </h1>

            <ScrollReveal delay={0.5}>
              <p
                style={{
                  fontSize: "clamp(16px, 1.9vw, 20px)",
                  color: "var(--text-2)",
                  lineHeight: 1.8,
                  maxWidth: 620,
                  margin: "0 auto",
                }}
              >
                No hype. No generic listicles. Analysis of AI systems and the software around them,
                from people who build and deploy them for real businesses — every claim sourced.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Pillar navigation ── */}
      {pillars.length > 0 && (
        <section style={{ background: "var(--bg)", paddingBottom: 8 }}>
          <div className="container">
            <PillarNav pillars={pillars} />
          </div>
        </section>
      )}

      {/* ── Articles ── */}
      {total > 0 ? (
        <section style={{ background: "var(--bg)", paddingTop: 48, paddingBottom: 104 }}>
          <div className="container">
            {featured && (
              <div style={{ marginBottom: 40 }}>
                <ArticleCard post={featured} featured />
              </div>
            )}

            {rest.length > 0 && (
              <div className="insight-grid">
                {rest.map((post) => (
                  <ArticleCard key={post._id} post={post} />
                ))}
              </div>
            )}

            <Pagination basePath="/insights" current={page} totalPages={totalPages} />
          </div>
        </section>
      ) : (
        <EmptyState />
      )}
    </InnerPageLayout>
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

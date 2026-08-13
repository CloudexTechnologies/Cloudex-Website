import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { JsonLd } from "@/components/insights/JsonLd";
import { Pagination } from "@/components/insights/Pagination";
import { PillarNav } from "@/components/insights/PillarNav";
import { PageHeroBackground } from "@/components/ui/PageHeroBackground";
import { collectionGraph } from "@/lib/structuredData";
import { client, freshClient } from "@/sanity/client";
import { REVALIDATE_SECONDS } from "@/sanity/env";
import {
  PILLAR_QUERY,
  PILLARS_QUERY,
  POSTS_BY_PILLAR_QUERY,
  POSTS_COUNT_BY_PILLAR_QUERY,
} from "@/sanity/queries";
import type { Pillar, PostCard } from "@/sanity/types";

// Next requires a literal here, so this must stay in step with REVALIDATE_SECONDS.
export const revalidate = 300;

const PER_PAGE = 9;

type RouteProps = {
  params: Promise<{ pillar: string }>;
  searchParams: Promise<{ page?: string }>;
};

type PillarDoc = Pick<Pillar, "_id" | "title" | "slug" | "description" | "icon"> & {
  seo: { title: string; description: string };
};

export async function generateStaticParams() {
  const pillars = await freshClient.fetch<{ slug: string }[]>(
    `*[_type == "category" && defined(slug.current)]{ "slug": slug.current }`,
  );
  return pillars.map(({ slug }) => ({ pillar: slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { pillar: slug } = await params;
  const pillar = await client.fetch<PillarDoc | null>(PILLAR_QUERY, { pillar: slug });
  if (!pillar) return {};

  return {
    title: `${pillar.seo.title} | Cloudex Insights`,
    description: pillar.seo.description,
    alternates: { canonical: `/insights/topic/${pillar.slug}` },
    openGraph: {
      type: "website",
      title: `${pillar.seo.title} | Cloudex Insights`,
      description: pillar.seo.description,
      url: `/insights/topic/${pillar.slug}`,
      siteName: "Cloudex Technologies",
    },
  };
}

export default async function PillarPage({ params, searchParams }: RouteProps) {
  const { pillar: slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);
  const start = (page - 1) * PER_PAGE;

  const [pillar, posts, total, pillars] = await Promise.all([
    client.fetch<PillarDoc | null>(PILLAR_QUERY, { pillar: slug }),
    client.fetch<PostCard[]>(POSTS_BY_PILLAR_QUERY, {
      pillar: slug,
      start,
      end: start + PER_PAGE,
    }),
    client.fetch<number>(POSTS_COUNT_BY_PILLAR_QUERY, { pillar: slug }),
    client.fetch<Pillar[]>(PILLARS_QUERY),
  ]);

  if (!pillar) notFound();

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <InnerPageLayout>
      {total > 0 && (
        <JsonLd
          data={collectionGraph({
            title: pillar.title,
            description: pillar.description ?? "",
            path: `/insights/topic/${pillar.slug}`,
            items: posts.map((post) => ({ title: post.title, slug: post.slug })),
          })}
        />
      )}

      <section
        style={{
          background: "var(--bg)",
          position: "relative",
          overflow: "hidden",
          paddingTop: 150,
          paddingBottom: 40,
        }}
      >
        <PageHeroBackground />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-3)",
                marginBottom: 20,
              }}
            >
              Insights · Topic
            </span>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(30px, 4.6vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "var(--text-1)",
                marginBottom: 20,
              }}
            >
              {pillar.title}
            </h1>
            {pillar.description && (
              <p style={{ fontSize: 18, lineHeight: 1.75, color: "var(--text-2)" }}>
                {pillar.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg)", paddingBottom: 12 }}>
        <div className="container">
          <PillarNav pillars={pillars} active={pillar.slug} />
        </div>
      </section>

      <section style={{ background: "var(--bg)", paddingTop: 44, paddingBottom: 104 }}>
        <div className="container">
          {posts.length > 0 ? (
            <>
              <div className="insight-grid">
                {posts.map((post) => (
                  <ArticleCard key={post._id} post={post} />
                ))}
              </div>
              <Pagination
                basePath={`/insights/topic/${pillar.slug}`}
                current={page}
                totalPages={totalPages}
              />
            </>
          ) : (
            <p style={{ textAlign: "center", color: "var(--text-3)", fontSize: 16 }}>
              No articles published under this topic yet.
            </p>
          )}
        </div>
      </section>
    </InnerPageLayout>
  );
}

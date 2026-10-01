import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightsShell } from "@/components/insights/InsightsShell";
import { InsightsBento } from "@/components/insights/InsightsBento";
import { InsightsHeader } from "@/components/insights/InsightsHeader";
import { JsonLd } from "@/components/insights/JsonLd";
import { Pagination } from "@/components/insights/Pagination";
import { PillarNav } from "@/components/insights/PillarNav";
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
    alternates: {
      canonical: `/insights/topic/${pillar.slug}`,
      languages: { en: `/insights/topic/${pillar.slug}`, "x-default": `/insights/topic/${pillar.slug}` },
    },
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
    <InsightsShell>
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

      <InsightsHeader eyebrow="Insights topic" title={pillar.title} deck={pillar.description}>
        <PillarNav pillars={pillars} active={pillar.slug} />
      </InsightsHeader>

      <section className="insights-list">
        <div className="container">
          {posts.length > 0 ? (
            <>
              <InsightsBento posts={posts} />
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
    </InsightsShell>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, RefreshCw } from "lucide-react";
import { InnerPageLayout } from "@/components/InnerPageLayout";
import { ArticleCard } from "@/components/insights/ArticleCard";
import {
  ArticleCta,
  AuthorBox,
  CitationList,
  FaqSection,
  KeyTakeaways,
} from "@/components/insights/ArticleParts";
import { JsonLd } from "@/components/insights/JsonLd";
import { PortableBody } from "@/components/insights/PortableBody";
import { TableOfContents } from "@/components/insights/TableOfContents";
import { buildToc, formatDate, headingIdMap } from "@/lib/insights";
import { articleGraph } from "@/lib/structuredData";
import { client, freshClient } from "@/sanity/client";
import { REVALIDATE_SECONDS, siteUrl } from "@/sanity/env";
import { ogImageUrl, urlFor } from "@/sanity/image";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/queries";
import type { Post } from "@/sanity/types";

// Next requires a literal here, so this must stay in step with REVALIDATE_SECONDS.
export const revalidate = 300;
export const dynamicParams = true;

type RouteProps = { params: Promise<{ slug: string }> };

async function getPost(params: RouteProps["params"]): Promise<Post | null> {
  const { slug } = await params;
  return client.fetch<Post | null>(POST_QUERY, { slug });
}

export async function generateStaticParams() {
  const slugs = await freshClient.fetch<{ slug: string }[]>(POST_SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const post = await getPost(params);
  if (!post) return {};

  const url = `${siteUrl}/insights/${post.slug}`;
  const image = ogImageUrl(post.seo.image);

  return {
    title: `${post.seo.title} | Cloudex Technologies`,
    description: post.seo.description,
    keywords: [post.primaryKeyword, ...(post.secondaryKeywords ?? [])].filter(
      (keyword): keyword is string => Boolean(keyword),
    ),
    authors: post.author ? [{ name: post.author.name }] : undefined,
    alternates: {
      canonical: post.seo.canonicalUrl ?? `/insights/${post.slug}`,
      languages: { en: `/insights/${post.slug}`, "x-default": `/insights/${post.slug}` },
    },
    robots: post.seo.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      title: post.seo.title,
      description: post.seo.description,
      url,
      siteName: "Cloudex Technologies",
      publishedTime: post.publishedAt,
      modifiedTime: post.reviewedAt ?? post._updatedAt,
      authors: post.author ? [post.author.name] : undefined,
      section: post.pillar?.title,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.title,
      description: post.seo.description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: RouteProps) {
  const post = await getPost(params);
  if (!post) notFound();

  const toc = buildToc(post.body);
  const headingIds = headingIdMap(toc);
  const heroAlt = (post.heroImage as { alt?: string } | undefined)?.alt ?? post.title;

  return (
    <InnerPageLayout>
      <JsonLd data={articleGraph(post)} />

      <article>
        {/* ── Header ── */}
        <header
          style={{
            background: "var(--bg)",
            paddingTop: 140,
            paddingBottom: 48,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="container">
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <Link
                href="/insights"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: 14,
                  color: "var(--text-3)",
                  textDecoration: "none",
                  marginBottom: 26,
                }}
              >
                <ArrowLeft size={15} strokeWidth={1.8} />
                All insights
              </Link>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                  marginBottom: 20,
                }}
              >
                {post.pillar && (
                  <Link
                    href={`/insights/topic/${post.pillar.slug}`}
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      background: "var(--accent-subtle)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-pill)",
                      padding: "6px 13px",
                      textDecoration: "none",
                    }}
                  >
                    {post.pillar.title}
                  </Link>
                )}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13.5,
                    color: "var(--text-3)",
                  }}
                >
                  <Clock size={14} strokeWidth={1.8} />
                  {post.readingTime ?? 8} min read
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(32px, 5vw, 50px)",
                  fontWeight: 600,
                  lineHeight: 1.14,
                  letterSpacing: "-0.03em",
                  color: "var(--text-1)",
                  marginBottom: 22,
                }}
              >
                {post.title}
              </h1>

              <p
                style={{
                  fontSize: "clamp(17px, 2vw, 20px)",
                  lineHeight: 1.62,
                  color: "var(--text-2)",
                  marginBottom: 30,
                }}
              >
                {post.deck}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                  fontSize: 14,
                  color: "var(--text-3)",
                }}
              >
                {post.author && (
                  <span style={{ color: "var(--text-2)" }}>
                    By <strong style={{ color: "var(--text-1)", fontWeight: 500 }}>{post.author.name}</strong>
                    {post.author.role ? `, ${post.author.role}` : ""}
                  </span>
                )}
                <span aria-hidden="true">·</span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                {post.reviewedAt && post.reviewedAt !== post.publishedAt && (
                  <span
                    style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                    title="This article is periodically re-checked against its sources"
                  >
                    <RefreshCw size={13} strokeWidth={1.8} />
                    Reviewed {formatDate(post.reviewedAt)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ── Hero image ── */}
        {post.heroImage && (
          <div className="container" style={{ marginTop: 48 }}>
            <div style={{ maxWidth: 1060, margin: "0 auto" }}>
              <Image
                src={urlFor(post.heroImage).width(2000).url()}
                alt={heroAlt}
                width={2000}
                height={1050}
                priority
                sizes="(max-width: 1100px) 100vw, 1060px"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 20,
                  border: "1px solid var(--border)",
                }}
              />
            </div>
          </div>
        )}

        {/* ── Body ── */}
        <div className="container" style={{ paddingTop: 56, paddingBottom: 96 }}>
          <div className="insight-layout">
            <aside className="insight-toc">
              <TableOfContents entries={toc} />
            </aside>

            <div style={{ minWidth: 0, maxWidth: 760, margin: "0 auto" }}>
              {post.keyTakeaways && <KeyTakeaways items={post.keyTakeaways} />}

              <PortableBody value={post.body} headingIds={headingIds} />

              {post.faq && <FaqSection items={post.faq} />}
              {post.citations && <CitationList items={post.citations} />}
              {post.author && <AuthorBox author={post.author} />}
              <ArticleCta />
            </div>
          </div>
        </div>

        {/* ── Related ── */}
        {post.related && post.related.length > 0 && (
          <section
            style={{
              borderTop: "1px solid var(--border)",
              background: "var(--bg-2)",
              paddingTop: 72,
              paddingBottom: 88,
            }}
          >
            <div className="container">
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 28,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "var(--text-1)",
                  marginBottom: 32,
                }}
              >
                Continue reading
              </h2>
              <div className="insight-grid">
                {post.related.map((related) => (
                  <ArticleCard key={related._id} post={related} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </InnerPageLayout>
  );
}

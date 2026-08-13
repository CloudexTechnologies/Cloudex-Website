import { ogImageUrl } from "@/sanity/image";
import { siteUrl } from "@/sanity/env";
import type { Post } from "@/sanity/types";

const ORGANIZATION_ID = `${siteUrl}/#organization`;

export const organizationSchema = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Cloudex Technologies",
  url: siteUrl,
  logo: `${siteUrl}/cloudex-logo.png`,
  description:
    "Cloudex Technologies builds intelligent systems — AI employees, custom software, and digital growth solutions — that help businesses operate smarter and scale with confidence.",
};

/**
 * One `@graph` per article carrying Article, the author as a Person, the
 * breadcrumb trail and (when present) the FAQ. Sources go into `citation`,
 * which is the field an answer engine reads to decide the piece is attributable.
 */
export function articleGraph(post: Post) {
  const url = `${siteUrl}/insights/${post.slug}`;
  const image = ogImageUrl(post.seo.image);

  const article: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.seo.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.publishedAt,
    dateModified: post.reviewedAt ?? post._updatedAt ?? post.publishedAt,
    inLanguage: "en",
    isAccessibleForFree: true,
    publisher: { "@id": ORGANIZATION_ID },
    articleSection: post.pillar?.title,
    keywords: [post.primaryKeyword, ...(post.secondaryKeywords ?? [])].filter(Boolean).join(", "),
  };

  if (image) article.image = [image];
  if (post.wordCount) article.wordCount = post.wordCount;

  if (post.author) {
    const isDesk = post.author.entityType === "organization";
    article.author = {
      "@type": isDesk ? "Organization" : "Person",
      name: post.author.name,
      description: post.author.bio,
      knowsAbout: post.author.expertise,
      sameAs: post.author.sameAs,
      // A desk is part of the company; a person works for it.
      ...(isDesk
        ? { parentOrganization: { "@id": ORGANIZATION_ID } }
        : { jobTitle: post.author.role, worksFor: { "@id": ORGANIZATION_ID } }),
    };
  }

  if (post.citations?.length) {
    article.citation = post.citations.map((source) => ({
      "@type": "CreativeWork",
      name: source.title,
      url: source.url,
      publisher: source.publisher ? { "@type": "Organization", name: source.publisher } : undefined,
      datePublished: source.publishedDate,
    }));
  }

  if (post.keyTakeaways?.length) {
    article.abstract = post.keyTakeaways.join(" ");
  }

  const graph: Record<string, unknown>[] = [
    organizationSchema,
    article,
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Insights", item: `${siteUrl}/insights` },
        ...(post.pillar
          ? [
              {
                "@type": "ListItem",
                position: 3,
                name: post.pillar.title,
                item: `${siteUrl}/insights/topic/${post.pillar.slug}`,
              },
            ]
          : []),
        { "@type": "ListItem", position: post.pillar ? 4 : 3, name: post.title, item: url },
      ],
    },
  ];

  if (post.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function collectionGraph({
  title,
  description,
  path,
  items,
}: {
  title: string;
  description: string;
  path: string;
  items: { title: string; slug: string }[];
}) {
  const url = `${siteUrl}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        name: title,
        description,
        url,
        isPartOf: { "@id": ORGANIZATION_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.title,
            url: `${siteUrl}/insights/${item.slug}`,
          })),
        },
      },
    ],
  };
}

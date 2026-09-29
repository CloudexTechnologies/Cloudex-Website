import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EnterpriseDetailPage, INDUSTRY_PAGES, getIndustryPage, detailImage, industryHref } from "@/components/enterprise";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, snippet } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structured-data";

/** `/industries/<slug>` — one page per industry in `components/enterprise/detail-pages.ts`. */

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return INDUSTRY_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (page === undefined) return {};
  return pageMetadata({
    title: `AI & Technology Solutions for ${page.title}`,
    description: snippet(page.intro),
    path: industryHref(page.slug),
    image: detailImage("industries", page.slug, page.imageAlt).src,
    keywords: [`AI for ${page.title}`, `${page.title} technology solutions`, `${page.title} automation`, ...page.offer.cards.map((c) => c.title)],
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (page === undefined) notFound();
  const path = industryHref(page.slug);
  return (
    <>
      <EnterpriseDetailPage kind="industries" page={page} />
      <JsonLd
        data={[
          serviceSchema({
            name: `AI & Technology Solutions for ${page.title}`,
            description: page.intro,
            path,
            serviceType: "AI and technology consulting",
            offers: page.offer.cards.map((c) => c.title),
            audience: page.title,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: page.title, path },
          ]),
          faqSchema(page.faq),
        ]}
      />
    </>
  );
}

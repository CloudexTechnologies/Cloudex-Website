import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EnterpriseDetailPage, SERVICE_PAGES, getServicePage, detailImage, serviceHref } from "@/components/enterprise";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, snippet } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structured-data";

/** `/services/<slug>` — one page per service line in `components/enterprise/detail-pages.ts`. */

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return SERVICE_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (page === undefined) return {};
  return pageMetadata({
    title: `${page.title} Services`,
    description: snippet(page.intro),
    path: serviceHref(page.slug),
    image: detailImage("services", page.slug, page.imageAlt).src,
    keywords: [page.title, `${page.title} services`, `${page.title} UK`, ...page.offer.cards.map((c) => c.title)],
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (page === undefined) notFound();
  const path = serviceHref(page.slug);
  return (
    <>
      <EnterpriseDetailPage kind="services" page={page} />
      <JsonLd
        data={[
          serviceSchema({
            name: `${page.title} Services`,
            description: page.intro,
            path,
            serviceType: page.title,
            offers: page.offer.cards.map((c) => c.title),
            
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: page.title, path },
          ]),
          faqSchema(page.faq),
        ]}
      />
    </>
  );
}

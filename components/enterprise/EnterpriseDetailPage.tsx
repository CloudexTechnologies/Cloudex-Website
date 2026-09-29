/**
 * The body of every `/services/<slug>` and `/industries/<slug>` page.
 *
 * Section order: hero → what we offer (or solutions) → why Cloudex Technologies → related
 * pages of the other kind → FAQ → CTA band. Service pages explain each offer in a detail
 * row with an animated scene (`ServiceDetails`) and skip the related-industries grid. Every section is an about-page section,
 * so the route root carries the about class list (see `app/services/page.tsx`).
 *
 * Each CTA's rolling-text uuids are fixed per section rather than per page: a page renders
 * each section once, and the self-contained rules are identical whatever the uuid.
 */

import * as React from "react";

import { SvgTemplates } from "@/components/about";
import { CtaBand } from "@/components/shared/CtaBand";
import { FaqSection } from "@/components/shared/FaqSection";

import { EnterpriseCalloutSection } from "./EnterpriseCalloutSection";
import { EnterpriseGridSection } from "./EnterpriseGridSection";
import { EnterpriseHero } from "./EnterpriseHero";
import { ServiceDetails } from "./ServiceDetails";
import { SERVICE_DETAILS } from "./service-details-content";
import {
  type DetailPage,
  detailImage,
  getIndustryPage,
  getServicePage,
  industryHref,
  serviceHref,
} from "./detail-pages";
import type { EnterpriseCard } from "./enterprise-content";

export const ENTERPRISE_ROOT_CLASS_NAME =
  "framer-8WBKH framer-HFo8d framer-TPaq9 framer-WmRh7 framer-PN4gT framer-R1g06 framer-U04FB framer-13fmyed";

const OFFER_CTA_UUIDS = [
  "0b7e3c95-4d21-4f6a-8e3b-5c9d1a7f2e40",
  "6d2f8a14-9c57-4b3e-a1d6-3e8b0f5c7a92",
  "f3a91c6e-2b84-4d0f-97c5-8e1d4b6a3c05",
] as const;

const WHY_CTA_UUIDS = [
  "2c8d5f1a-7e39-4a6b-b4c2-9f0e3d7a1b68",
  "a9e4b7c2-1d56-4f83-8b0a-6c2e5d9f4a17",
  "5f0c2e8b-3a74-4d19-a6e5-1b7d9c4f8e23",
] as const;

const RELATED_CTA_UUIDS = [
  "e8b1d4a7-5c26-4e90-9f3b-2a6d8c1e7b54",
  "3d6a9f2c-8b15-4c74-a0e7-5f1b3d8a6c29",
  "c1f5e8a3-6d42-4b97-8e2c-0a9d7b4f1e66",
] as const;

export interface EnterpriseDetailPageProps {
  kind: "services" | "industries";
  page: DetailPage;
}

export function EnterpriseDetailPage({ kind, page }: EnterpriseDetailPageProps): React.ReactElement {
  const isService = kind === "services";

  // Three, so the related grid fills exactly one desktop row. Service pages show none.
  const related: EnterpriseCard[] = (isService ? [] : page.related)
    .slice(0, 3)
    .map((slug) => (isService ? getIndustryPage(slug) : getServicePage(slug)))
    .filter((p): p is DetailPage => p !== undefined)
    .map((p) => ({
      icon: p.icon,
      title: p.title,
      body: p.summary,
      href: isService ? industryHref(p.slug) : serviceHref(p.slug),
    }));

  return (
    <>
      <div
        data-framer-root
        className={ENTERPRISE_ROOT_CLASS_NAME}
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <EnterpriseHero
          badge={page.title}
          heading={page.heading}
          notch={page.notch}
          intro={page.intro}
          image={detailImage(kind, page.slug, page.imageAlt)}
        />
        <EnterpriseGridSection
          name={page.offer.badge}
          badge={page.offer.badge}
          heading={page.offer.heading}
          body={page.offer.body}
          ctaLabel="Talk to a consultant"
          ctaHref="/contact"
          ctaUuids={OFFER_CTA_UUIDS}
          cards={page.offer.cards}
        >
          {isService ? <ServiceDetails cards={page.offer.cards} details={SERVICE_DETAILS[page.slug]} /> : undefined}
        </EnterpriseGridSection>
        <EnterpriseCalloutSection
          name="Why Cloudex Technologies"
          badge="Why Cloudex Technologies"
          heading={page.why.heading}
          body={page.why.body}
          ctaLabel="Start a conversation"
          ctaHref="/contact"
          ctaUuids={WHY_CTA_UUIDS}
        />
        {related.length > 0 ? (
          <EnterpriseGridSection
            name={isService ? "Industries" : "Services"}
            badge={isService ? "Industries we serve" : "Related services"}
            heading={isService ? `${page.title} across industries` : `Our services for ${page.title}`}
            ctaLabel={isService ? "All industries" : "All services"}
            ctaHref={isService ? "/industries" : "/services"}
            ctaUuids={RELATED_CTA_UUIDS}
            cards={related}
          />
        ) : null}
        <FaqSection scope="about" items={page.faq} />
        <CtaBand scope="about" />
      </div>

      <div id="overlay" />

      <SvgTemplates />
    </>
  );
}

export default EnterpriseDetailPage;

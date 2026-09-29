import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";

import { SvgTemplates } from "@/components/about";
import {
  AI_WORKFORCE_FAQ,
  AI_WORKFORCE_FDE_CARDS,
  AI_WORKFORCE_FDE_SECTION,
  AI_WORKFORCE_HERO,
  AI_WORKFORCE_MODEL_CARDS,
  AI_WORKFORCE_MODEL_SECTION,
  AI_WORKFORCE_RULE_SECTION,
  EnterpriseCalloutSection,
  EnterpriseGridSection,
  EnterpriseHero,
  ENTERPRISE_ROOT_CLASS_NAME,
} from "@/components/enterprise";
import { CtaBand } from "@/components/shared/CtaBand";
import { FaqSection } from "@/components/shared/FaqSection";
import { ServiceDetails } from "@/components/enterprise/ServiceDetails";
import {
  AI_WORKFORCE_FDE_DETAILS,
  AI_WORKFORCE_MODEL_DETAILS,
} from "@/components/enterprise/service-details-content";

/**
 * `/ai-workforce` — Digital FTEs, the 10-80-10 rule, KSoR / DSoR and the Forward Deployed
 * Engineer model. Assembled from the same ported about-page sections as `/services`, so
 * it carries the enterprise root class list.
 */

export const metadata: Metadata = pageMetadata({
  title: "AI Workforce: Digital FTEs, KSoR, DSoR and Forward Deployed Engineers",
  description:
    "How Cloudex Technologies builds Digital FTEs, AI employees that work alongside your team: the 10-80-10 rule, Knowledge and Data Systems of Record, and Forward Deployed Engineers.",
  path: "/ai-workforce",
  image: AI_WORKFORCE_HERO.image.src,
});

export default function AiWorkforcePage() {
  return (
    <>
      <div
        data-framer-root
        className={ENTERPRISE_ROOT_CLASS_NAME}
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <EnterpriseHero {...AI_WORKFORCE_HERO} />
        <EnterpriseGridSection name="The model" {...AI_WORKFORCE_MODEL_SECTION} cards={AI_WORKFORCE_MODEL_CARDS}>
          <ServiceDetails cards={AI_WORKFORCE_MODEL_CARDS} details={AI_WORKFORCE_MODEL_DETAILS} />
        </EnterpriseGridSection>
        <EnterpriseCalloutSection name="The 10-80-10 Rule" {...AI_WORKFORCE_RULE_SECTION} />
        <EnterpriseGridSection name="How we deliver" {...AI_WORKFORCE_FDE_SECTION} cards={AI_WORKFORCE_FDE_CARDS}>
          <ServiceDetails cards={AI_WORKFORCE_FDE_CARDS} details={AI_WORKFORCE_FDE_DETAILS} />
        </EnterpriseGridSection>
        <FaqSection scope="about" items={AI_WORKFORCE_FAQ} />
        <CtaBand scope="about" />
      </div>

      <div id="overlay" />

      <SvgTemplates />
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "AI Workforce", path: "/ai-workforce" }]), faqSchema(AI_WORKFORCE_FAQ)]} />
    </>
  );
}

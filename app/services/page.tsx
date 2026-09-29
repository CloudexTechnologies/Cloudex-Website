import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data";

import { SvgTemplates } from "@/components/about";
import {
  EnterpriseGridSection,
  EnterpriseHero,
  SERVICE_LINES,
  SERVICE_LINES_SECTION,
  SERVICES_FAQ,
  SERVICES_HERO,
} from "@/components/enterprise";
import { CtaBand } from "@/components/shared/CtaBand";
import { FaqSection } from "@/components/shared/FaqSection";

/**
 * `/services` — added after the Framer migration (no SSR counterpart).
 *
 * Built entirely from the about page's ported sections, so the root div carries the
 * about page's class list: `.framer-8WBKH` scopes every section rule, and the hero's
 * appear ids and the CTA band's hidden-class hashes are the about ones. See
 * `app/about/page.tsx` for what each class does.
 */

export const metadata: Metadata = pageMetadata({
  title: "AI & Technology Services for Businesses and Enterprises",
  description:
    "AI automation, AI transformation, digital transformation, data and analytics, cloud, cybersecurity and managed IT services from Cloudex Technologies, your technology partner.",
  path: "/services",
  image: SERVICES_HERO.image.src,
});

const ROOT_CLASS_NAME =
  "framer-8WBKH framer-HFo8d framer-TPaq9 framer-WmRh7 framer-PN4gT framer-R1g06 framer-U04FB framer-13fmyed";

export default function ServicesPage() {
  return (
    <>
      <div
        data-framer-root
        className={ROOT_CLASS_NAME}
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <EnterpriseHero {...SERVICES_HERO} />
        <EnterpriseGridSection name="Service lines" {...SERVICE_LINES_SECTION} cards={SERVICE_LINES} />
        <FaqSection scope="about" items={SERVICES_FAQ} />
        <CtaBand scope="about" />
      </div>

      <div id="overlay" />

      <SvgTemplates />
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]), faqSchema(SERVICES_FAQ)]} />
    </>
  );
}

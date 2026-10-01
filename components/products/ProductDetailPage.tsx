/**
 * The body of every `/products/<slug>` page.
 *
 * Section order: hero → what's inside → how it works → pricing callout → FAQ → CTA band.
 * Built from the same about-page sections as the service pages (see
 * `components/enterprise/EnterpriseDetailPage.tsx`), so the route root carries the about
 * class list. The buy CTAs go straight to the product's Whop checkout.
 */

import * as React from "react";

import { SvgTemplates } from "@/components/about";
import {
  ENTERPRISE_ROOT_CLASS_NAME,
  EnterpriseCalloutSection,
  EnterpriseGridSection,
  EnterpriseHero,
} from "@/components/enterprise";
import { CtaBand } from "@/components/shared/CtaBand";
import { FaqSection } from "@/components/shared/FaqSection";

import { PRODUCT_IMAGE_FIT, type Product, productImage } from "./products";

const INSIDE_CTA_UUIDS = [
  "87a589c2-6599-4ba8-830a-7f607cb28873",
  "6140d391-a337-457c-84fe-22d131020e82",
  "73ae04e1-ce71-40e0-9eaf-1793f1991c74",
] as const;

const WORKFLOW_CTA_UUIDS = [
  "17f38f35-e43c-4982-9934-77bc30d166a0",
  "6471fd6f-e2b0-450d-8cdf-fabd9c1d40b0",
  "854dd6cf-9c33-42c4-adbf-1e1195b44184",
] as const;

const PRICING_CTA_UUIDS = [
  "7be8ec79-71e1-47c5-a799-5c5c7ca46778",
  "258ee71a-cae0-4224-b714-0058c76f5d0e",
  "4dfc9d42-78c5-48d6-86a0-2145206dd1ca",
] as const;

export function ProductDetailPage({ product }: { product: Product }): React.ReactElement {
  const buyLabel = `Buy now · ${product.price.label}`;
  return (
    <>
      <div
        data-framer-root
        className={ENTERPRISE_ROOT_CLASS_NAME}
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <EnterpriseHero
          badge={product.title}
          heading={product.heading}
          notch={product.notch}
          intro={product.intro}
          image={productImage(product.slug, product.imageAlt)}
          imageFit={PRODUCT_IMAGE_FIT}
        />
        <EnterpriseGridSection
          name="What's inside"
          badge="What's inside"
          heading={product.inside.heading}
          body={product.inside.body}
          ctaLabel={buyLabel}
          ctaHref={product.checkoutUrl}
          ctaUuids={INSIDE_CTA_UUIDS}
          cards={product.inside.cards}
        />
        <EnterpriseGridSection
          name="How it works"
          badge="How it works"
          heading={product.workflow.heading}
          body={product.workflow.body}
          ctaLabel={buyLabel}
          ctaHref={product.checkoutUrl}
          ctaUuids={WORKFLOW_CTA_UUIDS}
          cards={product.workflow.cards}
        />
        <EnterpriseCalloutSection
          name="Pricing"
          badge={`${product.price.label} ${product.price.terms}`}
          heading={product.pricing.heading}
          body={product.pricing.body}
          ctaLabel={`Get ${product.title}`}
          ctaHref={product.checkoutUrl}
          ctaUuids={PRICING_CTA_UUIDS}
        />
        <FaqSection scope="about" items={product.faq} />
        <CtaBand scope="about" />
      </div>

      <div id="overlay" />

      <SvgTemplates />
    </>
  );
}

export default ProductDetailPage;

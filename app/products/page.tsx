import type { Metadata } from "next";

import { SvgTemplates } from "@/components/about";
import { ENTERPRISE_ROOT_CLASS_NAME, EnterpriseGridSection, EnterpriseHero } from "@/components/enterprise";
import { PRODUCTS, PRODUCT_IMAGE_FIT, productHref, productImage } from "@/components/products/products";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/shared/CtaBand";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

/**
 * `/products` — every product in `components/products/products.ts`, one card each. Built
 * from the about-page sections like `/services`, so the root carries the about class list.
 */

const FEATURED = PRODUCTS[0];

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Software products from Cloudex Technologies, built from the systems we use on client work. Buy once and run them yourself.",
  path: "/products",
  image: productImage(FEATURED.slug, FEATURED.imageAlt).src,
});

export default function ProductsPage() {
  return (
    <>
      <div
        data-framer-root
        className={ENTERPRISE_ROOT_CLASS_NAME}
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <EnterpriseHero
          badge="Products"
          heading="The tools we build with, ready for your team"
          notch="Buy once · run it yourself"
          intro="Cloudex Technologies products package the systems we use on client work into software you can run on your own projects. Each one is a one-time purchase with checkout by Whop."
          image={productImage(FEATURED.slug, FEATURED.imageAlt)}
          imageFit={PRODUCT_IMAGE_FIT}
        />
        <EnterpriseGridSection
          name="All products"
          badge="All products"
          heading="Pick a product"
          ctaLabel="Talk to us"
          ctaHref="/contact"
          ctaUuids={[
            "72707048-a6a5-4384-a1ad-86d1b3fd574b",
            "d4a8d16d-4c0c-4bb6-adaa-db8a0c1c5e92",
            "348cf0b4-81fe-42d3-8436-48ac9f2c3c8b",
          ]}
          cards={PRODUCTS.map((p) => ({
            icon: p.icon,
            title: `${p.title} · ${p.price.label}`,
            body: p.summary,
            href: productHref(p.slug),
          }))}
        />
        <CtaBand scope="about" />
      </div>

      <div id="overlay" />

      <SvgTemplates />
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }])]} />
    </>
  );
}

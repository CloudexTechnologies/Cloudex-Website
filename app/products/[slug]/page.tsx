import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import { PRODUCTS, getProduct, productHref, productImage } from "@/components/products/products";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, snippet } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/structured-data";

/** `/products/<slug>` — one page per product in `components/products/products.ts`. */

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (product === undefined) return {};
  return pageMetadata({
    title: product.title,
    description: snippet(product.summary),
    path: productHref(product.slug),
    image: productImage(product.slug, product.imageAlt).src,
    keywords: [product.title, ...product.inside.cards.map((c) => c.title)],
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (product === undefined) notFound();
  const path = productHref(product.slug);
  return (
    <>
      <ProductDetailPage product={product} />
      <JsonLd
        data={[
          productSchema({
            name: product.title,
            description: product.summary,
            path,
            image: productImage(product.slug, product.imageAlt).src,
            price: product.price.amount,
            currency: product.price.currency,
            checkoutUrl: product.checkoutUrl,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: product.title, path },
          ]),
          faqSchema(product.faq),
        ]}
      />
    </>
  );
}

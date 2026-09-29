import type { Metadata } from "next";
import { JsonLd } from "@/components/insights/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { serviceGraph } from "@/lib/structuredData";

const TITLE = "Websites, SEO and Digital Growth | Cloudex Technologies";
const DESCRIPTION =
  "High-performing websites, SEO and digital strategy from Cloudex, built to bring in qualified business and not just traffic.";

// The page is a client component, so its metadata has to live here.
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/capabilities/digital-growth" });

export default function DigitalGrowthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceGraph({ name: "Digital Growth", description: DESCRIPTION, path: "/capabilities/digital-growth" })} />
      {children}
    </>
  );
}

import type { Metadata } from "next";
import { JsonLd } from "@/components/insights/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { serviceGraph } from "@/lib/structuredData";

const TITLE = "AI Solutions and Business Automation | Cloudex Technologies";
const DESCRIPTION =
  "AI that integrates with your operations, data and people. Cloudex designs, builds and runs automation inside your business.";

// The page is a client component, so its metadata has to live here.
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/capabilities/ai-solutions" });

export default function AiSolutionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceGraph({ name: "AI Solutions", description: DESCRIPTION, path: "/capabilities/ai-solutions" })} />
      {children}
    </>
  );
}

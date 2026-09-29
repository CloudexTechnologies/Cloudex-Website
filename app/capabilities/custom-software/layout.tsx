import type { Metadata } from "next";
import { JsonLd } from "@/components/insights/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { serviceGraph } from "@/lib/structuredData";

const TITLE = "Custom Software Development | Cloudex Technologies";
const DESCRIPTION =
  "Custom software built around how your business works, replacing the workarounds that off-the-shelf tools create.";

// The page is a client component, so its metadata has to live here.
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/capabilities/custom-software" });

export default function CustomSoftwareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceGraph({ name: "Custom Software", description: DESCRIPTION, path: "/capabilities/custom-software" })} />
      {children}
    </>
  );
}

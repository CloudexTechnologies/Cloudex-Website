import type { Metadata } from "next";
import { JsonLd } from "@/components/insights/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { serviceGraph } from "@/lib/structuredData";

const TITLE = "AI Employees for Business | Digital FTEs by Cloudex";
const DESCRIPTION =
  "Deploy AI employees that handle sales outreach, customer queries, reporting and admin around the clock, delivering from day one.";

// The page is a client component, so its metadata has to live here.
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/capabilities/ai-employees" });

export default function AiEmployeesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceGraph({ name: "AI Employees", description: DESCRIPTION, path: "/capabilities/ai-employees" })} />
      {children}
    </>
  );
}

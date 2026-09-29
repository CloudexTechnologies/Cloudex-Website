import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Our Work | Client Results and Case Studies from Cloudex";
const DESCRIPTION =
  "Case studies and client outcomes from Cloudex across AI employees, custom software and digital growth, measured by results.";

// The page is a client component, so its metadata has to live here.
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/work" });

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}

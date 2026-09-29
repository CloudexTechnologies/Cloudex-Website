import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

const TITLE = "About Cloudex Technologies | Builders of Intelligent Systems";
const DESCRIPTION =
  "Cloudex brings the AI, software and digital tools that give large enterprises their edge to growing businesses. Meet the team.";

// The page is a client component, so its metadata has to live here.
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/about" });

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

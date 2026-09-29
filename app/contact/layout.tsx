import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Contact Cloudex Technologies | Start a Project Conversation";
const DESCRIPTION =
  "Talk to Cloudex about AI employees, custom software or digital growth. No pressure, no pitch deck, just a straight conversation.";

// The page is a client component, so its metadata has to live here.
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/contact" });

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

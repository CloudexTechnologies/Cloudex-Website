import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { JsonLd } from "@/components/insights/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { homeGraph } from "@/lib/structuredData";

export const metadata: Metadata = pageMetadata({
  title: "Cloudex Technologies | AI Employees & Custom Software",
  description:
    "Cloudex Technologies builds AI employees, high-performing websites and custom software that help businesses run smarter and scale.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph()} />
      <HomePage />
    </>
  );
}

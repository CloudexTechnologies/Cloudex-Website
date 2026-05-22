"use client";

import { LogoCloud } from "@/components/ui/logo-cloud-4";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const logos = [
  { src: "https://cdn.simpleicons.org/react/61DAFB",           alt: "React" },
  { src: "https://cdn.simpleicons.org/nextdotjs/ffffff",        alt: "Next.js" },
  { src: "https://cdn.simpleicons.org/typescript/3178C6",       alt: "TypeScript" },
  { src: "https://cdn.simpleicons.org/python/3776AB",           alt: "Python" },
  { src: "https://cdn.simpleicons.org/nodedotjs/5FA04E",        alt: "Node.js" },
  { src: "https://cdn.simpleicons.org/graphql/E10098",          alt: "GraphQL" },
  { src: "https://cdn.simpleicons.org/openai/ffffff",           alt: "OpenAI" },
  { src: "https://cdn.simpleicons.org/anthropic/CC785C",        alt: "Anthropic" },
  { src: "https://cdn.simpleicons.org/langchain/65a30d",        alt: "LangChain" },
  { src: "https://cdn.simpleicons.org/tensorflow/FF6F00",       alt: "TensorFlow" },
  { src: "https://cdn.simpleicons.org/amazonwebservices/FF9900", alt: "AWS" },
  { src: "https://cdn.simpleicons.org/vercel/ffffff",           alt: "Vercel" },
  { src: "https://cdn.simpleicons.org/supabase/3ECF8E",         alt: "Supabase" },
  { src: "https://cdn.simpleicons.org/postgresql/4169E1",       alt: "PostgreSQL" },
  { src: "https://cdn.simpleicons.org/docker/2496ED",           alt: "Docker" },
  { src: "https://cdn.simpleicons.org/kubernetes/326CE5",       alt: "Kubernetes" },
  { src: "https://cdn.simpleicons.org/redis/FF4438",            alt: "Redis" },
];

export function LogoCloudSection() {
  return (
    <section
      style={{
        padding: "56px 0",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-2)",
        overflow: "hidden",
      }}
    >
      <ScrollReveal>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-3)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Our Tech Stack
          </span>
        </div>

        <LogoCloud logos={logos} speed={40} logoHeight={40} gap={60} />
      </ScrollReveal>
    </section>
  );
}

"use client";
import {
  SiReact, SiNextdotjs, SiTypescript, SiPython, SiNodedotjs,
  SiGraphql, SiOpenai, SiAnthropic, SiLangchain, SiTensorflow,
  SiVercel, SiSupabase, SiPostgresql, SiDocker, SiKubernetes, SiRedis,
} from "react-icons/si";
import { ScrollReveal } from "./ui/ScrollReveal";
import { LogoLoop } from "./ui/LogoLoop";

const logos = [
  { node: <SiReact       color="#61DAFB" />, title: "React" },
  { node: <SiNextdotjs                  />, title: "Next.js" },
  { node: <SiTypescript  color="#3178C6" />, title: "TypeScript" },
  { node: <SiPython      color="#3776AB" />, title: "Python" },
  { node: <SiNodedotjs   color="#5FA04E" />, title: "Node.js" },
  { node: <SiGraphql     color="#E10098" />, title: "GraphQL" },
  { node: <SiOpenai                     />, title: "OpenAI" },
  { node: <SiAnthropic   color="#CC785C" />, title: "Anthropic" },
  { node: <SiLangchain   color="#65a30d" />, title: "LangChain" },
  { node: <SiTensorflow  color="#FF6F00" />, title: "TensorFlow" },
  { node: <SiVercel                     />, title: "Vercel" },
  { node: <SiSupabase    color="#3ECF8E" />, title: "Supabase" },
  { node: <SiPostgresql  color="#4169E1" />, title: "PostgreSQL" },
  { node: <SiDocker      color="#2496ED" />, title: "Docker" },
  { node: <SiKubernetes  color="#326CE5" />, title: "Kubernetes" },
  { node: <SiRedis       color="#FF4438" />, title: "Redis" },
];

export function TechMarquee() {
  return (
    <section
      style={{
        padding: "56px 0",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        background: "var(--bg-2)",
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

        <LogoLoop
          logos={logos}
          speed={100}
          logoHeight={40}
          gap={60}
          fadeOut
          scaleOnHover
          hoverSpeed={0}
          ariaLabel="Technologies we use"
          style={{ paddingBlock: 8 }}
        />
      </ScrollReveal>
    </section>
  );
}

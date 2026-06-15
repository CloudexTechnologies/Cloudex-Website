"use client";
import { useState } from "react";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionHeader } from "./ui/SectionHeader";
import { useSpotlight } from "@/hooks/useSpotlight";

const caseStudies = [
  {
    tag: "Digital Growth",
    title: "Inbound Leads Doubled in 90 Days",
    desc: "A UK-based financial advisory firm engaged us for a new website and search visibility work. Within 90 days, inbound leads doubled.",
    metric: "2x leads",
  },
  {
    tag: "AI Employees",
    title: "AI Sales Employee Replacing an Entire SDR Team",
    desc: "A SaaS company deployed our AI Prospector. It now handles everything their SDR team used to do prospecting, outreach, and qualifying at a fraction of the cost.",
    metric: "Full SDR coverage",
  },
  {
    tag: "Custom Software",
    title: "One Platform Replacing Three Subscriptions",
    desc: "An e-commerce brand needed custom operations software. We built a single platform that replaced three tools they were paying subscriptions for it pays for itself every month.",
    metric: "3 tools replaced",
  },
];

function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof caseStudies)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const spotlight = useSpotlight();

  return (
    <ScrollReveal delay={index * 0.12}>
      <div
        ref={spotlight.ref}
        onMouseMove={spotlight.onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="spotlight-card"
        style={{
          borderRadius: 20,
          overflow: "hidden",
          border: `1px solid ${hovered ? "rgba(37,99,235,0.2)" : "var(--border)"}`,
          background: "var(--surface)",
          transition: "all 0.4s ease",
          transform: hovered ? "translateY(-4px)" : "none",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Placeholder image area */}
        <div
          style={{
            height: 180,
            background: "var(--bg-3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid var(--border)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.5,
              backgroundImage:
                "radial-gradient(circle at 1px 1px, var(--grid-color) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              fontFamily: "monospace",
              fontSize: 12,
              color: "var(--text-3)",
              padding: 20,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                margin: "0 auto 10px",
                background: "var(--accent-subtle)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent)",
                fontSize: 20,
              }}
            >
              ◈
            </div>
            case study visual
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: 28,
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                padding: "3px 10px",
                borderRadius: "var(--radius-pill)",
                background: "var(--accent-subtle)",
                color: "var(--accent)",
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "var(--font-heading)",
              }}
            >
              {study.tag}
            </span>
            <span
              style={{
                padding: "3px 10px",
                borderRadius: "var(--radius-pill)",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                fontSize: 11,
                fontWeight: 700,
                color: "var(--text-1)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {study.metric}
            </span>
          </div>
          <h4
            style={{
              fontSize: 17,
              fontWeight: 700,
              marginBottom: 8,
              lineHeight: 1.35,
            }}
          >
            {study.title}
          </h4>
          <p
            style={{
              fontSize: 14,
              color: "var(--text-2)",
              lineHeight: 1.6,
              flex: 1,
            }}
          >
            {study.desc}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function CaseStudiesSection() {
  return (
    <section
      id="case-studies"
      className="section"
      style={{ background: "var(--bg)" }}
    >
      <div className="container">
        <SectionHeader
          label="Case Studies"
          title="Results We Are Proud Of"
          subtitle="If you would like to hear directly about work we have done in your sector, we are happy to walk you through it on a call."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          {caseStudies.map((s, i) => (
            <CaseStudyCard key={i} study={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

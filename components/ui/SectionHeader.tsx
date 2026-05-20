"use client";
import { ScrollReveal } from "./ScrollReveal";

interface SectionHeaderProps {
  label?: string;
  title?: string;
  subtitle?: string;
  align?: "center" | "left";
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth: 720,
        margin: align === "center" ? "0 auto 64px" : "0 0 64px",
      }}
    >
      {label && (
        <ScrollReveal>
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "var(--radius-pill)",
              background: "var(--accent-subtle)",
              color: "var(--accent)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "var(--font-heading)",
              marginBottom: 16,
              border: "1px solid var(--border)",
            }}
          >
            {label}
          </span>
        </ScrollReveal>
      )}
      {title && (
        <ScrollReveal delay={0.08}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: subtitle ? 16 : 0,
            }}
          >
            {title}
          </h2>
        </ScrollReveal>
      )}
      {subtitle && (
        <ScrollReveal delay={0.16}>
          <p
            style={{
              fontSize: "clamp(15px, 1.6vw, 18px)",
              color: "var(--text-2)",
              lineHeight: 1.7,
            }}
          >
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}

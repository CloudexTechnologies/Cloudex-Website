"use client";
import { ScrollReveal } from "./ui/ScrollReveal";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const statsData = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "AI Systems Uptime" },
  { value: 3, suffix: "x", label: "Faster Deployment" },
];

function StatItem({ stat, index }: { stat: (typeof statsData)[0]; index: number }) {
  const [ref, count] = useAnimatedCounter(stat.value, 2000);

  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{ textAlign: "center", padding: 20 }}
      >
        <div
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 700,
            fontFamily: "var(--font-heading)",
            letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, var(--text-1), var(--accent))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 8,
          }}
        >
          {count}
          {stat.suffix}
        </div>
        <div
          style={{
            fontSize: 14,
            color: "var(--text-3)",
            fontWeight: 500,
            fontFamily: "var(--font-heading)",
            letterSpacing: "0.03em",
          }}
        >
          {stat.label}
        </div>
      </div>
    </ScrollReveal>
  );
}

export function StatsSection() {
  return (
    <section
      className="section"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "80px 0",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
          }}
        >
          {statsData.map((s, i) => (
            <StatItem key={i} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

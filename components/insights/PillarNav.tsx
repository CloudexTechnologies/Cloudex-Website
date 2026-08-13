import Link from "next/link";
import type { Pillar } from "@/sanity/types";

/**
 * Pillars double as the topical hub structure: every article links up to one,
 * and each hub page is an internal-link target that consolidates authority.
 */
export function PillarNav({ pillars, active }: { pillars: Pillar[]; active?: string }) {
  const chip = (isActive: boolean) =>
    ({
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "9px 18px",
      borderRadius: "var(--radius-pill)",
      border: "1px solid var(--border)",
      background: isActive ? "var(--accent)" : "var(--surface)",
      color: isActive ? "#fff" : "var(--text-2)",
      fontSize: 14,
      fontWeight: 500,
      textDecoration: "none",
      transition: "var(--transition)",
    }) as const;

  return (
    <nav
      aria-label="Article topics"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        justifyContent: "center",
      }}
    >
      <Link href="/insights" style={chip(!active)}>
        All
      </Link>
      {pillars
        .filter((pillar) => pillar.count > 0 || pillar.slug === active)
        .map((pillar) => (
          <Link
            key={pillar._id}
            href={`/insights/topic/${pillar.slug}`}
            style={chip(pillar.slug === active)}
          >
            {pillar.title}
            <span
              style={{
                fontSize: 12,
                opacity: 0.6,
              }}
            >
              {pillar.count}
            </span>
          </Link>
        ))}
    </nav>
  );
}

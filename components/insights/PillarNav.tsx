import Link from "next/link";
import type { Pillar } from "@/sanity/types";

/**
 * Pillars double as the topical hub structure: every article links up to one,
 * and each hub page is an internal-link target that consolidates authority.
 *
 * Rendered as an underlined tab row (`.topic-tabs` in `app/insights/insights.css`) that
 * scrolls sideways on narrow screens rather than wrapping into a pill cloud.
 */
export function PillarNav({ pillars, active }: { pillars: Pillar[]; active?: string }) {
  const total = pillars.reduce((sum, pillar) => sum + pillar.count, 0);
  return (
    <nav aria-label="Article topics" className="topic-tabs">
      <Link href="/insights" className="topic-tab" aria-current={!active ? "page" : undefined}>
        All
        <span className="topic-count">{total}</span>
      </Link>
      {pillars
        .filter((pillar) => pillar.count > 0 || pillar.slug === active)
        .map((pillar) => (
          <Link
            key={pillar._id}
            href={`/insights/topic/${pillar.slug}`}
            className="topic-tab"
            aria-current={pillar.slug === active ? "page" : undefined}
          >
            {pillar.title}
            <span className="topic-count">{pillar.count}</span>
          </Link>
        ))}
    </nav>
  );
}

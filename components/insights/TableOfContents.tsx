"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/insights";

export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>(entries[0]?.id ?? "");

  useEffect(() => {
    if (entries.length === 0) return;

    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((element): element is HTMLElement => element !== null);

    if (headings.length === 0) return;

    // rootMargin pins the trigger line just under the sticky navbar, so a heading
    // counts as "current" from the moment it reaches the top of the reading area.
    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
          return;
        }

        // Nothing intersecting means we are between headings — keep the last one
        // that has scrolled past the trigger line.
        const passed = headings.filter((heading) => heading.getBoundingClientRect().top < 120);
        if (passed.length > 0) setActiveId(passed[passed.length - 1].id);
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 3) return null;

  return (
    // Stickiness lives on the .insight-toc grid item, not here: a sticky child
    // can only travel inside its parent's box, and the aside is content-height.
    <nav aria-label="On this page">
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text-3)",
          marginBottom: 16,
        }}
      >
        On this page
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, borderLeft: "1px solid var(--border)" }}>
        {entries.map((entry) => {
          const isActive = entry.id === activeId;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                style={{
                  display: "block",
                  padding: entry.level === 2 ? "7px 0 7px 16px" : "6px 0 6px 30px",
                  marginLeft: -1,
                  borderLeft: `2px solid ${isActive ? "var(--accent)" : "transparent"}`,
                  fontSize: entry.level === 2 ? 14 : 13.5,
                  lineHeight: 1.45,
                  color: isActive ? "var(--text-1)" : "var(--text-3)",
                  textDecoration: "none",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                }}
              >
                {entry.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

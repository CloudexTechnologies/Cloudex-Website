import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { urlFor } from "@/sanity/image";
import { formatShortDate } from "@/lib/insights";
import type { AuthorRef, Citation, FaqItem } from "@/sanity/types";

const SECTION_HEADING = {
  fontFamily: "var(--font-heading)",
  fontSize: 26,
  fontWeight: 600,
  letterSpacing: "-0.02em",
  color: "var(--text-1)",
  marginBottom: 22,
} as const;

/**
 * Placed above the body so both a skimming reader and a model summarising the
 * page hit the load-bearing facts before any narrative.
 */
export function KeyTakeaways({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <section
      aria-labelledby="key-takeaways"
      style={{
        margin: "0 0 44px",
        padding: "26px 28px",
        borderRadius: 16,
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <h2
        id="key-takeaways"
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 16,
        }}
      >
        Key takeaways
      </h2>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
        {items.map((item) => (
          <li
            key={item}
            style={{
              display: "flex",
              gap: 12,
              fontSize: 16,
              lineHeight: 1.65,
              color: "var(--text-1)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                flexShrink: 0,
                width: 6,
                height: 6,
                marginTop: 9,
                borderRadius: "50%",
                background: "var(--accent)",
              }}
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby="faq" style={{ marginTop: 64 }}>
      <h2 id="faq" style={{ ...SECTION_HEADING, scrollMarginTop: 100 }}>
        Frequently asked questions
      </h2>
      <div style={{ display: "grid", gap: 12 }}>
        {items.map((item) => (
          <details
            key={item._key}
            className="insight-faq"
            style={{
              background: "var(--bg-2)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "18px 22px",
            }}
          >
            <summary
              style={{
                cursor: "pointer",
                fontFamily: "var(--font-heading)",
                fontSize: 17,
                fontWeight: 600,
                color: "var(--text-1)",
                listStyle: "none",
              }}
            >
              {item.question}
            </summary>
            <p
              style={{
                marginTop: 12,
                fontSize: 16,
                lineHeight: 1.72,
                color: "var(--text-2)",
              }}
            >
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function CitationList({ items }: { items: Citation[] }) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby="sources" style={{ marginTop: 64 }}>
      <h2 id="sources" style={{ ...SECTION_HEADING, scrollMarginTop: 100 }}>
        Sources
      </h2>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 14 }}>
        {items.map((source, index) => (
          <li
            key={source._key}
            style={{ display: "flex", gap: 14, fontSize: 15, lineHeight: 1.6 }}
          >
            <span
              style={{
                flexShrink: 0,
                minWidth: 26,
                height: 26,
                display: "grid",
                placeItems: "center",
                borderRadius: 7,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                fontSize: 12.5,
                color: "var(--text-3)",
              }}
            >
              {index + 1}
            </span>
            <span>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                style={{
                  color: "var(--text-1)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {source.title}
                <ExternalLink size={13} strokeWidth={1.8} style={{ color: "var(--text-3)" }} />
              </a>
              <span style={{ display: "block", marginTop: 3, fontSize: 13.5, color: "var(--text-3)" }}>
                {[source.publisher, formatShortDate(source.publishedDate)].filter(Boolean).join(" · ")}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function AuthorBox({ author }: { author: AuthorRef }) {
  return (
    <section
      style={{
        marginTop: 64,
        padding: "26px 28px",
        borderRadius: 16,
        background: "var(--bg-2)",
        border: "1px solid var(--border)",
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
      }}
    >
      {author.image ? (
        <Image
          src={urlFor(author.image).width(120).height(120).fit("crop").url()}
          alt={author.name}
          width={60}
          height={60}
          style={{ borderRadius: "50%", flexShrink: 0 }}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{
            width: 60,
            height: 60,
            flexShrink: 0,
            borderRadius: "50%",
            background: "var(--accent-subtle)",
            border: "1px solid var(--border)",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-heading)",
            fontSize: 22,
            fontWeight: 600,
            color: "var(--accent)",
          }}
        >
          {author.name.charAt(0)}
        </div>
      )}
      <div>
        <div
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 17,
            fontWeight: 600,
            color: "var(--text-1)",
          }}
        >
          {author.name}
        </div>
        {author.role && (
          <div style={{ fontSize: 14, color: "var(--accent)", marginTop: 2 }}>{author.role}</div>
        )}
        {author.bio && (
          <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.7, color: "var(--text-2)" }}>
            {author.bio}
          </p>
        )}
      </div>
    </section>
  );
}

export function ArticleCta() {
  return (
    <section
      style={{
        marginTop: 56,
        padding: "34px 36px",
        borderRadius: 18,
        border: "1px solid var(--border)",
        background:
          "linear-gradient(135deg, var(--accent-subtle), transparent 60%), var(--bg-2)",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--text-1)",
          marginBottom: 10,
        }}
      >
        Thinking about applying this in your business?
      </h2>
      <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-2)", marginBottom: 22, maxWidth: 620 }}>
        Cloudex designs and ships AI employees, custom software, and growth systems for teams that
        need the theory turned into something that runs in production.
      </p>
      <Link
        href="/contact"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "13px 24px",
          borderRadius: "var(--radius-pill)",
          background: "var(--accent)",
          color: "#fff",
          fontSize: 15,
          fontWeight: 500,
          textDecoration: "none",
        }}
      >
        Start a conversation
      </Link>
    </section>
  );
}

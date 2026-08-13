import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { urlFor } from "@/sanity/image";
import { formatShortDate } from "@/lib/insights";
import type { PostCard } from "@/sanity/types";

export function ArticleCard({ post, featured = false }: { post: PostCard; featured?: boolean }) {
  const image = post.heroImage
    ? urlFor(post.heroImage)
        .width(featured ? 1200 : 720)
        .height(featured ? 630 : 405)
        .fit("crop")
        .url()
    : null;

  return (
    <Link
      href={`/insights/${post.slug}`}
      className="insight-card"
      data-featured={featured ? "true" : "false"}
      style={{
        display: "flex",
        flexDirection: featured ? "row" : "column",
        gap: featured ? 36 : 0,
        alignItems: featured ? "center" : "stretch",
        background: "var(--bg-2)",
        border: "1px solid var(--border)",
        borderRadius: 18,
        overflow: "hidden",
        textDecoration: "none",
        height: "100%",
        transition: "var(--transition)",
      }}
    >
      {image && (
        <div
          style={{
            position: "relative",
            flex: featured ? "0 0 48%" : undefined,
            aspectRatio: featured ? "16 / 10" : "16 / 9",
            width: featured ? undefined : "100%",
            background: "var(--bg-3)",
          }}
        >
          <Image
            src={image}
            alt={(post.heroImage as { alt?: string } | undefined)?.alt ?? post.title}
            fill
            sizes={featured ? "(max-width: 900px) 100vw, 560px" : "(max-width: 900px) 100vw, 380px"}
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      <div
        style={{
          padding: featured ? "32px 36px 32px 0" : "24px 24px 26px",
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
            flexWrap: "wrap",
            marginBottom: 14,
          }}
        >
          {post.pillar && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                background: "var(--accent-subtle)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-pill)",
                padding: "5px 11px",
              }}
            >
              {post.pillar.title}
            </span>
          )}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12.5,
              color: "var(--text-3)",
            }}
          >
            <Clock size={13} strokeWidth={1.8} />
            {post.readingTime ?? 8} min
          </span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: featured ? 30 : 20,
            fontWeight: 600,
            lineHeight: 1.28,
            letterSpacing: "-0.02em",
            color: "var(--text-1)",
            marginBottom: 12,
          }}
        >
          {post.title}
        </h3>

        <p
          style={{
            fontSize: featured ? 16.5 : 15,
            lineHeight: 1.65,
            color: "var(--text-2)",
            marginBottom: 20,
            display: "-webkit-box",
            WebkitLineClamp: featured ? 3 : 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.deck}
        </p>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13, color: "var(--text-3)" }}>
            {formatShortDate(post.publishedAt)}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              fontWeight: 500,
              color: "var(--accent)",
            }}
          >
            Read
            <ArrowRight size={15} strokeWidth={2} />
          </span>
        </div>
      </div>
    </Link>
  );
}

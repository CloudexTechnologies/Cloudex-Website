import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bot, Compass, Lightbulb, TrendingUp, Workflow, type LucideIcon } from "lucide-react";
import { urlFor } from "@/sanity/image";
import { formatShortDate } from "@/lib/insights";
import type { PostCard } from "@/sanity/types";

/**
 * Article listing for `/insights` and `/insights/topic/<pillar>`, as a bento.
 *
 * Posts are laid out in groups that alternate between a feature trio (one large cover
 * tile beside two brief tiles, mirrored on every other trio) and a pair of wide tiles.
 * A lone trailing post becomes one full-width tile. Every group has exactly as many
 * tiles as posts, so any count (the 9 on a page, or a topic's 1 or 2) closes cleanly,
 * with no empty cell and no text-only card stretched to an image card's height.
 *
 * Image slots fall back to a brand cover when a post has no hero image.
 * Styles: `app/insights/insights.css`, the `.bento*` block.
 */

type Group =
  | { kind: "feature"; posts: [PostCard, PostCard, PostCard]; flip: boolean }
  | { kind: "pair"; posts: [PostCard, PostCard] }
  | { kind: "single"; posts: [PostCard] };

function groupPosts(posts: PostCard[]): Group[] {
  const groups: Group[] = [];
  let features = 0;
  let i = 0;
  while (i < posts.length) {
    const size = Math.min(groups.length % 2 === 0 ? 3 : 2, posts.length - i);
    const slice = posts.slice(i, i + size);
    if (size === 3) {
      groups.push({ kind: "feature", posts: slice as [PostCard, PostCard, PostCard], flip: features % 2 === 1 });
      features += 1;
    } else if (size === 2) {
      groups.push({ kind: "pair", posts: slice as [PostCard, PostCard] });
    } else {
      groups.push({ kind: "single", posts: slice as [PostCard] });
    }
    i += size;
  }
  return groups;
}

function Meta({ post }: { post: PostCard }) {
  return (
    <div className="bento-meta">
      {post.pillar && <span className="bento-topic">{post.pillar.title}</span>}
      <span>{post.readingTime ?? 8} min read</span>
    </div>
  );
}

function Foot({ post }: { post: PostCard }) {
  return (
    <div className="bento-foot">
      <time dateTime={post.publishedAt}>{formatShortDate(post.publishedAt)}</time>
      <ArrowUpRight className="bento-arrow" size={18} strokeWidth={1.8} aria-hidden="true" />
    </div>
  );
}

/** Cover art for posts without a hero image: the topic's icon on the brand gradient. */
const TOPIC_ICONS: Record<string, LucideIcon> = {
  "ai-systems": Bot,
  "applied-automation": Workflow,
  "digital-growth": TrendingUp,
  "technology-strategy": Compass,
};

function Visual({ post, width, height, sizes }: { post: PostCard; width: number; height: number; sizes: string }) {
  if (!post.heroImage) {
    return (
      <div className="bento-visual bento-visual--fallback" aria-hidden="true">
        <TopicIcon slug={post.pillar?.slug} />
      </div>
    );
  }
  return (
    <div className="bento-visual">
      <Image
        src={urlFor(post.heroImage).width(width).height(height).fit("crop").url()}
        alt={post.heroImage.alt ?? ""}
        fill
        sizes={sizes}
      />
    </div>
  );
}

function TopicIcon({ slug }: { slug?: string }) {
  const Icon = (slug && TOPIC_ICONS[slug]) || Lightbulb;
  return <Icon className="bento-fallback-icon" strokeWidth={1.1} />;
}

type TileKind = "cover" | "brief" | "wide" | "banner";

function Tile({ post, kind, tinted = false, priority = false }: { post: PostCard; kind: TileKind; tinted?: boolean; priority?: boolean }) {
  const visual =
    kind === "cover" ? (
      <Visual post={post} width={1200} height={760} sizes="(max-width: 860px) 100vw, 680px" />
    ) : kind === "wide" ? (
      <Visual post={post} width={720} height={720} sizes="(max-width: 860px) 100vw, 260px" />
    ) : kind === "banner" ? (
      <Visual post={post} width={1100} height={720} sizes="(max-width: 860px) 100vw, 560px" />
    ) : null;

  return (
    <Link
      href={`/insights/${post.slug}`}
      className={`bento-tile bento-tile--${kind}${tinted ? " bento-tile--tinted" : ""}`}
      data-priority={priority ? "true" : undefined}
    >
      {visual}
      <div className="bento-body">
        <Meta post={post} />
        <h3 className="bento-title">{post.title}</h3>
        {post.deck && <p className="bento-deck">{post.deck}</p>}
        <Foot post={post} />
      </div>
    </Link>
  );
}

export function InsightsBento({ posts }: { posts: PostCard[] }) {
  return (
    <div className="bento">
      {groupPosts(posts).map((group, index) => {
        const key = group.posts[0]._id;
        if (group.kind === "feature") {
          const [lead, first, second] = group.posts;
          return (
            <div key={key} className={`bento-group bento-group--feature${group.flip ? " is-flipped" : ""}`}>
              <Tile post={lead} kind="cover" priority={index === 0} />
              <Tile post={first} kind="brief" tinted={!group.flip} />
              <Tile post={second} kind="brief" tinted={group.flip} />
            </div>
          );
        }
        if (group.kind === "pair") {
          return (
            <div key={key} className="bento-group bento-group--pair">
              {group.posts.map((post) => (
                <Tile key={post._id} post={post} kind="wide" />
              ))}
            </div>
          );
        }
        return (
          <div key={key} className="bento-group bento-group--single">
            <Tile post={group.posts[0]} kind="banner" />
          </div>
        );
      })}
    </div>
  );
}

import type { PortableTextBlock } from "next-sanity";
import type { Image } from "sanity";

export type ContentType = "research" | "commercial";

export type PillarRef = {
  title: string;
  slug: string;
  description?: string;
  icon?: string;
};

export type AuthorRef = {
  name: string;
  slug: string;
  entityType?: "person" | "organization";
  role?: string;
  bio?: string;
  image?: Image;
  expertise?: string[];
  sameAs?: string[];
};

export type Citation = {
  _key: string;
  title: string;
  publisher?: string;
  url: string;
  publishedDate?: string;
  sourceType?: string;
};

export type FaqItem = {
  _key: string;
  question: string;
  answer: string;
};

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  deck: string;
  contentType: ContentType;
  publishedAt: string;
  readingTime?: number;
  heroImage?: Image & { alt?: string };
  pillar?: PillarRef;
  author?: Pick<AuthorRef, "name" | "slug" | "role">;
};

export type Post = Omit<PostCard, "author"> & {
  searchIntent?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  reviewedAt?: string;
  _updatedAt: string;
  wordCount?: number;
  keyTakeaways?: string[];
  body: PortableTextBlock[];
  faq?: FaqItem[];
  citations?: Citation[];
  author?: AuthorRef;
  related?: PostCard[];
  seo: {
    title: string;
    description: string;
    image?: Image;
    noIndex: boolean;
    canonicalUrl?: string;
  };
};

export type Pillar = PillarRef & {
  _id: string;
  count: number;
};

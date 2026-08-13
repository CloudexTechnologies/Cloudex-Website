import { groq } from "next-sanity";

/** Fields every article card needs, and nothing more. */
const CARD_FIELDS = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  deck,
  contentType,
  publishedAt,
  readingTime,
  heroImage,
  "pillar": pillar->{ title, "slug": slug.current, icon },
  "author": author->{ name, "slug": slug.current, role }
`;

export const PUBLISHED_FILTER = /* groq */ `
  _type == "post" && status == "published" && defined(slug.current) && publishedAt <= now()
`;

export const POSTS_QUERY = groq`
  *[${PUBLISHED_FILTER}] | order(publishedAt desc) [$start...$end] {
    ${CARD_FIELDS}
  }
`;

export const POSTS_BY_PILLAR_QUERY = groq`
  *[${PUBLISHED_FILTER} && pillar->slug.current == $pillar]
  | order(publishedAt desc) [$start...$end] {
    ${CARD_FIELDS}
  }
`;

export const POSTS_COUNT_QUERY = groq`count(*[${PUBLISHED_FILTER}])`;

export const POSTS_COUNT_BY_PILLAR_QUERY = groq`
  count(*[${PUBLISHED_FILTER} && pillar->slug.current == $pillar])
`;

export const FEATURED_POST_QUERY = groq`
  *[${PUBLISHED_FILTER}] | order(publishedAt desc) [0] {
    ${CARD_FIELDS}
  }
`;

export const POST_SLUGS_QUERY = groq`
  *[${PUBLISHED_FILTER}]{ "slug": slug.current }
`;

export const POST_QUERY = groq`
  *[${PUBLISHED_FILTER} && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    deck,
    contentType,
    searchIntent,
    primaryKeyword,
    secondaryKeywords,
    publishedAt,
    reviewedAt,
    _updatedAt,
    readingTime,
    wordCount,
    keyTakeaways,
    heroImage,
    body[]{
      ...,
      _type == "pteImage" => { ..., "dimensions": image.asset->metadata.dimensions }
    },
    faq[]{ _key, question, answer },
    citations[]{ _key, title, publisher, url, publishedDate, sourceType },
    "pillar": pillar->{ title, "slug": slug.current, description, icon },
    "author": author->{ name, "slug": slug.current, entityType, role, bio, image, expertise, sameAs },
    "related": select(
      count(relatedPosts) > 0 => relatedPosts[]->{ ${CARD_FIELDS} },
      *[${PUBLISHED_FILTER} && slug.current != $slug && pillar._ref == ^.pillar._ref]
        | order(publishedAt desc) [0...3] { ${CARD_FIELDS} }
    ),
    "seo": {
      "title": coalesce(seo.title, title),
      "description": coalesce(seo.description, deck),
      "image": coalesce(seo.image, heroImage),
      "noIndex": seo.noIndex == true,
      "canonicalUrl": seo.canonicalUrl
    }
  }
`;

export const PILLARS_QUERY = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    "count": count(*[${PUBLISHED_FILTER} && pillar._ref == ^._id])
  }
`;

export const PILLAR_QUERY = groq`
  *[_type == "category" && slug.current == $pillar][0] {
    _id, title, "slug": slug.current, description, icon,
    "seo": {
      "title": coalesce(seo.title, title),
      "description": coalesce(seo.description, description)
    }
  }
`;

/** Everything the sitemap, RSS feed and llms.txt need in one pass. */
export const CONTENT_INDEX_QUERY = groq`{
  "posts": *[${PUBLISHED_FILTER} && seo.noIndex != true] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    deck,
    keyTakeaways,
    contentType,
    publishedAt,
    _updatedAt,
    "pillar": pillar->{ title, "slug": slug.current },
    "author": author->name
  },
  "pillars": *[_type == "category"] | order(order asc) {
    title, "slug": slug.current, description
  }
}`;

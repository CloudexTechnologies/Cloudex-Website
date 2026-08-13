import { defineArrayMember, defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import { articleBody } from './blocks'

export const post = defineType({
  name: 'post',
  title: 'Article',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'search', title: 'Search & SEO' },
    { name: 'provenance', title: 'Provenance' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      description: 'The H1. Front-load the primary keyword; no colon-subtitle padding.',
      validation: (rule) => rule.required().max(95),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 72 },
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return 'Required'
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)) {
            return 'Slug must be lowercase words separated by single hyphens'
          }
          return true
        }),
    }),
    defineField({
      name: 'deck',
      title: 'Standfirst',
      type: 'text',
      rows: 3,
      group: 'content',
      description:
        'One or two sentences directly under the headline that answer the question the title poses. This is the passage most likely to be quoted verbatim.',
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Research & analysis', value: 'research' },
          { title: 'Commercial / service intent', value: 'commercial' },
        ],
        layout: 'radio',
      },
      initialValue: 'research',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Pillar',
      type: 'reference',
      group: 'content',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      group: 'content',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviewedAt',
      title: 'Last Reviewed',
      type: 'datetime',
      group: 'content',
      description: 'Surfaced as "Last reviewed" — freshness signals matter for AI-topic queries.',
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'generationPrompt',
          title: 'Generation Prompt',
          type: 'text',
          rows: 3,
          readOnly: true,
          description: 'The prompt Codex used to render this image.',
        }),
      ],
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })],
      description:
        'Three to five standalone factual sentences. Rendered above the body and lifted into the summary block that LLMs read first.',
      validation: (rule) => rule.min(3).max(6),
    }),
    articleBody,
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'faqItem' })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'citations',
      title: 'Citations',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'citation' })],
      description: 'Every non-obvious claim in the body should map to one of these.',
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Articles',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'post' }] })],
      validation: (rule) => rule.max(4).unique(),
    }),

    defineField({
      name: 'primaryKeyword',
      type: 'string',
      group: 'search',
      description: 'The single query this article is built to win.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'secondaryKeywords',
      type: 'array',
      group: 'search',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'searchIntent',
      type: 'string',
      group: 'search',
      options: {
        list: [
          { title: 'Informational', value: 'informational' },
          { title: 'Commercial investigation', value: 'commercial' },
          { title: 'Transactional', value: 'transactional' },
          { title: 'Navigational', value: 'navigational' },
        ],
      },
      initialValue: 'informational',
    }),
    defineField({ name: 'seo', type: 'seo', group: 'search' }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      group: 'search',
      readOnly: true,
    }),
    defineField({
      name: 'wordCount',
      type: 'number',
      group: 'search',
      readOnly: true,
    }),

    defineField({
      name: 'status',
      type: 'string',
      group: 'provenance',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Held — failed quality gate', value: 'held' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'generatedBy',
      title: 'Generated By',
      type: 'string',
      group: 'provenance',
      readOnly: true,
      description: 'Pipeline and model that produced this draft.',
    }),
    defineField({
      name: 'topicIdea',
      type: 'reference',
      group: 'provenance',
      to: [{ type: 'topicIdea' }],
      readOnly: true,
    }),
    defineField({
      name: 'qualityGate',
      title: 'Quality Gate Result',
      type: 'object',
      group: 'provenance',
      readOnly: true,
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'verdict', type: 'string' }),
        defineField({ name: 'score', type: 'number' }),
        defineField({ name: 'accuracy', type: 'number' }),
        defineField({ name: 'depth', type: 'number' }),
        defineField({ name: 'readability', type: 'number' }),
        defineField({ name: 'seo', type: 'number' }),
        defineField({ name: 'brandFit', type: 'number' }),
        defineField({ name: 'revisions', type: 'number' }),
        defineField({ name: 'notes', type: 'text', rows: 6 }),
        defineField({ name: 'runId', type: 'string' }),
        defineField({ name: 'checkedAt', type: 'datetime' }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Published, newest first',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      contentType: 'contentType',
      date: 'publishedAt',
      media: 'heroImage',
    },
    prepare: ({ title, status, contentType, date, media }) => ({
      title,
      subtitle: [status, contentType, date ? new Date(date as string).toISOString().slice(0, 10) : null]
        .filter(Boolean)
        .join(' · '),
      media,
    }),
  },
})

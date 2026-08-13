import { defineArrayMember, defineField, defineType } from 'sanity'
import { BulbOutlineIcon } from '@sanity/icons'

/**
 * The research queue. The daily scan writes these; the twice-weekly writer pops
 * the highest-scoring one that keeps the research/commercial ratio on target.
 */
export const topicIdea = defineType({
  name: 'topicIdea',
  title: 'Topic Idea',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'angle',
      type: 'text',
      rows: 3,
      description: 'The specific claim or question this article would resolve — not just the subject area.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dedupeKey',
      type: 'string',
      description: 'Normalised primary keyword. Used to avoid queueing the same topic twice.',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'primaryKeyword', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'secondaryKeywords',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'contentType',
      type: 'string',
      options: {
        list: [
          { title: 'Research & analysis', value: 'research' },
          { title: 'Commercial / service intent', value: 'commercial' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'searchIntent',
      type: 'string',
      options: {
        list: ['informational', 'commercial', 'transactional', 'navigational'],
      },
    }),
    defineField({ name: 'pillar', type: 'reference', to: [{ type: 'category' }] }),
    defineField({
      name: 'score',
      type: 'number',
      description: '0–100. Blend of topical momentum, ranking feasibility and commercial relevance.',
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: 'rationale',
      type: 'text',
      rows: 3,
      description: 'Why the scan believes this is worth writing now.',
    }),
    defineField({
      name: 'sources',
      title: 'Seed Sources',
      type: 'array',
      of: [defineArrayMember({ type: 'citation' })],
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Queued', value: 'queued' },
          { title: 'Writing', value: 'writing' },
          { title: 'Published', value: 'published' },
          { title: 'Rejected', value: 'rejected' },
          { title: 'Stale', value: 'stale' },
        ],
        layout: 'radio',
      },
      initialValue: 'queued',
    }),
    defineField({ name: 'discoveredAt', type: 'datetime', validation: (rule) => rule.required() }),
    defineField({ name: 'attempts', type: 'number', initialValue: 0, readOnly: true }),
  ],
  orderings: [{ title: 'Score, highest first', name: 'scoreDesc', by: [{ field: 'score', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', status: 'status', score: 'score', contentType: 'contentType' },
    prepare: ({ title, status, score, contentType }) => ({
      title,
      subtitle: `${status} · ${contentType} · score ${score ?? '—'}`,
    }),
  },
})

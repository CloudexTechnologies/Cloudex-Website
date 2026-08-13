import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

/**
 * Every factual claim in an article traces back to one of these.
 * Rendered as a numbered reference list and emitted into the Article JSON-LD
 * `citation` array, which is what makes the piece safe for an LLM to quote.
 */
export const citation = defineType({
  name: 'citation',
  title: 'Citation',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Source Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publisher',
      title: 'Publisher / Author',
      description: 'e.g. "Anthropic", "arXiv", "Stanford HAI"',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Source Published Date',
      type: 'date',
    }),
    defineField({
      name: 'accessedAt',
      title: 'Accessed At',
      type: 'datetime',
    }),
    defineField({
      name: 'sourceType',
      title: 'Source Type',
      type: 'string',
      options: {
        list: [
          { title: 'Peer-reviewed / preprint', value: 'paper' },
          { title: 'Primary vendor documentation', value: 'docs' },
          { title: 'Vendor announcement', value: 'announcement' },
          { title: 'Benchmark / dataset', value: 'benchmark' },
          { title: 'Industry report', value: 'report' },
          { title: 'News', value: 'news' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publisher' },
  },
})

import { defineField, defineType } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'

/**
 * Question/answer pairs surfaced as an FAQ block and as FAQPage JSON-LD.
 * Answers are kept self-contained so they survive being lifted out of the
 * article by a search engine or an LLM.
 */
export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'answer',
      type: 'text',
      rows: 4,
      description: 'Answer the question completely in 40–90 words without referring back to the article.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'answer' },
  },
})

import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const category = defineType({
  name: 'category',
  title: 'Pillar',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      description: 'lucide-react icon name, e.g. "Bot", "Globe", "Code2", "Lightbulb".',
      type: 'string',
      initialValue: 'Lightbulb',
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Display order on the insights index.',
      initialValue: 100,
    }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'description' } },
})

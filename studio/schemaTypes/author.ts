import { defineArrayMember, defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

/**
 * Authorship is an E-E-A-T signal, and the `sameAs` links are what let a search
 * engine tie the byline to a real entity rather than treating it as a bare string.
 */
export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name', maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'entityType',
      title: 'Entity Type',
      description:
        'Whether this byline is a named individual or an editorial desk. Drives whether the article emits Person or Organization JSON-LD — claiming a desk is a person is the kind of thing an E-E-A-T review penalises.',
      type: 'string',
      options: {
        list: [
          { title: 'Person', value: 'person' },
          { title: 'Editorial desk / organization', value: 'organization' },
        ],
        layout: 'radio',
      },
      initialValue: 'person',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      description: 'e.g. "AI Systems Practice, Cloudex Technologies"',
    }),
    defineField({
      name: 'bio',
      type: 'text',
      rows: 4,
      description: 'Two or three sentences establishing why this person can speak to the topic.',
    }),
    defineField({
      name: 'expertise',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'sameAs',
      title: 'Profile URLs',
      description: 'LinkedIn, GitHub, X — emitted into the Person JSON-LD.',
      type: 'array',
      of: [defineArrayMember({ type: 'url' })],
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'image' } },
})

import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      description: 'Overrides the article title in <title> and og:title. Aim for 50–60 characters.',
      type: 'string',
      validation: (rule) => rule.max(65).warning('Titles over 65 characters get truncated in SERPs'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      description: 'Aim for 140–158 characters. Lead with the answer, not the setup.',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule.max(165).warning('Descriptions over 165 characters get truncated in SERPs'),
    }),
    defineField({
      name: 'image',
      title: 'Social Share Image',
      description: 'Overrides the hero image for social cards. 1200x630.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      description: 'Only set when this article was first published elsewhere.',
      type: 'url',
    }),
  ],
})

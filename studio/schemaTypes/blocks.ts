import { defineArrayMember, defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import { InfoOutlineIcon } from '@sanity/icons'
import { CodeBlockIcon } from '@sanity/icons'
import { ThListIcon } from '@sanity/icons'

/** Inline figure with a mandatory alt text — images without alt hurt both a11y and image search. */
export const pteImage = defineType({
  name: 'pteImage',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({ name: 'image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe what the image shows, in plain language.',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'caption', type: 'string' }),
  ],
  preview: { select: { title: 'caption', subtitle: 'alt', media: 'image' } },
})

/** Pull-out box for definitions, warnings and "what this means for you" asides. */
export const callout = defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'tone',
      type: 'string',
      options: {
        list: [
          { title: 'Definition', value: 'definition' },
          { title: 'Insight', value: 'insight' },
          { title: 'Warning', value: 'warning' },
          { title: 'What this means for you', value: 'application' },
        ],
        layout: 'radio',
      },
      initialValue: 'insight',
    }),
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'body', type: 'text', rows: 4, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'heading', subtitle: 'body' } },
})

/** Fenced code with a language hint, for the technical half of the content mix. */
export const codeBlock = defineType({
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    defineField({ name: 'language', type: 'string', initialValue: 'text' }),
    defineField({ name: 'filename', type: 'string' }),
    defineField({ name: 'code', type: 'text', rows: 12, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'filename', subtitle: 'language' } },
})

/**
 * Comparison tables are the single most-quoted element in technical articles,
 * so they are modelled as data rather than as pre-rendered markup.
 */
export const dataTable = defineType({
  name: 'dataTable',
  title: 'Table',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({ name: 'caption', type: 'string' }),
    defineField({
      name: 'columns',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (r) => r.required().min(2),
    }),
    defineField({
      name: 'rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'row',
          fields: [defineField({ name: 'cells', type: 'array', of: [defineArrayMember({ type: 'string' })] })],
          preview: {
            select: { cells: 'cells' },
            prepare: ({ cells }) => ({ title: (cells as string[] | undefined)?.join(' · ') ?? 'Row' }),
          },
        }),
      ],
    }),
  ],
  preview: { select: { title: 'caption' } },
})

/** The article body: prose plus the structured blocks above. */
export const articleBody = defineField({
  name: 'body',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Paragraph', value: 'normal' },
        { title: 'Section (H2)', value: 'h2' },
        { title: 'Sub-section (H3)', value: 'h3' },
        { title: 'Minor (H4)', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'string',
                title: 'URL or path',
                validation: (r: any) => r.required(),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: 'pteImage' }),
    defineArrayMember({ type: 'callout' }),
    defineArrayMember({ type: 'codeBlock' }),
    defineArrayMember({ type: 'dataTable' }),
  ],
})

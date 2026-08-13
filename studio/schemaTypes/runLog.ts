import { defineArrayMember, defineField, defineType } from 'sanity'
import { ClockIcon } from '@sanity/icons'

/**
 * One document per pipeline execution. Without this there is no way to answer
 * "why did nothing publish on Tuesday?" after the fact.
 */
export const runLog = defineType({
  name: 'runLog',
  title: 'Pipeline Run',
  type: 'document',
  icon: ClockIcon,
  fields: [
    defineField({ name: 'runId', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'kind',
      type: 'string',
      options: {
        list: [
          { title: 'Research scan', value: 'research' },
          { title: 'Write & publish', value: 'publish' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Success', value: 'success' },
          { title: 'Held at gate', value: 'held' },
          { title: 'Failed', value: 'failed' },
          { title: 'Skipped', value: 'skipped' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'startedAt', type: 'datetime' }),
    defineField({ name: 'finishedAt', type: 'datetime' }),
    defineField({ name: 'durationSeconds', type: 'number' }),
    defineField({ name: 'summary', type: 'text', rows: 6 }),
    defineField({ name: 'itemsScanned', type: 'number' }),
    defineField({ name: 'ideasCreated', type: 'number' }),
    defineField({ name: 'post', type: 'reference', to: [{ type: 'post' }] }),
    defineField({ name: 'errors', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
  ],
  orderings: [{ title: 'Newest first', name: 'startedDesc', by: [{ field: 'startedAt', direction: 'desc' }] }],
  preview: {
    select: { kind: 'kind', status: 'status', startedAt: 'startedAt', summary: 'summary' },
    prepare: ({ kind, status, startedAt, summary }) => ({
      title: `${kind} · ${status}`,
      subtitle: `${startedAt ? new Date(startedAt as string).toISOString().slice(0, 16).replace('T', ' ') : ''} — ${summary ?? ''}`,
    }),
  },
})

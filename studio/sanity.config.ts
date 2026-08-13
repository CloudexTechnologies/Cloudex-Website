import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { DocumentTextIcon } from '@sanity/icons'
import { BulbOutlineIcon } from '@sanity/icons'
import { ClockIcon } from '@sanity/icons'
import { TagIcon } from '@sanity/icons'
import { UserIcon } from '@sanity/icons'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Cloudex Technologies',
  projectId: 'so1isjsl',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Articles')
              .icon(DocumentTextIcon)
              .child(
                S.list()
                  .title('Articles')
                  .items([
                    S.listItem()
                      .title('Published')
                      .child(
                        S.documentList()
                          .title('Published')
                          .filter('_type == "post" && status == "published"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                      ),
                    S.listItem()
                      .title('Held at quality gate')
                      .child(
                        S.documentList()
                          .title('Held')
                          .filter('_type == "post" && status == "held"')
                          .defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
                      ),
                    S.listItem()
                      .title('Drafts')
                      .child(
                        S.documentList()
                          .title('Drafts')
                          .filter('_type == "post" && status == "draft"'),
                      ),
                    S.listItem()
                      .title('Archived')
                      .child(
                        S.documentList()
                          .title('Archived')
                          .filter('_type == "post" && status == "archived"'),
                      ),
                    S.divider(),
                    S.listItem()
                      .title('All articles')
                      .child(S.documentTypeList('post').title('All articles')),
                  ]),
              ),
            S.divider(),
            S.listItem()
              .title('Topic Queue')
              .icon(BulbOutlineIcon)
              .child(
                S.documentList()
                  .title('Topic Queue')
                  .filter('_type == "topicIdea" && status == "queued"')
                  .defaultOrdering([{ field: 'score', direction: 'desc' }]),
              ),
            S.listItem()
              .title('All topic ideas')
              .icon(BulbOutlineIcon)
              .child(S.documentTypeList('topicIdea').title('All topic ideas')),
            S.divider(),
            S.listItem()
              .title('Pillars')
              .icon(TagIcon)
              .child(S.documentTypeList('category').title('Pillars')),
            S.listItem()
              .title('Authors')
              .icon(UserIcon)
              .child(S.documentTypeList('author').title('Authors')),
            S.divider(),
            S.listItem()
              .title('Pipeline Runs')
              .icon(ClockIcon)
              .child(
                S.documentList()
                  .title('Pipeline Runs')
                  .filter('_type == "runLog"')
                  .defaultOrdering([{ field: 'startedAt', direction: 'desc' }]),
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: '2026-02-01' }),
  ],
  schema: { types: schemaTypes },
})

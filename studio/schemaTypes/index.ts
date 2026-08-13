import { author } from './author'
import { callout, codeBlock, dataTable, pteImage } from './blocks'
import { category } from './category'
import { citation } from './citation'
import { faqItem } from './faqItem'
import { post } from './post'
import { runLog } from './runLog'
import { seo } from './seo'
import { topicIdea } from './topicIdea'

export const schemaTypes = [
  // Documents
  post,
  author,
  category,
  topicIdea,
  runLog,
  // Objects
  seo,
  citation,
  faqItem,
  pteImage,
  callout,
  codeBlock,
  dataTable,
]

/**
 * Teaching content registry
 *
 * Long course descriptions live in individual Markdown files
 * (one per language) for easier editing. Import them here and
 * register them under a short key that matches the `contentRef`
 * field used in site-config.json.
 *
 * To add a new course's content:
 * 1. Create  data/teaching/content/<slug>.en.md  and  <slug>.fr.md
 * 2. Import them below
 * 3. Add an entry to `teachingContent`
 * 4. In site-config.json set  "contentRef": "<slug>"  on the course
 */

import linearAlgebraEn from './linear-algebra.en.md'
import linearAlgebraFr from './linear-algebra.fr.md'

export type LocalizedContent = { en: string; fr: string }

const teachingContent: Record<string, LocalizedContent> = {
  'linear-algebra': {
    en: linearAlgebraEn,
    fr: linearAlgebraFr,
  },
}

export default teachingContent

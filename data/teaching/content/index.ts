/**
 * Teaching content registry
 *
 * The body of every course page lives in two Markdown files (one per
 * language) so that it is easy to edit without touching any code.
 * They are imported here and registered under a short key, which is the
 * `contentRef` value used by the course in `data/site-config.json`.
 *
 * ─────────────────────────────────────────────────────────────────────
 * TO ADD A NEW COURSE (full recipe)
 * ─────────────────────────────────────────────────────────────────────
 * 1. Create  data/teaching/content/<slug>.en.md  and  <slug>.fr.md
 * 2. Import both files below.
 * 3. Add an entry to `teachingContent` under the key "<slug>".
 * 4. In data/site-config.json, add the course to teaching.currentCourses
 *    with  "slug": "<slug>"  and  "contentRef": "<slug>".
 *
 * The course page is then generated automatically at /teaching/<slug>.
 * See TEACHING_GUIDE.md for the annotated JSON template.
 * ─────────────────────────────────────────────────────────────────────
 */

// --- 2026–2027, Semester 1 -------------------------------------------------
import differentialEquationsOptimizationEn from './differential-equations-optimization.en.md'
import differentialEquationsOptimizationFr from './differential-equations-optimization.fr.md'
import functionsRealVariableEn from './functions-real-variable.en.md'
import functionsRealVariableFr from './functions-real-variable.fr.md'

// --- Archived: Université d'Artois, 2025–2026 ------------------------------
import linearAlgebraEn from './linear-algebra.en.md'
import linearAlgebraFr from './linear-algebra.fr.md'
import methodsMathCsEn from './methods-math-cs.en.md'
import methodsMathCsFr from './methods-math-cs.fr.md'

export type LocalizedContent = { en: string; fr: string }

const teachingContent: Record<string, LocalizedContent> = {
  'differential-equations-optimization': {
    en: differentialEquationsOptimizationEn,
    fr: differentialEquationsOptimizationFr,
  },
  'functions-real-variable': {
    en: functionsRealVariableEn,
    fr: functionsRealVariableFr,
  },
  'linear-algebra': {
    en: linearAlgebraEn,
    fr: linearAlgebraFr,
  },
  'methods-math-cs': {
    en: methodsMathCsEn,
    fr: methodsMathCsFr,
  },
}

export default teachingContent

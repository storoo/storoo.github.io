/**
 * Working-group pages content
 *
 * A working group with "slug": "<slug>" in data/site-config.json gets a page
 * at /talks/<slug>, whose body is read from this folder:
 *
 *   data/talks/content/<slug>.en.md
 *   data/talks/content/<slug>.fr.md
 *
 * Unlike the teaching registry, nothing needs to be imported by hand: every
 * *.en.md / *.fr.md file here is picked up at build time. If only one of the
 * two languages exists, it is shown in both.
 *
 * See TALKS_GUIDE.md.
 */

export type LocalizedContent = { en: string; fr: string }

const files = require.context("./", false, /\.(en|fr)\.md$/)

const found: Record<string, { en?: string; fr?: string }> = {}
for (const key of files.keys()) {
  const match = key.match(/([^/]+)\.(en|fr)\.md$/)
  if (!match) continue
  const [, slug, lang] = match
  const module = files(key)
  found[slug] = { ...found[slug], [lang]: typeof module === "string" ? module : module.default }
}

const talksContent: Record<string, LocalizedContent> = {}
for (const [slug, { en, fr }] of Object.entries(found)) {
  talksContent[slug] = { en: en ?? fr ?? "", fr: fr ?? en ?? "" }
}

export default talksContent

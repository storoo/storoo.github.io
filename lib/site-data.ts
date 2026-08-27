import siteConfig from "@/data/site-config.json"
import teachingContent from "@/data/teaching/content"

export type SiteConfig = typeof siteConfig
export type Language = 'en' | 'fr'
export type LocalizedText = string | { en: string; fr: string }

// Extended type definitions for research data
export interface ResearchProject {
  title: LocalizedText
  description: LocalizedText
  period?: string
  status?: string
  links?: Array<{ type: string; url: string }>
}

export interface Publication {
  title: string
  authors: string[]
  venue?: string
  advisor?: string
  abstract: string
  links?: Array<{ type: string; url: string }>
}

// Helper function to get localized text
export function getLocalizedText(text: LocalizedText, language: Language): string {
  if (typeof text === 'string') {
    return text
  }
  return text[language] || text.en || ''
}

// Helper to recursively localize an object
export function localizeObject<T>(obj: T, language: Language): T {
  if (obj === null || obj === undefined) {
    return obj
  }
  
  if (typeof obj === 'string') {
    return obj
  }
  
  // Check if it's a LocalizedText object
  if (typeof obj === 'object' && !Array.isArray(obj) && 'en' in obj && 'fr' in obj) {
    return getLocalizedText(obj as LocalizedText, language) as T
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => localizeObject(item, language)) as T
  }
  
  if (typeof obj === 'object') {
    const result: any = {}
    for (const key in obj) {
      result[key] = localizeObject(obj[key], language)
    }
    return result
  }
  
  return obj
}

export function getSiteConfig(): SiteConfig {
  return siteConfig
}

export function getPersonalInfo(language?: Language) {
  if (language) {
    return localizeObject(siteConfig.personal, language)
  }
  return siteConfig.personal
}

export function getResearchData(language?: Language) {
  const research = siteConfig.research as typeof siteConfig.research & {
    currentProjects: ResearchProject[]
    publications: Publication[]
    thesis?: Publication[]
  }
  
  if (language) {
    return localizeObject(research, language)
  }
  return research
}

/**
 * A single course, either currently taught (`isCurrent`) or archived.
 * Courses live in site-config.json under teaching.currentCourses and
 * teaching.pastCourses[].courses. Any course carrying a `slug` also gets
 * its own generated page at /teaching/<slug>.
 */
export interface TeachingCourse {
  slug?: string
  contentRef?: string
  title: LocalizedText
  semester?: LocalizedText
  terms?: string[]
  schedule?: string
  summary?: LocalizedText
  description?: LocalizedText
  keywords?: string[]
  materials?: Array<{ type: LocalizedText; url: string }>
}

export interface CourseEntry extends TeachingCourse {
  slug: string
  university?: string
  isCurrent: boolean
}

/**
 * If a course declares a `contentRef`, its long description is pulled from
 * data/teaching/content/<ref>.{en,fr}.md instead of from the JSON.
 */
function resolveCourseContent(course: any) {
  if (course?.contentRef) {
    const content = teachingContent[course.contentRef as string]
    if (content) {
      course.description = { en: content.en, fr: content.fr }
    }
  }
  return course
}

export function getTeachingData(language?: Language) {
  const teaching = JSON.parse(JSON.stringify(siteConfig.teaching)) as any

  for (const course of teaching.currentCourses ?? []) {
    resolveCourseContent(course)
  }
  for (const block of teaching.pastCourses ?? []) {
    for (const course of block.courses ?? []) {
      resolveCourseContent(course)
    }
  }

  if (language) {
    return localizeObject(teaching, language)
  }
  return teaching
}

/**
 * Every course that has its own page, current ones first.
 * Used both for rendering a course page and for generating the static routes.
 */
export function getAllCourses(language?: Language): CourseEntry[] {
  const teaching = getTeachingData() as any
  const entries: CourseEntry[] = []

  for (const course of teaching.currentCourses ?? []) {
    if (course.slug) entries.push({ ...course, isCurrent: true })
  }
  for (const block of teaching.pastCourses ?? []) {
    for (const course of block.courses ?? []) {
      if (course.slug) {
        entries.push({ ...course, university: block.university, isCurrent: false })
      }
    }
  }

  return language ? localizeObject(entries, language) : entries
}

/** Slugs of every course page to pre-render (see app/teaching/[course]/page.tsx). */
export function getCourseSlugs(): string[] {
  return getAllCourses().map((course) => course.slug)
}

export function getCourseBySlug(slug: string, language?: Language): CourseEntry | null {
  return getAllCourses(language).find((course) => course.slug === slug) ?? null
}

export function getEtcData(language?: Language) {
  if (language) {
    return localizeObject(siteConfig.etc, language)
  }
  return siteConfig.etc
}

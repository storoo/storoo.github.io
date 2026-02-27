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

export function getTeachingData(language?: Language) {
  // Resolve contentRef fields: if a course has a contentRef, load the
  // description from the external markdown files instead of the JSON.
  const teaching = JSON.parse(JSON.stringify(siteConfig.teaching))
  if (teaching.currentCourses) {
    for (const course of teaching.currentCourses) {
      if ((course as any).contentRef) {
        const ref = (course as any).contentRef as string
        const content = teachingContent[ref]
        if (content) {
          course.description = { en: content.en, fr: content.fr } as any
        }
      }
    }
  }

  if (language) {
    return localizeObject(teaching, language)
  }
  return teaching
}

export function getEtcData(language?: Language) {
  if (language) {
    return localizeObject(siteConfig.etc, language)
  }
  return siteConfig.etc
}

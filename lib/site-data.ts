import siteConfig from "@/data/site-config.json"

export type SiteConfig = typeof siteConfig

// Extended type definitions for research data
export interface ResearchProject {
  title: string
  description: string
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

export function getSiteConfig(): SiteConfig {
  return siteConfig
}

export function getPersonalInfo() {
  return siteConfig.personal
}

export function getResearchData() {
  return siteConfig.research as typeof siteConfig.research & {
    currentProjects: ResearchProject[]
    publications: Publication[]
    thesis?: Publication[]
  }
}

export function getTeachingData() {
  return siteConfig.teaching
}

export function getEtcData() {
  return siteConfig.etc
}

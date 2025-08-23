import siteConfig from "@/data/site-config.json"

export type SiteConfig = typeof siteConfig

export function getSiteConfig(): SiteConfig {
  return siteConfig
}

export function getPersonalInfo() {
  return siteConfig.personal
}

export function getResearchData() {
  return siteConfig.research
}

export function getTeachingData() {
  return siteConfig.teaching
}

export function getEtcData() {
  return siteConfig.etc
}

import { Navigation } from "@/components/navigation"
import { SocialLinks } from "@/components/social-links"
import { getPersonalInfo } from "@/lib/site-data"
import { RichContent } from "@/components/rich-content"
import { use } from "react"
import getConfig from 'next/config'

export default function HomePage() {
  const personalInfo = getPersonalInfo() as any

  const { publicRuntimeConfig } = getConfig() || {}
  const basePath = (publicRuntimeConfig && publicRuntimeConfig.basePath) || ''

  const profileSrc = personalInfo.profileImage?.startsWith('http')
    ? personalInfo.profileImage
    : `${basePath}/${personalInfo.profileImage?.replace(/^\/+/, '')}`

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <div className="mb-8">
            <img
              src={profileSrc}
              alt={`${personalInfo.name} - Mathematician`}
              width={192}
              height={192}
              className="w-48 h-48 rounded-full mx-auto mb-6 object-cover border-4 border-border"/>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-serif">{personalInfo.name}</h1>
            <p className="text-xl text-muted-foreground mb-6">{personalInfo.title}</p>
            <div className="text-lg text-foreground leading-relaxed max-w-2xl mx-auto prose prose-neutral dark:prose-invert">
              <RichContent source={personalInfo.bio} currentPage="home" />
            </div>
          </div>
        </section>

        {/* Minimal Contact / Social Section */}
        <section className="max-w-2xl mx-auto text-center mt-10">
          <p className="text-lg text-muted-foreground mb-6">Feel free to get in touch!</p>
          <SocialLinks />
        </section>
      </main>
    </div>
  )
}

"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { RichContent } from "@/components/rich-content"
import { EntryLinks } from "@/components/talks/talk-list"
import { getWorkingGroupBySlug } from "@/lib/site-data"
import { useLanguage } from "@/lib/language-context"

/**
 * Renders one working-group page (/talks/<slug>).
 *
 * The body comes from data/talks/content/<slug>.{en,fr}.md; without such a
 * file the summary from site-config.json is shown instead. Links written as
 * ./files/x.pdf resolve to /talks/files/x.pdf (files live in public/talks/files/).
 */
export function WorkingGroupDetail({ slug }: { slug: string }) {
  const { language } = useLanguage()
  const group = getWorkingGroupBySlug(slug, language) as any

  const backLabel = language === "en" ? "Back to Talks" : "Retour aux exposés"
  const backLink = (
    <Link
      href="/talks/#working-groups"
      className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center mb-6"
    >
      <ArrowLeft className="w-4 h-4 mr-1" />
      {backLabel}
    </Link>
  )

  if (!group) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            {backLink}
            <p className="text-muted-foreground">
              {language === "en" ? "Working group not found." : "Groupe de travail introuvable."}
            </p>
          </div>
        </main>
      </div>
    )
  }

  const meta = [group.period, group.place, group.role].filter(Boolean) as string[]
  const body = group.content || group.summary

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto mb-8">
          {backLink}

          <h1 className="text-4xl font-bold text-foreground mb-4 font-serif [&_p]:inline [&_p]:m-0">
            <RichContent inline source={group.name} currentPage="talks" />
          </h1>

          {meta.length > 0 && (
            <div className="text-sm text-muted-foreground [&_p]:inline [&_p]:m-0">
              {meta.map((part, i) => (
                <span key={i}>
                  {i > 0 && <span className="mx-1.5">·</span>}
                  <RichContent inline source={part} currentPage="talks" />
                </span>
              ))}
            </div>
          )}
          <EntryLinks links={group.links} />
        </div>

        {body && (
          <section className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardContent className="p-4 sm:p-8">
                <div className="md-body text-muted-foreground leading-relaxed overflow-x-auto">
                  <RichContent source={body} currentPage="talks" />
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
    </div>
  )
}

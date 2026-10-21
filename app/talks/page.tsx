"use client"

import { Navigation } from "@/components/navigation"
import { RichContent } from "@/components/rich-content"
import { TalkList, WorkingGroupList } from "@/components/talks/talk-list"
import { getTalksData } from "@/lib/site-data"
import { useLanguage } from "@/lib/language-context"

export default function TalksPage() {
  const { language } = useLanguage()
  const data = getTalksData(language) as any
  const showTalks = !data.disableTalks && data.talks.length > 0
  const showWorkingGroups = !data.disableWorkingGroups && data.workingGroups.length > 0

  // Section headings can be overridden from site-config.json.
  const talksHeading = data.talksHeading || (language === "en" ? "Talks" : "Exposés")
  const workingGroupsHeading = data.workingGroupsHeading || (language === "en" ? "Working groups" : "Groupes de travail")

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 font-serif">
            {language === "en" ? "Talks and working groups" : "Exposés et groupes de travail"}
          </h1>
          {data.intro && (
            <div className="text-lg text-muted-foreground leading-relaxed">
              <RichContent source={data.intro} currentPage="talks" />
            </div>
          )}
        </div>

        {showTalks && (
          <section id="talks" className="max-w-4xl mx-auto mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">{talksHeading}</h2>
            <TalkList entries={data.talks} />
          </section>
        )}

        {showWorkingGroups && (
          <section id="working-groups" className="max-w-4xl mx-auto mb-16 scroll-mt-20">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">{workingGroupsHeading}</h2>
            <WorkingGroupList groups={data.workingGroups} />
          </section>
        )}
      </main>
    </div>
  )
}

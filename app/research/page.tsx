import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getResearchData } from "@/lib/site-data"
import { RichContent } from "@/components/rich-content"
import { AreaCard } from "@/components/research/area-card"
import { ProjectCard } from "@/components/research/project-card"
import { PublicationEntry } from "@/components/research/publication-entry"

export default function ResearchPage() {
  const research = getResearchData()
  const showAreas = !((research as any).disableAreas) && research.areas && research.areas.length > 0
  const showCurrentProjects = !((research as any).disableCurrentProjects) && research.currentProjects && research.currentProjects.length > 0
  const showPublications = !((research as any).disablePublications) && research.publications && research.publications.length > 0
  const showThesis = !((research as any).disableThesis) && (research as any).thesis && (research as any).thesis.length > 0
  const showCollaborations =
    research.collaborations &&
    !(research.collaborations as any).disabled &&
    ((research.collaborations.academic && research.collaborations.academic.length > 0) ||
      (research.collaborations.groups && research.collaborations.groups.length > 0))

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 font-serif">Research</h1>
          <div className="text-lg text-muted-foreground leading-relaxed prose prose-neutral dark:prose-invert">
            <RichContent source={research.overview} currentPage="research" />
          </div>
        </div>

        {showAreas && (
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">Research Areas</h2>
            <div className="grid md:grid-cols-2 gap-2">
              {research.areas.map((area, i) => (
                <AreaCard key={i} title={area.title} description={area.description} keywords={area.keywords} currentPage="research" />
              ))}
            </div>
          </section>
        )}

        {showCurrentProjects && (
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">Current Projects</h2>
            <div className="space-y-6">
              {research.currentProjects.map((p: any, i) => (
                <ProjectCard
                  key={i}
                  title={p.title}
                  period={p.period}
                  status={p.status}
                  description={p.description}
                  links={p.links}
                  currentPage="research"
                />
              ))}
            </div>
          </section>
        )}

        {showPublications && (
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">Publications and Preprints</h2>
            <div className="space-y-6">
              {research.publications.map((pub, i) => (
                <PublicationEntry
                  key={i}
                  title={pub.title}
                  authors={pub.authors}
                  venue={pub.venue}
                  abstract={pub.abstract}
                  links={pub.links}
                  currentPage="research"
                />
              ))}
            </div>

            {/* <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <a href="/publications.pdf" target="_blank" rel="noreferrer">
                  <FileText className="w-4 h-4 mr-2" />
                  Complete Publication List
                </a>
              </Button>
            </div> */}
          </section>
        )}

        {showThesis && (
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">Thesis</h2>
            <div className="space-y-6">
              {(research as any).thesis.map((thesis: any, i: number) => (
                <PublicationEntry
                  key={i}
                  title={thesis.title}
                  authors={thesis.authors}
                  venue={thesis.venue}
                  advisor={thesis.advisor}
                  abstract={thesis.abstract}
                  links={thesis.links}
                  currentPage="research"
                />
              ))}
            </div>
          </section>
        )}

        {showCollaborations && (
          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">Collaborations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {research.collaborations.academic?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Academic Collaborators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      {research.collaborations.academic.map((collab, index) => (
                        <li key={index}>• {collab}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              {research.collaborations.groups?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Research Groups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      {research.collaborations.groups.map((group, index) => (
                        <li key={index}>• {group}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

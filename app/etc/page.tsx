import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Award, Users, ExternalLink, FileText, Mic } from "lucide-react"
import { getEtcData } from "@/lib/site-data"
import { RichContent } from "@/components/rich-content"

export default function EtcPage() {
  const etc = getEtcData()
  
  // Check if the entire page is disabled
  if ((etc as any).disable) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4 font-serif">Page Temporarily Unavailable</h1>
            <p className="text-lg text-muted-foreground">This page is currently being updated. Please check back later.</p>
          </div>
        </main>
      </div>
    )
  }
  
  const showTalks = !((etc as any).disableTalks) && etc.talks && etc.talks.length > 0
  const showAwards = !((etc as any).disableAwards) && etc.awards && etc.awards.length > 0
  const showService = !((etc as any).disableService) && etc.service && ((etc.service.editorial?.length||0) > 0 || (etc.service.university?.length||0) > 0)
  const showConferences = !((etc as any).disableConferences) && etc.conferences && etc.conferences.length > 0
  const showOutreach = !((etc as any).disableOutreach) && etc.outreach && ((etc.outreach.public?.length||0) > 0 || (etc.outreach.media?.length||0) > 0)
  const showResources = !((etc as any).disableResources) && etc.resources && ((etc.resources.academic?.length||0) > 0 || (etc.resources.student?.length||0) > 0)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 font-serif">More</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Additional professional activities, talks, service contributions, and other academic endeavors that
            complement my research and teaching work.
          </p>
        </div>

        {showTalks && (
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">Recent Talks & Presentations</h2>
            <div className="space-y-6">
              {etc.talks.map((talk, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">"{talk.title}"</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {talk.date}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1" />
                          {talk.venue}
                        </div>
                      </div>
                      <Badge variant={talk.type === "Invited" ? "default" : "outline"}>{talk.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-muted-foreground mb-4 prose prose-neutral dark:prose-invert">
                      <RichContent source={talk.description} />
                    </div>
                    <div className="flex gap-2">
                      {talk.materials.map((material, materialIndex) => (
                        <Button key={materialIndex} variant="outline" size="sm" asChild>
                          <a href={material.url} target="_blank" rel="noreferrer">
                            {material.type === "Recording" ? (
                              <Mic className="w-4 h-4 mr-1" />
                            ) : (
                              <FileText className="w-4 h-4 mr-1" />
                            )}
                            {material.type}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {showAwards && (
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">Awards & Recognition</h2>
            <div className="space-y-4">
              {etc.awards.map((award, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                  <Award className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">{award.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      {award.organization}, {award.year}
                    </p>
                    <p className="text-sm text-muted-foreground">{award.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {showService && (
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">Professional Service</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {etc.service.editorial?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Editorial & Review Work
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      {etc.service.editorial.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              {etc.service.university?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">University Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      {etc.service.university.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}

        {showConferences && (
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">Conferences & Workshops</h2>
            <div className="space-y-4">
              {etc.conferences.map((conference, index) => (
                <div key={index} className="border-l-4 border-accent pl-6">
                  <h3 className="text-lg font-semibold mb-1">{conference.title}</h3>
                  <p className="text-muted-foreground mb-2">
                    <strong>Role:</strong> {conference.role} | <strong>Date:</strong> {conference.date} |{" "}
                    <strong>Location:</strong> {conference.location}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">{conference.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href={conference.url} target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      {conference.title} Website
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {showOutreach && (
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">Outreach & Media</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {etc.outreach.public?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Public Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {etc.outreach.public.map((item, index) => (
                        <li key={index} className="border-l-2 border-accent pl-3">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              {etc.outreach.media?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Media Appearances</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {etc.outreach.media.map((item, index) => (
                        <li key={index} className="border-l-2 border-accent pl-3">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}

        {showResources && (
          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">Useful Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {etc.resources.academic?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Academic Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {etc.resources.academic.map((resource, index) => (
                        <li key={index}>
                          <Button variant="link" className="p-0 h-auto text-accent" asChild>
                            <a href={resource.url} target="_blank" rel="noreferrer">
                              {resource.title}
                            </a>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              {etc.resources.student?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Student Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {etc.resources.student.map((resource, index) => (
                        <li key={index}>
                          <Button variant="link" className="p-0 h-auto text-accent" asChild>
                            <a href={resource.url} target="_blank" rel="noreferrer">
                              {resource.title}
                            </a>
                          </Button>
                        </li>
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

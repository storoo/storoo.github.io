"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Clock, Users, Calendar } from "lucide-react"
import { getTeachingData } from "@/lib/site-data"
import { RichContent } from "@/components/rich-content"
import { useLanguage } from "@/lib/language-context"

export default function TeachingPage() {
  const { language } = useLanguage()
  const teaching = getTeachingData(language)
  const showCurrentCourses = !((teaching as any).disableCurrentCourses) && teaching.currentCourses && teaching.currentCourses.length > 0
  const showOfficeHours = !((teaching as any).disableOfficeHours || (teaching.officeHours as any)?.disableOfficeHours) && teaching.officeHours && teaching.officeHours.schedule && teaching.officeHours.schedule.length > 0
  const showResources = !((teaching as any).disableResources) && teaching.resources && teaching.resources.length > 0
  const pastCourseBlocks = Array.isArray((teaching as any).pastCourses) ? (teaching as any).pastCourses : []
  const showPastCourses = !((teaching as any).disablePastCourses) && pastCourseBlocks.length > 0
  const showPhilosophy = !((teaching as any).disableTeachingPhilosophy) && !!teaching.philosophy
  const showSupportSection = (showOfficeHours || showResources)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 font-serif">{language === 'en' ? 'Teaching' : 'Enseignement'}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {language === 'en' 
              ? 'I am passionate about mathematics education and believe in making complex concepts accessible to students at all levels. My teaching philosophy emphasizes understanding over memorization and encourages students to develop problem-solving skills.'
              : 'Passionné par la pédagogie des mathématiques, je m\'efforce de rendre les concepts complexes accessibles à tous. Mon approche met l\'accent sur la compréhension fondamentale au détriment du "par cœur", tout en développant l\'esprit d\'analyse et de résolution de problèmes des étudiants.'}
          </p>
        </div>

        {showCurrentCourses && (
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">{language === 'en' ? 'Current Courses (Fall - Spring 2025)' : 'Cours actuels (Automne - Printemps 2025)'}</h2>
            <div className="space-y-6">
              {teaching.currentCourses.map((course, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-1">
                          <RichContent inline source={course.title} currentPage="teaching" />
                        </CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Calendar className="w-4 h-4 mr-1" />
                          {course.schedule}
                        </div>
                        {/* <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="w-4 h-4 mr-1" /> 
                          {course.enrollment} students enrolled
                        </div> */}
                      </div>
                      <Badge>Current</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-muted-foreground mb-1 prose prose-neutral dark:prose-invert">
                      <RichContent source={course.description} currentPage="teaching" />
                    </div>
                    <div className="flex flex-wrap gap-2 mb-1">
                      {course.keywords.map((keyword, keyIndex) => (
                        <Badge key={keyIndex} variant="secondary">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {course.materials.map((material, materialIndex) => (
                        <Button key={materialIndex} variant="outline" size="sm" asChild>
                          <a href={material.url} target="_blank" rel="noreferrer">
                            <FileText className="w-4 h-4 mr-1" />
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

        {showSupportSection && (
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">Office Hours & Support</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {showOfficeHours && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Office Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-muted-foreground">
                      {teaching.officeHours.schedule.map((slot, index) => (
                        <p key={index}>
                          <strong>{slot.day}:</strong> {slot.time}
                        </p>
                      ))}
                      <p className="text-sm mt-4">
                        <strong>Location:</strong> {teaching.officeHours.location}
                      </p>
                      <p className="text-sm">{teaching.officeHours.note}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              {showResources && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Student Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      {teaching.resources.map((resource, index) => (
                        <li key={index}>• {resource}</li>
                      ))}
                    </ul>
                    <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                      <FileText className="w-4 h-4 mr-1" />
                      Student Guide
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}

        {showPastCourses && (
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">Previously Taught Courses</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pastCourseBlocks.map((block: any, i: number) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-lg">{block.university}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {block.courses?.map((course: any, ci: number) => (
                        <li key={ci} className="border-l-2 border-accent pl-3">
                          <div className="font-medium">
                            <RichContent inline source={course.title} />
                          </div>
                          {course.terms?.length > 0 && (
                            <div className="text-sm text-muted-foreground">{course.terms.join(", ")}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {showPhilosophy && (
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">Teaching Philosophy</h2>
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-gray max-w-none">
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line prose prose-neutral dark:prose-invert">
                    <RichContent source={teaching.philosophy} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
    </div>
  )
}

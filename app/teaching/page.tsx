"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Clock, Users, Calendar, ArrowRight } from "lucide-react"
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

  // Section headings come from site-config.json so the academic year can be
  // updated without touching this file.
  const currentCoursesHeading = (teaching as any).currentCoursesHeading
    || (language === 'en' ? 'Current Courses' : 'Cours actuels')
  const pastCoursesHeading = (teaching as any).pastCoursesHeading
    || (language === 'en' ? 'Previously Taught Courses' : 'Cours enseignés précédemment')

  // Current courses are grouped by their "semester" field, in the order they
  // appear in the config. Courses without one land in a single unlabelled group.
  const semesterGroups: { label: string; courses: any[] }[] = []
  for (const course of (teaching.currentCourses ?? []) as any[]) {
    const label = typeof course.semester === 'string' ? course.semester : ''
    let group = semesterGroups.find((g) => g.label === label)
    if (!group) {
      group = { label, courses: [] }
      semesterGroups.push(group)
    }
    group.courses.push(course)
  }
  const showSemesterLabels = semesterGroups.some((g) => g.label !== '')

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
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">{currentCoursesHeading}</h2>
            <div className="space-y-10">
              {semesterGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {showSemesterLabels && group.label && (
                    <h3 className="text-lg font-medium text-muted-foreground mb-4 font-serif">{group.label}</h3>
                  )}
                  <div className="space-y-6">
                    {group.courses.map((course: any, index: number) => (
                      <Card key={index}>
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <CardTitle className="text-xl mb-1">
                                {course.slug ? (
                                  <Link href={`/teaching/${course.slug}`} className="hover:underline">
                                    <RichContent inline source={course.title} currentPage="teaching" />
                                  </Link>
                                ) : (
                                  <RichContent inline source={course.title} currentPage="teaching" />
                                )}
                              </CardTitle>
                              {course.schedule && (
                                <div className="flex items-center text-sm text-muted-foreground mb-2">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {course.schedule}
                                </div>
                              )}
                              {/* <div className="flex items-center text-sm text-muted-foreground">
                                <Users className="w-4 h-4 mr-1" /> 
                                {course.enrollment} students enrolled
                              </div> */}
                            </div>
                            <Badge className="shrink-0">{language === 'en' ? 'Current' : 'En cours'}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {/* A short blurb only: the full material lives on the course page.
                              Courses written directly in the JSON (no contentRef) still show
                              their description here. */}
                          {(course.summary || (!course.contentRef && course.description)) && (
                            <div className="text-muted-foreground prose prose-neutral dark:prose-invert">
                              <RichContent source={course.summary || course.description} currentPage="teaching" />
                            </div>
                          )}
                          {course.keywords?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {course.keywords.map((keyword: string, keyIndex: number) => (
                                <Badge key={keyIndex} variant="secondary">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {course.materials?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {course.materials.map((material: any, materialIndex: number) => (
                                <Button key={materialIndex} variant="outline" size="sm" asChild>
                                  <a href={material.url} target="_blank" rel="noreferrer">
                                    <FileText className="w-4 h-4 mr-1" />
                                    {material.type}
                                  </a>
                                </Button>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
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
                      {teaching.officeHours.schedule.map((slot: any, index: number) => (
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
                      {teaching.resources.map((resource: string, index: number) => (
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
            <h2 className="text-2xl font-semibold text-foreground mb-8 font-serif">{pastCoursesHeading}</h2>
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
                          {/* Archived courses that kept a slug still have their own page. */}
                          <div className="font-medium">
                            {course.slug ? (
                              <Link href={`/teaching/${course.slug}`} className="hover:underline inline-flex items-baseline gap-1">
                                <RichContent inline source={course.title} currentPage="teaching" />
                                <ArrowRight className="w-3 h-3 self-center shrink-0" />
                              </Link>
                            ) : (
                              <RichContent inline source={course.title} />
                            )}
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

"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, FileText } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RichContent } from "@/components/rich-content"
import { getCourseBySlug } from "@/lib/site-data"
import { useLanguage } from "@/lib/language-context"

/**
 * Renders one course page (/teaching/<slug>).
 *
 * The body comes from data/teaching/content/<contentRef>.{en,fr}.md.
 * `currentPage="teaching"` is what makes links written as ./files/x.pdf
 * resolve to /teaching/files/x.pdf, so file links keep working unchanged
 * whether they are shown here or on the main teaching page.
 */
export function CourseDetail({ slug }: { slug: string }) {
  const { language } = useLanguage()
  const course = getCourseBySlug(slug, language)

  const backLabel = language === "en" ? "Back to Teaching" : "Retour à l'enseignement"

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground">
              {language === "en" ? "Course not found." : "Cours introuvable."}
            </p>
            <Link href="/teaching" className="text-sm inline-flex items-center mt-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              {backLabel}
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const timing = course.schedule || course.terms?.join(", ") || ""

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto mb-8">
          <Link
            href="/teaching"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {backLabel}
          </Link>

          <div className="flex items-start justify-between gap-4">
            <h1 className="text-4xl font-bold text-foreground mb-4 font-serif">
              <RichContent inline source={course.title} currentPage="teaching" />
            </h1>
            <Badge variant={course.isCurrent ? "default" : "secondary"} className="mt-2 shrink-0">
              {course.isCurrent
                ? language === "en" ? "Current" : "En cours"
                : language === "en" ? "Archived" : "Archivé"}
            </Badge>
          </div>

          {(course.university || timing) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              {course.university && <span>{course.university}</span>}
              {timing && (
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {timing}
                </span>
              )}
            </div>
          )}
        </div>

        <section className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardContent className="p-8">
              <div className="text-muted-foreground leading-relaxed prose prose-neutral dark:prose-invert max-w-none">
                <RichContent source={course.description ?? ""} currentPage="teaching" />
              </div>
            </CardContent>
          </Card>
        </section>

        {(course.keywords?.length || course.materials?.length) ? (
          <section className="max-w-4xl mx-auto mb-16 space-y-4">
            {course.keywords && course.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {course.keywords.map((keyword, i) => (
                  <Badge key={i} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
            {course.materials && course.materials.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {course.materials.map((material: any, i: number) => (
                  <Button key={i} variant="outline" size="sm" asChild>
                    <a href={material.url} target="_blank" rel="noreferrer">
                      <FileText className="w-4 h-4 mr-1" />
                      {material.type}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </section>
        ) : null}
      </main>
    </div>
  )
}

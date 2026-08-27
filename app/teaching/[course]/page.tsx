import { CourseDetail } from "@/components/teaching/course-detail"
import { getCourseSlugs } from "@/lib/site-data"

/**
 * One static page per course, at /teaching/<slug>.
 *
 * The list of slugs comes straight from data/site-config.json: every course
 * (current or archived) that has a "slug" gets a page here automatically.
 * Nothing to edit in this file when adding a course - see TEACHING_GUIDE.md.
 */
export function generateStaticParams() {
  return getCourseSlugs().map((course) => ({ course }))
}

export const dynamicParams = false

export default async function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  return <CourseDetail slug={course} />
}

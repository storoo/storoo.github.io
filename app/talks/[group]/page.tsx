import { WorkingGroupDetail } from "@/components/talks/working-group-detail"
import { getWorkingGroupSlugs } from "@/lib/site-data"

/**
 * One static page per working group, at /talks/<slug>.
 *
 * Every working group in data/site-config.json that has a "slug" gets a page
 * here automatically. Nothing to edit in this file - see TALKS_GUIDE.md.
 */
export function generateStaticParams() {
  const slugs = getWorkingGroupSlugs()
  // A static export refuses a dynamic route with no pages at all, so until a
  // working group has a slug, emit one unlinked "not found" page instead.
  return (slugs.length > 0 ? slugs : ["_"]).map((group) => ({ group }))
}

export const dynamicParams = false

export default async function WorkingGroupPage({ params }: { params: Promise<{ group: string }> }) {
  const { group } = await params
  return <WorkingGroupDetail slug={group} />
}

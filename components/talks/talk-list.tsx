"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { RichContent } from "@/components/rich-content"
import { resolvePath } from "@/lib/path-resolver"

/**
 * The two lists of the /talks page. Both share one layout: the year (or the
 * period of a working group) in a narrow left column, entries on the right.
 * Entries arrive already localized by getTalksData(language).
 */

interface EntryLink { type: string; url: string }

// Lets RichContent's <p> wrapper sit inline inside a single line of text.
const inlineText = "[&_p]:inline [&_p]:m-0"

/** "Slides · Notes · Paper": small text links under an entry. */
export function EntryLinks({ links }: { links?: EntryLink[] }) {
  if (!links?.length) return null
  return (
    <div className="text-sm mt-1">
      {links.map((link, i) => {
        const resolved = resolvePath(link.url, "talks")
        const newTab = resolved.isExternal || resolved.isFile
        return (
          <span key={i}>
            {i > 0 && <span className="text-muted-foreground mx-1.5">·</span>}
            <a href={resolved.href} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {link.type}
            </a>
          </span>
        )
      })}
    </div>
  )
}

/** Small grey line such as "Event · Place · Date"; empty parts are skipped. */
function MetaLine({ parts, className = "" }: { parts: Array<string | undefined>; className?: string }) {
  const present = parts.filter(Boolean) as string[]
  if (present.length === 0) return null
  return (
    <div className={`text-sm text-muted-foreground ${inlineText} ${className}`}>
      {present.map((part, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-1.5">·</span>}
          <RichContent inline source={part} currentPage="talks" />
        </span>
      ))}
    </div>
  )
}

function DatedRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="sm:grid sm:grid-cols-[7rem_1fr] sm:gap-x-6">
      <div className="font-serif font-semibold text-muted-foreground mb-3 sm:mb-0">{label}</div>
      <div className="space-y-6">{children}</div>
    </div>
  )
}

export function TalkList({ entries }: { entries: any[] }) {
  // Entries come sorted newest first; consecutive ones sharing a year are grouped.
  const years: { year: string; entries: any[] }[] = []
  for (const entry of entries) {
    const year = String(entry.year)
    const last = years[years.length - 1]
    if (last && last.year === year) last.entries.push(entry)
    else years.push({ year, entries: [entry] })
  }

  return (
    <div className="space-y-10">
      {years.map((group) => (
        <DatedRow key={group.year} label={group.year}>
          {group.entries.map((entry, i) => (
            <div key={i} className="border-l-2 border-accent pl-4">
              <MetaLine parts={[entry.event, entry.place, entry.date]} />
              <div className="mt-1 space-y-3">
                {entry.talks.map((talk: any, j: number) => (
                  <div key={j}>
                    <div className={`text-lg font-medium text-foreground leading-snug ${inlineText}`}>
                      <RichContent inline source={talk.title} currentPage="talks" />
                    </div>
                    {talk.note && (
                      <div className={`text-sm text-muted-foreground mt-0.5 ${inlineText}`}>
                        <RichContent inline source={talk.note} currentPage="talks" />
                      </div>
                    )}
                    <EntryLinks links={talk.links} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </DatedRow>
      ))}
    </div>
  )
}

export function WorkingGroupList({ groups }: { groups: any[] }) {
  return (
    <div className="space-y-10">
      {groups.map((group, i) => (
        <DatedRow key={i} label={group.period}>
          <div className="border-l-2 border-accent pl-4">
            <div className={`text-lg font-medium leading-snug ${inlineText}`}>
              {group.slug ? (
                <Link href={`/talks/${group.slug}`} className="hover:underline inline-flex items-baseline gap-1">
                  <RichContent inline source={group.name} currentPage="talks" />
                  <ArrowRight className="w-4 h-4 self-center shrink-0" />
                </Link>
              ) : (
                <span className="text-foreground">
                  <RichContent inline source={group.name} currentPage="talks" />
                </span>
              )}
            </div>
            <MetaLine parts={[group.place, group.role]} className="mt-0.5" />
            {group.summary && (
              <div className="text-sm text-muted-foreground mt-1">
                <RichContent source={group.summary} currentPage="talks" />
              </div>
            )}
            <EntryLinks links={group.links} />
          </div>
        </DatedRow>
      ))}
    </div>
  )
}

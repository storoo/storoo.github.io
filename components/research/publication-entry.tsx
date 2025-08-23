import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { RichContent } from "@/components/rich-content"

interface PubLink { type: string; url: string }

interface PublicationEntryProps {
  title: string
  authors: string[]
  venue: string
  abstract: string
  links: PubLink[]
  className?: string
  currentPage?: string
}

export function PublicationEntry({ title, authors, venue, abstract, links, className, currentPage = "research" }: PublicationEntryProps) {
  return (
    <div className={className + " border-l-4 border-accent pl-6"}>
      <h3 className="text-lg font-semibold mb-2">
        <RichContent source={title} inline={true} currentPage={currentPage} />
      </h3>
      <p className="text-muted-foreground mb-2">
        <strong>Authors:</strong> {authors.join(", ")}
      </p>
      <p className="text-muted-foreground mb-2">
        <strong></strong> {venue}
      </p>
      <div className="text-sm text-muted-foreground mb-3 prose prose-neutral dark:prose-invert">
        <RichContent source={abstract} currentPage={currentPage} />
      </div>
      <div className="flex gap-2">
        {links.map((link, i) => (
          <Button key={i} variant="outline" size="sm" asChild>
            <a href={link.url} target="_blank" rel="noreferrer">
              <FileText className="w-4 h-4 mr-1" />
              {link.type}
            </a>
          </Button>
        ))}
      </div>
    </div>
  )
}

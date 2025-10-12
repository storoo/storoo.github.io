import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText } from "lucide-react"
import { RichContent } from "@/components/rich-content"

interface ProjectLink { type: string; url: string }

interface ProjectCardProps {
  title: string;
  period: string[];
  status: string;
  description: string;
  links: ProjectLink[];
  className?: string;
  currentPage?: string;
}

export function ProjectCard({ title, period, status, description, links, className, currentPage = "research" }: ProjectCardProps) {
  const statusVariant = status === "Active" ? "default" : "outline"
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl mb-2">{title}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              {period}
            </div>
          </div>
          <Badge variant={statusVariant}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground mb-4 prose prose-neutral dark:prose-invert">
          <RichContent source={description} currentPage={currentPage} />
        </div>
        <div className="flex gap-2">
          {(links ?? []).map((link, i) => (
            <Button key={i} variant="outline" size="sm" asChild>
              <a href={link.url} target="_blank" rel="noreferrer">
                <FileText className="w-4 h-4 mr-1" />
                {link.type}
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

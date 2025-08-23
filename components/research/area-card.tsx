import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RichContent } from "@/components/rich-content"

interface AreaCardProps {
  title: string
  description: string
  keywords: string[]
  className?: string
  currentPage?: string
}

export function AreaCard({ title, description, keywords, className, currentPage = "research" }: AreaCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground mb-4 prose prose-neutral dark:prose-invert">
          <RichContent source={description} currentPage={currentPage} />
        </div>
        <div className="flex flex-wrap gap-2">
          {keywords.map((k, i) => (
            <Badge key={i} variant="secondary">
              {k}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useEffect, useRef } from "react"

interface LatexTextProps {
  children: string
  className?: string
}

export function LatexText({ children, className = "" }: LatexTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const renderMath = async () => {
      if (typeof window !== "undefined" && containerRef.current) {
        // Dynamically import KaTeX
        const katex = await import("katex")

        // Split text by $$ delimiters
        const parts = children.split(/(\$\$.*?\$\$)/g)

        if (containerRef.current) {
          containerRef.current.innerHTML = ""

          parts.forEach((part) => {
            if (part.startsWith("$$") && part.endsWith("$$")) {
              // This is LaTeX math
              const mathContent = part.slice(2, -2) // Remove $$ delimiters
              const mathSpan = document.createElement("span")
              mathSpan.className = "katex-math"

              try {
                katex.default.render(mathContent, mathSpan, {
                  displayMode: false,
                  throwOnError: false,
                  // (no fontSize here)
                })
                mathSpan.style.fontSize = "0.8em" // adjust via DOM (or use a CSS class)
              } catch (error) {
                console.error("KaTeX rendering error:", error)
                mathSpan.textContent = `[Math Error: ${mathContent}]`
                mathSpan.className = "text-red-500"
              }

              containerRef.current?.appendChild(mathSpan)
            } else {
              // This is regular text
              const textSpan = document.createElement("span")
              textSpan.textContent = part
              containerRef.current?.appendChild(textSpan)
            }
          })
        }
      }
    }

    renderMath()
  }, [children])

  return (
    <div ref={containerRef} className={`inline ${className}`} style={{ fontSize: "inherit", lineHeight: "inherit" }}>
      {children}
    </div>
  )
}

"use client";
import React, { useMemo, memo } from "react";
import { FaEnvelope, FaUniversity, FaGithub, FaLinkedin, FaIdCard } from "react-icons/fa";
import DOMPurify from "isomorphic-dompurify";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { resolvePath } from "@/lib/path-resolver";
import { useLanguage } from "@/lib/language-context";
import { getLocalizedText } from "@/lib/site-data";

/**
 * RichContent renders a string that may contain Markdown, inline HTML and $$ KaTeX $$ math.
 * It sanitizes HTML and handles path resolution for links and files.
 */
// Token to icon JSX map. Extend as needed.
const tokenMap: Record<string, React.ReactNode> = {
  ":email:": <FaEnvelope className="inline-block translate-y-px" aria-label="Email" />,
  ":institution:": <FaUniversity className="inline-block translate-y-px" aria-label="Institution" />,
  ":github:": <FaGithub className="inline-block translate-y-px" aria-label="GitHub" />,
  ":linkedin:": <FaLinkedin className="inline-block translate-y-px" aria-label="LinkedIn" />,
  ":cv:": <FaIdCard className="inline-block translate-y-px" aria-label="CV" />,
};

interface RichContentProps { 
  source: string | { en: string; fr: string }; 
  className?: string; 
  inline?: boolean;
  currentPage?: string; // Add context for path resolution
}

export const RichContent = memo(function RichContent({ source, className = "", inline = false, currentPage = "home" }: RichContentProps) {
  const { language } = useLanguage();
  
  // Get the localized text
  const localizedSource = typeof source === 'string' ? source : getLocalizedText(source, language);
  
  const nodes = useMemo(() => {
    try {
      const file = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeKatex)
        .use(rehypeRaw)
        .use(rehypeStringify)
        .processSync(localizedSource);

      let rawHtml = String(file);
      
      // Process links to resolve relative paths
      rawHtml = rawHtml.replace(
        /<a\s+href="([^"]+)"([^>]*)>/g,
        (match, href, otherAttrs) => {
          const resolved = resolvePath(href, currentPage);
          let newAttrs = otherAttrs;
          
          if (resolved.isExternal) {
            newAttrs += ' target="_blank" rel="noopener noreferrer"';
          }
          
          // For PDFs, open in new tab instead of downloading
          if (resolved.isFile) {
            if (href.toLowerCase().endsWith('.pdf')) {
              newAttrs += ' target="_blank" rel="noopener noreferrer"';
            } else {
              newAttrs += ' download';
            }
          }
          
          return `<a href="${resolved.href}"${newAttrs}>`;
        }
      );

      const parts = rawHtml.split(/(:email:|:institution:|:github:|:linkedin:|:cv:)/g);
      const reactNodes = parts.map((p, i) => {
        if (tokenMap[p]) return <span key={i} className="inline-icon">{tokenMap[p]}</span>;
        return p;
      });
      return reactNodes.map((n, i) => {
        if (typeof n === "string") {
          const clean = DOMPurify.sanitize(
            n.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ""),
            { ADD_TAGS: ["span"], ADD_ATTR: ["class", "style", "href", "target", "rel", "download"] }
          );
          return <span key={i} dangerouslySetInnerHTML={{ __html: clean }} />;
        }
        return n;
      });
    } catch (e) {
      console.error("RichContent render error", e);
      return localizedSource;
    }
  }, [localizedSource, currentPage]);

  if (inline) {
    return <span className={className}>{nodes}</span>;
  }
  return <div className={className}>{nodes}</div>;
});

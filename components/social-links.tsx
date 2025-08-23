import { memo } from "react";
import site from "@/data/site-config.json";
import { FaUniversity, FaEnvelope, FaGithub, FaLinkedin, FaIdCard} from "react-icons/fa";
import type { IconType } from "react-icons";

// Simple glyph fallbacks for services without react-icons
const fallbackMap: Record<string, string> = {
  scholar: "GS",
  ads: "ADS",
} as const;

const iconMap: Record<string, IconType | undefined> = {
  institution: FaUniversity,
  email: FaEnvelope,
  github: FaGithub,
  linkedin: FaLinkedin,
  cv: FaIdCard,
} as const;

interface SocialLink {
  type: string;
  url: string;
}

export const SocialLinks = memo(function SocialLinks({ className = "" }: { className?: string }) {
  const links: SocialLink[] = (site as any).personal?.social || [];
  if (!links.length) return null;
  
  return (
    <ul className={`flex flex-wrap items-center justify-center gap-5 text-xl ${className}`}>
      {links.map((l) => {
        const Icon = iconMap[l.type];
        const label = l.type.charAt(0).toUpperCase() + l.type.slice(1);
        const isExternal = /^https?:\/\//.test(l.url);
        const common = {
          href: l.url,
          title: label,
          target: isExternal ? "_blank" : undefined,
          rel: isExternal ? "noopener noreferrer" : undefined,
          className:
            "text-foreground/70 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded-sm",
        } as const;
        return (
          <li key={l.type}>
            <a {...common} aria-label={label}>
              {Icon ? (
                <Icon aria-hidden="true" />
              ) : (
                <span className="text-sm font-semibold tracking-wide">{fallbackMap[l.type] || l.type}</span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
});

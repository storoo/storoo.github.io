"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, memo } from "react"

const navigationItems = [
  { name: "Research", href: "/research" },
  { name: "Teaching", href: "/teaching" },
  { name: "Etc", href: "/etc" },
] as const

const Navigation = memo(function Navigation() {
  const pathname = usePathname()

  return (
  <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Home button on the left */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className={cn(
                "px-3 py-2 rounded-md text-lg font-semibold transition-colors",
                pathname === "/"
                  ? "text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800/60"
                  : "text-foreground hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/60",
              )}
            >
              Home
            </Link>
          </div>

          {/* Navigation items on the right */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800/60"
                      : "text-foreground hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/60",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  )
})

const MobileMenu = memo(function MobileMenu() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-background border border-border rounded-md shadow-lg">
          <div className="py-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={cn(
                "block px-4 py-2 text-sm rounded-md transition-colors",
                pathname === "/"
                  ? "text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800/60"
                  : "text-foreground hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/60",
              )}
            >
              Home
            </Link>
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-2 text-sm rounded-md transition-colors",
                  pathname === item.href
                    ? "text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800/60"
                    : "text-foreground hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/60",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
})

export { Navigation }

"use client"

import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { memo } from 'react'

export const LanguageSwitcher = memo(function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 border border-border rounded-md p-1">
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="h-8 px-3 text-xs font-medium"
        aria-label="Switch to English"
      >
        EN
      </Button>
      <Button
        variant={language === 'fr' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('fr')}
        className="h-8 px-3 text-xs font-medium"
        aria-label="Passer en français"
      >
        FR
      </Button>
    </div>
  )
})

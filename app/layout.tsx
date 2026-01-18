import type React from "react"
import type { Metadata } from "next"
import { Alegreya_Sans } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"

const alegreyaSans = Alegreya_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alegreya-sans",
  weight: ["300", "400", "500", "700"],
  preload: true,
})

export const metadata: Metadata = {
  title: "Santiago Toro",
  description: "Academic website",
  generator: "Next.js",
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
  <html lang="en" className={`${alegreyaSans.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
          integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=STIX+Two+Math&family=STIX+Two+Text:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
  <body className="bg-background text-foreground font-sans" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

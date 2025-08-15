import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smart Student Handler",
  description: "Your AI Academic Assistant - Automate attendance, store study materials, and get AI-powered exam help",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="page-transition">
            {children}
            <MobileBottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

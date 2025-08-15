"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Calendar, Search, Cloud, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "DashBoard",
    href: "/home",
    icon: Home,
  },
  {
    title: "Attndence",
    href: "/attendance",
    icon: Calendar,
  },
  {
    title: "Search",
    href: "/search",
    icon: Search,
    isCenter: true,
  },
  {
    title: "Cloud Storage",
    href: "/cloud",
    icon: Cloud,
  },
  {
    title: "AI Exam",
    href: "/exam-helper",
    icon: Brain,
  },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  // Hide bottom nav on landing page
  if (pathname === "/") {
    return null
  }

  return (
    <>
      {/* Spacer to prevent content overlap */}
      <div className="h-14 md:hidden" />

      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* Main Navigation Bar with Same Background as Top Navbar */}
        <div className="header-gradient px-4 py-2 pt-3">
          <div className="flex items-center justify-between relative px-1">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href
              const isCenter = item.isCenter

              if (isCenter) {
                // Center Search Button - Smaller size
                return (
                  <div key={item.href} className="flex flex-col items-center relative -mt-1">
                    <Link href={item.href} className="group">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full shadow-2xl transition-all duration-300 group-active:scale-95",
                          "bg-gradient-to-br from-purple-500 via-blue-500 to-blue-600",
                          "hover:shadow-blue-500/40 hover:shadow-2xl hover:scale-105",
                          "flex items-center justify-center",
                          "border-2 border-white/20 ring-1 ring-blue-400/30",
                          "relative overflow-hidden",
                          pathname === "/search" &&
                            "ring-2 ring-blue-300/80 ring-offset-1 ring-offset-white dark:ring-offset-gray-900",
                        )}
                      >
                        {/* Gradient overlay for extra shine */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 rounded-full" />

                        {/* Search Icon - 5x5 */}
                        <Search className="h-5 w-5 text-white relative z-10 drop-shadow-lg" />
                      </div>
                    </Link>
                  </div>
                )
              }

              // Regular navigation items - Icons only, no text
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center transition-all duration-200 active:scale-95 py-2 px-2 rounded-lg",
                    isActive
                      ? "text-green-600 dark:text-blue-400 bg-green-100 dark:bg-blue-900"
                      : "text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-blue-400 hover:bg-green-100 dark:hover:bg-blue-900",
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Bottom Safe Area with Same Background */}
        <div className="header-gradient h-safe-area-inset-bottom" />
      </nav>
    </>
  )
}

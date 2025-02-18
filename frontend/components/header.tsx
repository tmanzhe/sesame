"use client"

import { useState } from "react"
import Link from "next/link"
import { Wrench, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-3 mr-8">
          <Wrench className="h-6 w-6" />
          <span className="font-bold text-lg">Sesame</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4 sm:justify-between">
          <nav className="hidden sm:flex items-center space-x-16 text-sm">
            <button onClick={() => scrollToSection("features")} className="transition hover:text-foreground/80">
              Features
            </button>
            <button onClick={() => scrollToSection("docs")} className="transition hover:text-foreground/80">
              Docs
            </button>
          </nav>
          <div className="flex items-center space-x-6">
            <ThemeToggle />
            <Button asChild className="hidden sm:flex px-6">
              <Link href="/register">Register</Link>
            </Button>
            <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden">
          <nav className="flex flex-col space-y-4 p-4 bg-background border-t border-border/50">
            <button
              onClick={() => scrollToSection("features")}
              className="text-left transition hover:text-foreground/80"
            >
              Features
            </button>
            <button onClick={() => scrollToSection("docs")} className="text-left transition hover:text-foreground/80">
              Docs
            </button>
            <Link href="/register" className="transition hover:text-foreground/80">
              Register
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}


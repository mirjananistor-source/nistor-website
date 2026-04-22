"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLang } from "@/app/providers"

const navLinks = {
  SR: [
    { href: "#metodologija", label: "Metodologija" },
    { href: "#mima", label: "MIMA" },
    { href: "#za-koga", label: "Za koga" },
    { href: "#kontakt", label: "Kontakt" },
  ],
  EN: [
    { href: "#metodologija", label: "Methodology" },
    { href: "#mima", label: "MIMA" },
    { href: "#za-koga", label: "For whom" },
    { href: "#kontakt", label: "Contact" },
  ],
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { lang, setLang } = useLang()
  const links = navLinks[lang]
  const ctaLabel = lang === "SR" ? "Pokreni dijagnostiku" : "Start diagnostics"

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex-shrink-0 flex items-center">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nistor_logo_xl-zbxpcfuWG3WmrLy0zZxfAjm5tfRvSw.png"
              alt="NiStor - Structure. Optimize. Grow Smartly."
              className="h-[72px] w-auto"
            />
          </a>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-light-teal transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center bg-white/10 rounded-full p-1">
              <button
                onClick={() => setLang("SR")}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${
                  lang === "SR"
                    ? "bg-teal text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                SR
              </button>
              <button
                onClick={() => setLang("EN")}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${
                  lang === "EN"
                    ? "bg-teal text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <Button
              asChild
              className="bg-teal hover:bg-teal/90 text-white font-medium px-6"
            >
              <a href="#mima" onClick={() => setTimeout(() => window.dispatchEvent(new CustomEvent("mima:start")), 600)}>{ctaLabel}</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-navy border-t border-white/10">
          <div className="px-4 py-4 space-y-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-white/80 hover:text-light-teal transition-colors text-base font-medium py-2"
              >
                {link.label}
              </a>
            ))}
            
            {/* Mobile Language Toggle */}
            <div className="flex items-center gap-2 py-2">
              <span className="text-white/60 text-sm">Jezik:</span>
              <div className="flex items-center bg-white/10 rounded-full p-1">
                <button
                  onClick={() => setLang("SR")}
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${
                    lang === "SR"
                      ? "bg-teal text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  SR
                </button>
                <button
                  onClick={() => setLang("EN")}
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${
                    lang === "EN"
                      ? "bg-teal text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <Button
              asChild
              className="w-full bg-teal hover:bg-teal/90 text-white font-medium"
            >
              <a href="#mima" onClick={() => { setIsOpen(false); setTimeout(() => window.dispatchEvent(new CustomEvent("mima:start")), 600) }}>{ctaLabel}</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

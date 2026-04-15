"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLang } from "@/app/providers"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { lang, setLang } = useLang()

  const navLinks = lang === "SR" 
    ? [
        { href: "#metodologija", label: "Metodologija" },
        { href: "#mima", label: "MIMA" },
        { href: "#za-koga", label: "Za koga" },
        { href: "#kontakt", label: "Kontakt" },
      ]
    : [
        { href: "#metodologija", label: "Methodology" },
        { href: "#mima", label: "MIMA" },
        { href: "#za-koga", label: "For whom" },
        { href: "#kontakt", label: "Contact" },
      ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#0D2137' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between" style={{ height: '72px' }}>
          <a href="#" className="flex-shrink-0">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nistor_logo_xl-zbxpcfuWG3WmrLy0zZxfAjm5tfRvSw.png"
              alt="NiStor"
              style={{ height: '72px', width: 'auto' }}
            />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', textDecoration: 'none' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <div style={{ display: 'flex', gap: '2px' }}>
              {(["SR", "EN"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    background: lang === l ? '#0D7377' : 'transparent',
                    color: lang === l ? '#fff' : 'rgba(255,255,255,0.4)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 10px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontWeight: lang === l ? '500' : '400',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
            <a
              href="#dijagnostika"
              style={{
                background: '#0D7377',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 18px',
                fontSize: '12px',
                fontWeight: '700',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              {lang === "SR" ? "Pokreni dijagnostiku" : "Start diagnostics"}
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2"
            style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div style={{ backgroundColor: '#0D2137', borderTop: '0.5px solid rgba(255,255,255,0.1)', padding: '16px' }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{ display: 'block', color: 'rgba(255,255,255,0.8)', padding: '10px 0', textDecoration: 'none', fontSize: '16px' }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
            {(["SR", "EN"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  background: lang === l ? '#0D7377' : 'transparent',
                  color: lang === l ? '#fff' : 'rgba(255,255,255,0.4)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <a
            href="#dijagnostika"
            onClick={() => setIsOpen(false)}
            style={{
              display: 'block',
              background: '#0D7377',
              color: '#fff',
              borderRadius: '6px',
              padding: '10px 18px',
              fontSize: '13px',
              textDecoration: 'none',
              textAlign: 'center',
              marginTop: '12px',
            }}
          >
            {lang === "SR" ? "Pokreni dijagnostiku" : "Start diagnostics"}
          </a>
        </div>
      )}
    </nav>
  )
}

"use client"
import { Linkedin } from "lucide-react"
import { useLang } from "@/app/providers"

const footerLinks = {
  SR: [
    { label: "Usluge", href: "#usluge" },
    { label: "Metodologija", href: "#metodologija" },
    { label: "Kontakt", href: "#kontakt" },
  ],
  EN: [
    { label: "Services", href: "#usluge" },
    { label: "Methodology", href: "#metodologija" },
    { label: "Contact", href: "#kontakt" },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/company/nistor", label: "LinkedIn" },
]

const t = {
  description: {
    SR: "Operativni konsalting za B2B kompanije koje žele da rastu kontrolisano.",
    EN: "Operational consulting for B2B companies that want to grow with control.",
  },
  location: { SR: "Novi Beograd, Srbija", EN: "Novi Beograd, Serbia" },
  quickLinks: { SR: "Brzi linkovi", EN: "Quick links" },
  connect: { SR: "Povežimo se", EN: "Get in touch" },
  rights: { SR: "Sva prava zadržana.", EN: "All rights reserved." },
  privacy: { SR: "Politika privatnosti", EN: "Privacy policy" },
  terms: { SR: "Uslovi korišćenja", EN: "Terms of use" },
}

export function Footer() {
  const { lang } = useLang()
  const currentYear = new Date().getFullYear()
  const links = footerLinks[lang]

  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">

          <div className="md:col-span-1">
            <a href="#" className="inline-block mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nistor_logo_xl-zbxpcfuWG3WmrLy0zZxfAjm5tfRvSw.png"
                alt="NiStor - Structure. Optimize. Grow Smartly."
                className="h-[56px] w-auto"
              />
            </a>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {t.description[lang]}
            </p>
            <p className="text-white/40 text-sm mt-2">
              📍 {t.location[lang]}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t.quickLinks[lang]}</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/60 hover:text-light-teal transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t.connect[lang]}</h4>
            <p className="text-white/60 text-sm mb-1">info@nistor.rs</p>
            <p className="text-white/60 text-sm mb-4">mima@nistor.rs</p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-teal transition-colors"
                >
                  <social.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} NiStor. {t.rights[lang]}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              {t.privacy[lang]}
            </a>
            <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              {t.terms[lang]}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

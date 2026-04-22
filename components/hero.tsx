"use client"
import { useLang } from "@/app/providers"

export function Hero() {
  const { lang } = useLang()
  return (
    <section className="relative bg-navy pt-16 lg:pt-20" style={{ padding: '60px 40px 0px' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-teal/20" />
      <div className="relative w-full">
        <div className="max-w-[900px] mx-auto text-center">
          <p 
            className="uppercase font-medium mb-4"
            style={{ color: '#0D7377', fontSize: '11px', letterSpacing: '2.5px' }}
          >
            AI COO · {lang === "SR" ? "Za mala i srednja preduzeća" : "For small and mid-size businesses"}
          </p>
          <h1 
            className="font-serif text-white leading-tight"
            style={{ fontSize: '48px', fontWeight: 400 }}
          >
            {lang === "SR" 
              ? "Firma staje kad Vi stanete." 
              : "Your business stops when you do."}
          </h1>
          <p
            className="text-white/70 mt-6"
            style={{ fontSize: '20px', lineHeight: '1.6' }}
          >
            {lang === "SR"
              ? "Svaki dan sa sistemom koji ne prati vaš rast košta novca, vremena i energije."
              : "Every day with a system that can't keep up with your growth costs money, time and energy."}
          </p>
        </div>
      </div>
    </section>
  )
}
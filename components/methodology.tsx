"use client"
import { useLang } from "@/app/providers"

const phasesSR = [
  {
    number: "01",
    title: "Skener",
    subtitle: "Dijagnostika",
    description: "Detaljna analiza vaših trenutnih procesa, alata i tima. Identifikujemo uska grla i prilike za poboljšanje.",
    emoji: "🔍",
    isMima: false,
  },
  {
    number: "02",
    title: "Arhitektura",
    subtitle: "Dizajn sistema",
    description: "Kreiramo nacrt optimizovanih procesa i tehnološke infrastrukture prilagođene vašim potrebama.",
    emoji: "🏗️",
    isMima: false,
  },
  {
    number: "03",
    title: "Stabilizacija",
    subtitle: "Implementacija",
    description: "Postepeno uvodimo promene uz minimalnu disrupciju. Obučavamo tim i pratimo rezultate.",
    emoji: "🛡️",
    isMima: false,
  },
  {
    number: "04",
    title: "MIMA — čuvar sistema",
    subtitle: "Kontinuitet",
    description: "MIMA postaje deo vašeg tima — prati operativu, javlja se kad treba i drži sistem u formi.",
    emoji: null,
    isMima: true,
  },
]

const phasesEN = [
  {
    number: "01",
    title: "Scanner",
    subtitle: "Diagnostics",
    description: "Deep analysis of your current processes, tools and team. We identify bottlenecks and opportunities.",
    emoji: "🔍",
    isMima: false,
  },
  {
    number: "02",
    title: "Architecture",
    subtitle: "System design",
    description: "We design optimized processes and a technology infrastructure tailored to your needs.",
    emoji: "🏗️",
    isMima: false,
  },
  {
    number: "03",
    title: "Stabilization",
    subtitle: "Implementation",
    description: "We introduce changes gradually with minimal disruption. We train your team and track results.",
    emoji: "🛡️",
    isMima: false,
  },
  {
    number: "04",
    title: "MIMA — system guardian",
    subtitle: "Continuity",
    description: "MIMA becomes part of your team — monitoring operations, flagging issues, keeping the system running.",
    emoji: null,
    isMima: true,
  },
]

export function Methodology() {
  const { lang } = useLang()
  const phases = lang === "SR" ? phasesSR : phasesEN

  return (
    <section id="metodologija" className="bg-navy" style={{ padding: '40px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <p className="text-light-teal font-medium text-sm uppercase tracking-wider mb-3">
            {lang === "SR" ? "Naš pristup" : "Our approach"}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 text-balance">
            {lang === "SR" ? "Četiri faze do operativne izvrsnosti" : "Four phases to operational excellence"}
          </h2>
          <p className="text-white/70 text-base lg:text-lg leading-relaxed">
            {lang === "SR" 
              ? "Metodologija razvijena kroz rad sa desetinama B2B kompanija u regionu."
              : "A methodology built through hands-on work with dozens of B2B companies across the region."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-teal/50 hover:bg-white/10 transition-all duration-300"
            >
              <span className="absolute top-6 right-6 text-4xl lg:text-5xl font-bold text-white/10 font-serif">
                {phase.number}
              </span>
              
              {phase.isMima ? (
                <div className="w-[52px] h-[52px] rounded-full border-[1.5px] border-teal overflow-hidden mb-5 group-hover:scale-110 transition-transform">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1771973866321-yfsQ8gDzKNdg5PALUQ5Hsxb1mshd7X.png"
                    alt="MIMA"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal to-light-teal flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <span className="text-[28px]">{phase.emoji}</span>
                </div>
              )}
              
              <div className="mb-1">
                <span className="text-light-teal text-xs font-medium uppercase tracking-wider">
                  {phase.subtitle}
                </span>
              </div>
              <h3 className="font-serif text-xl lg:text-2xl font-bold text-white mb-3">
                {phase.title}
              </h3>
              <p className="text-white/60 text-sm lg:text-base leading-relaxed">
                {phase.description}
              </p>

              {index < phases.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-teal/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
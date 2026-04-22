"use client"
import { useLang } from "@/app/providers"

const painPoints = {
  SR: [
    { emoji: "🔄", title: "Sve prolazi kroz Vas", description: "Tim čeka Vašu odluku pre svakog sledećeg koraka." },
    { emoji: "🔔", title: "Problemi kasne", description: "Saznajete kad je već nastala šteta, ne kada nastaje." },
    { emoji: "✈️", title: "Ne možete da odete", description: "Na odmoru ili van kancelarije — operativa staje." },
    { emoji: "📈", title: "Rast bez kontrole", description: "Više posla, ali ne i više jasnoće šta se stvarno dešava." },
  ],
  EN: [
    { emoji: "🔄", title: "Everything goes through you", description: "Your team waits for your decision before every next step." },
    { emoji: "🔔", title: "Problems arrive late", description: "You find out after the damage is done, not while it's happening." },
    { emoji: "✈️", title: "You can't step away", description: "On holiday or out of office — operations stop." },
    { emoji: "📈", title: "Growth without clarity", description: "More work, but no clearer picture of what's actually going on." },
  ],
}

const t = {
  badge: { SR: "Poznati problemi?", EN: "Sound familiar?" },
  heading: { SR: "Prepoznajete li ove izazove u svom poslovanju?", EN: "Do you recognize these challenges in your business?" },
  sub: { SR: "Ako ste rastuća B2B kompanija, verovatno se suočavate sa bar jednim od ovih problema.", EN: "If you're a growing B2B company, you're likely facing at least one of these." },
}

export function PainSection() {
  const { lang } = useLang()
  return (
    <section id="usluge" className="bg-white" style={{ padding: '40px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-teal font-medium text-sm uppercase tracking-wider mb-3">
            {t.badge[lang]}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4 text-balance">
            {t.heading[lang]}
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
            {t.sub[lang]}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints[lang].map((point, index) => (
            <div
              key={index}
              className="group bg-gray rounded-2xl p-6 lg:p-8 border border-transparent hover:border-teal/20 hover:shadow-lg transition-all duration-300"
            >
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{point.emoji}</div>
              <h3 className="font-serif text-lg lg:text-xl font-semibold text-navy mb-3">{point.title}</h3>
              <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
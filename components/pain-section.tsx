const painPoints = [
  {
    emoji: "🔄",
    title: "Sve prolazi kroz Vas",
    description: "Tim ceka Vasu odluku pre svakog sledeceg koraka",
  },
  {
    emoji: "🔔",
    title: "Problemi kasne",
    description: "Saznajete kad je vec nastala steta, ne kada nastaje",
  },
  {
    emoji: "✈️",
    title: "Ne mozete da odete",
    description: "Na odmoru ili van kancelarije — operativa staje",
  },
  {
    emoji: "📈",
    title: "Rast bez kontrole",
    description: "Vise posla, ali ne i vise jasnoce sta se stvarno desava",
  },
]

export function PainSection() {
  return (
    <section id="usluge" className="bg-white" style={{ padding: '40px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-teal font-medium text-sm uppercase tracking-wider mb-3">
            Poznati problemi?
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4 text-balance">
            Prepoznajete li ove izazove u svom poslovanju?
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
            Ako ste rastuca B2B kompanija, verovatno se suocavate sa bar jednim od ovih problema.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group bg-gray rounded-2xl p-6 lg:p-8 border border-transparent hover:border-teal/20 hover:shadow-lg transition-all duration-300"
            >
              {/* Emoji Icon */}
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>
                {point.emoji}
              </div>
              
              {/* Content */}
              <h3 className="font-serif text-lg lg:text-xl font-semibold text-navy mb-3">
                {point.title}
              </h3>
              <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-navy font-medium text-lg">
            Zvuci poznato?{" "}
            <a href="#kontakt" className="text-teal hover:text-teal/80 underline underline-offset-4 transition-colors">
              Razgovarajmo o resenju
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

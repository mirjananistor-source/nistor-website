const cards = [
  {
    emoji: "💡",
    title: "Osnovali ste firmu zbog ideja, ne zbog operacije",
    text: "Vase vreme i energija treba da idu na rast i nove prilike — ne na koordinaciju tima i pracenje zadataka.",
  },
  {
    emoji: "📊",
    title: "Posao raste, ali osecate da gubite pregled",
    text: "Vise klijenata, vise zaposlenih — ali manje jasnoce sta se stvarno desava. Brojke postoje, ali ne govore nista.",
  },
  {
    emoji: "⚡",
    title: "Spremni ste da gradite sistem, ne samo da gasite pozare",
    text: "Ne trazite jos jedan alat. Trazite nekoga ko ce da preuzme operativu i dovede stvari u red — jednom zauvek.",
  },
]

export function ZaKoga() {
  return (
    <section id="za-koga" className="bg-white" style={{ padding: '40px' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p 
            className="uppercase font-medium mb-3"
            style={{ 
              color: '#0D7377', 
              fontSize: '10px',
              letterSpacing: '1px'
            }}
          >
            Za koga je NiStor?
          </p>
          <h2 
            className="font-serif"
            style={{ 
              color: '#0D2137',
              fontSize: '26px',
              fontWeight: 400
            }}
          >
            Pravi izbor za vlasnike koji zele da firma radi bez njih.
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-[14px]">
          {cards.map((card, index) => (
            <div
              key={index}
              className="rounded-[10px]"
              style={{ 
                backgroundColor: '#F7F8FA',
                border: '0.5px solid #E8E8E8',
                padding: '20px 16px'
              }}
            >
              {/* Emoji */}
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>
                {card.emoji}
              </div>
              
              {/* Title */}
              <h3 
                className="font-sans mb-2"
                style={{ 
                  color: '#0D2137',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                {card.title}
              </h3>
              
              {/* Text */}
              <p 
                className="font-sans"
                style={{ 
                  color: '#888',
                  fontSize: '12px',
                  lineHeight: 1.6
                }}
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

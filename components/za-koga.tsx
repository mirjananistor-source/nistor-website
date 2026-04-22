"use client"
import { useLang } from "@/app/providers"

const cards = {
  SR: [
    {
      emoji: "💡",
      title: "Osnovali ste firmu zbog ideja, ne zbog operacije",
      text: "Vaše vreme i energija treba da idu na rast i nove prilike — ne na koordinaciju tima i praćenje zadataka.",
    },
    {
      emoji: "📊",
      title: "Posao raste, ali osećate da gubite pregled",
      text: "Više klijenata, više zaposlenih — ali manje jasnoće šta se stvarno dešava. Brojke postoje, ali ne govore ništa.",
    },
    {
      emoji: "⚡",
      title: "Spremni ste da gradite sistem, ne samo da gasite požare",
      text: "Ne tražite još jedan alat. Tražite nekoga ko će da preuzme operativu i dovede stvari u red — jednom zauvek.",
    },
  ],
  EN: [
    {
      emoji: "💡",
      title: "You started the business for the ideas, not the operations",
      text: "Your time and energy should go toward growth and new opportunities — not team coordination and task tracking.",
    },
    {
      emoji: "📊",
      title: "Business is growing, but you're losing visibility",
      text: "More clients, more staff — but less clarity on what's actually happening. The numbers exist, but they say nothing.",
    },
    {
      emoji: "⚡",
      title: "You're ready to build a system, not just fight fires",
      text: "You're not looking for another tool. You want someone to take ownership of operations and bring order — once and for all.",
    },
  ],
}

const t = {
  badge: { SR: "NiStor nije za svakoga. Je li za vas?", EN: "NiStor isn't for everyone. Is it for you?" },
  heading: {
    SR: "Pravi izbor za vlasnike koji žele da firma radi bez njih.",
    EN: "The right choice for owners who want the business to run without them.",
  },
}

export function ZaKoga() {
  const { lang } = useLang()
  const currentCards = cards[lang]

  return (
    <section id="za-koga" className="bg-white" style={{ padding: '40px' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="uppercase font-medium mb-3" style={{ color: '#0D7377', fontSize: '10px', letterSpacing: '1px' }}>
            {t.badge[lang]}
          </p>
          <h2 className="font-serif" style={{ color: '#0D2137', fontSize: '26px', fontWeight: 400 }}>
            {t.heading[lang]}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-[14px]">
          {currentCards.map((card, index) => (
            <div key={index} className="rounded-[10px]" style={{ backgroundColor: '#F7F8FA', border: '0.5px solid #E8E8E8', padding: '20px 16px' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{card.emoji}</div>
              <h3 className="font-sans mb-2" style={{ color: '#0D2137', fontSize: '14px', fontWeight: 500 }}>{card.title}</h3>
              <p className="font-sans" style={{ color: '#888', fontSize: '12px', lineHeight: 1.6 }}>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

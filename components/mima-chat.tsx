"use client"
import { useState } from "react"
import { useLang } from "@/app/providers"
import { MimaSurvey } from "./mima-survey"

const MIMA_AVATAR = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1771973866321-yfsQ8gDzKNdg5PALUQ5Hsxb1mshd7X.png"

const t = {
  badge: { SR: "MIMA · AI COO", EN: "MIMA · AI COO" },
  heading: { SR: "Testirajte MIMU — 5 minuta, bez registracije.", EN: "Try MIMA — 5 minutes, no registration." },
  sub: { SR: "Odgovorite na nekoliko pitanja i dobijte inicijalni uvid u operativno zdravlje vaše firme.", EN: "Answer a few questions and get an initial insight into your company's operational health." },
  leftLabel: { SR: "Primer jutarnjeg pregleda", EN: "Sample morning briefing" },
  rightTitle: { SR: "Razgovaraj sa MIMOM", EN: "Talk to MIMA" },
  active: { SR: "aktivna", EN: "active" },
  briefing: { SR: "Jutarnji brifing:", EN: "Morning briefing:" },
  item1label: { SR: "Kasni · 2 dana", EN: "Late · 2 days" },
  item1text: { SR: "\"Dobavljač nije potvrdio isporuku — kupac čeka od petka\"", EN: "\"Supplier hasn't confirmed delivery — client waiting since Friday\"" },
  item1who: { SR: "Marko P.", EN: "Marko P." },
  item2label: { SR: "Kasni · 1 dan", EN: "Late · 1 day" },
  item2text: { SR: "\"Nedeljni izveštaj prodaje još nije stigao\"", EN: "\"Weekly sales report hasn't arrived yet\"" },
  item2who: { SR: "Ana M.", EN: "Ana M." },
  item3label: { SR: "Rizik · prijavljeno jutros", EN: "Risk · reported this morning" },
  item3text: { SR: "\"Ključni zaposleni razmišlja o odlasku — isporuka može da stane\"", EN: "\"Key employee considering leaving — delivery may stop\"" },
  item3who: { SR: "Hitno", EN: "Urgent" },
  q: { SR: "Šta je najhitnije?", EN: "What's most urgent?" },
  reply: { SR: "Marko — kupac čeka od petka, svaki dan bez odgovora ostavlja loš utisak. Već sam mu poslala poruku jutros. Čekam odgovor do 10h.", EN: "Marko — the client has been waiting since Friday, every day without a response damages trust. I already sent him a message this morning. Awaiting reply by 10am." },
  replyStatus: { SR: "Pratim — javim čim stignem povratnu informaciju", EN: "Monitoring — will update you as soon as I hear back" },
  waitUpdate: { SR: "Čekam Vaš update do 14h — šta da zatvorim danas?", EN: "Waiting for your update by 2pm — what should I close today?" },
}

export function MimaChat() {
  const { lang } = useLang()
  const [chatStarted, setChatStarted] = useState(false)

  return (
    <section id="mima" className="bg-gray" style={{ padding: '32px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-teal font-medium text-sm uppercase tracking-wider mb-2">
            {t.badge[lang]}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-3">
            {t.heading[lang]}
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            {t.sub[lang]}
          </p>
        </div>

        <div className={`max-w-5xl mx-auto gap-6 ${chatStarted ? "flex flex-col" : "grid lg:grid-cols-2"}`}>

          {/* Left Column — hidden when chat starts */}
          {!chatStarted && (
            <div className="rounded-[14px] overflow-hidden" style={{ backgroundColor: '#0D2137', border: '1px solid rgba(13,115,119,0.4)' }}>
              <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: '#0B1929' }}>
                <div className="w-8 h-8 rounded-full border-[1.5px] border-teal overflow-hidden">
                  <img src={MIMA_AVATAR} alt="MIMA" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-sm">MIMA</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-white/60 text-xs">{t.active[lang]}</span>
                </div>
              </div>

              <div className="p-4 space-y-4" style={{ backgroundColor: '#0D2137' }}>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full border border-teal overflow-hidden flex-shrink-0 mt-1">
                    <img src={MIMA_AVATAR} alt="MIMA" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm p-4 max-w-md" style={{ backgroundColor: '#0D2A3E' }}>
                    <p className="text-white font-semibold text-sm mb-3">{t.briefing[lang]}</p>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 flex-shrink-0">!</span>
                        <div>
                          <span className="text-red-400 font-medium">{t.item1label[lang]}</span>
                          <span className="text-white/50"> — </span>
                          <span className="text-white/90">{t.item1text[lang]}</span>
                          <span className="text-white/50"> — {t.item1who[lang]}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 flex-shrink-0">!</span>
                        <div>
                          <span className="text-red-400 font-medium">{t.item2label[lang]}</span>
                          <span className="text-white/50"> — </span>
                          <span className="text-white/90">{t.item2text[lang]}</span>
                          <span className="text-white/50"> — {t.item2who[lang]}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-yellow-500 flex-shrink-0">*</span>
                        <div>
                          <span className="text-orange-400 font-medium">{t.item3label[lang]}</span>
                          <span className="text-white/50"> — </span>
                          <span className="text-white/90">{t.item3text[lang]}</span>
                          <span className="text-white/50"> — {t.item3who[lang]}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-white/90 mt-4 text-sm">{t.waitUpdate[lang]}</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="rounded-2xl rounded-tr-sm px-4 py-2 max-w-xs" style={{ backgroundColor: '#0D7377' }}>
                    <p className="text-white text-sm">{t.q[lang]}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full border border-teal overflow-hidden flex-shrink-0 mt-1">
                    <img src={MIMA_AVATAR} alt="MIMA" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm p-4 max-w-md" style={{ backgroundColor: '#0D2A3E' }}>
                    <p className="text-white/90 text-sm mb-3">{t.reply[lang]}</p>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      <p className="text-white/50 text-sm italic">{t.replyStatus[lang]}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-[10px] border-t border-white/10 text-center" style={{ backgroundColor: '#0D2137' }}>
                <p className="italic" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>
                  {t.leftLabel[lang]}
                </p>
              </div>
            </div>
          )}

          {/* Right Column — full width when chat starts */}
          <div
            className="rounded-[14px] overflow-hidden flex flex-col"
            style={{
              backgroundColor: '#0D2137',
              border: '1px solid rgba(13,115,119,0.4)',
              maxWidth: chatStarted ? '760px' : undefined,
              margin: chatStarted ? '0 auto' : undefined,
              width: '100%'
            }}
          >
            <div className="flex items-center gap-[10px] px-4 py-3" style={{ backgroundColor: '#0B1929' }}>
              <div className="w-[30px] h-[30px] rounded-full border-[1.5px] border-teal overflow-hidden">
                <img src={MIMA_AVATAR} alt="MIMA" className="w-full h-full object-cover" />
              </div>
              <span className="text-white text-[13px] font-medium">{t.rightTitle[lang]}</span>
              <div className="flex items-center gap-1 ml-auto">
                <span className={`w-[6px] h-[6px] rounded-full ${chatStarted ? "bg-green-500" : "bg-orange-400"}`} />
                {chatStarted && <span className="text-teal text-[11px] font-medium">{t.active[lang]}</span>}
              </div>
            </div>
            <MimaSurvey onStart={() => setChatStarted(true)} />
          </div>

        </div>
      </div>
    </section>
  )
}

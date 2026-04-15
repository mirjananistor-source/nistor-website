const MIMA_AVATAR = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1771973866321-yfsQ8gDzKNdg5PALUQ5Hsxb1mshd7X.png"

export function MimaChat() {
  return (
    <section id="mima" className="bg-gray" style={{ padding: '40px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <p className="text-teal font-medium text-sm uppercase tracking-wider mb-3">
            MIMA · AI COO
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4 text-balance">
            Vas operativni asistent koji nikad ne spava.
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
            MIMA prati vasu operativu 24/7 i javlja se kad treba da reagujete.
          </p>
        </div>

        {/* Two Column Chat Layout */}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* Left Column - Existing Chat Mockup */}
          <div 
            className="rounded-[14px] overflow-hidden"
            style={{ 
              backgroundColor: '#0D2137',
              border: '1px solid rgba(13,115,119,0.4)'
            }}
          >
            {/* Chat Header */}
            <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: '#0B1929' }}>
              <div className="w-8 h-8 rounded-full border-[1.5px] border-teal overflow-hidden">
                <img 
                  src={MIMA_AVATAR}
                  alt="MIMA"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-sm">MIMA</span>
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-white/60 text-xs">aktivna</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 space-y-4" style={{ backgroundColor: '#0D2137' }}>
              {/* MIMA Morning Brief */}
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full border border-teal overflow-hidden flex-shrink-0 mt-1">
                  <img 
                    src={MIMA_AVATAR}
                    alt="MIMA"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl rounded-tl-sm p-4 max-w-md" style={{ backgroundColor: '#0D2A3E' }}>
                  <p className="text-white font-semibold text-sm mb-3">Jutarnji brifing:</p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-amber-500 flex-shrink-0">!</span>
                      <div>
                        <span className="text-red-400 font-medium">Kasni · 2 dana</span>
                        <span className="text-white/50"> — </span>
                        <span className="text-white/90">{'"'}Dobavljac nije potvrdio isporuku — kupac ceka od petka{'"'}</span>
                        <span className="text-white/50"> — Marko P.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-amber-500 flex-shrink-0">!</span>
                      <div>
                        <span className="text-red-400 font-medium">Kasni · 1 dan</span>
                        <span className="text-white/50"> — </span>
                        <span className="text-white/90">{'"'}Nedeljni izvestaj prodaje jos nije stigao{'"'}</span>
                        <span className="text-white/50"> — Ana M.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-500 flex-shrink-0">*</span>
                      <div>
                        <span className="text-orange-400 font-medium">Rizik · prijavljeno jutros</span>
                        <span className="text-white/50"> — </span>
                        <span className="text-white/90">{'"'}Kljucni zaposleni razmislja o odlasku — isporuka moze da stane{'"'}</span>
                        <span className="text-white/50"> — Hitno</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/90 mt-4 text-sm">
                    Cekam Vas update do 14h — sta da zatvorim danas?
                  </p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-tr-sm px-4 py-2 max-w-xs" style={{ backgroundColor: '#0D7377' }}>
                  <p className="text-white text-sm">Sta je najhitnije?</p>
                </div>
              </div>

              {/* MIMA Reply */}
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full border border-teal overflow-hidden flex-shrink-0 mt-1">
                  <img 
                    src={MIMA_AVATAR}
                    alt="MIMA"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl rounded-tl-sm p-4 max-w-md" style={{ backgroundColor: '#0D2A3E' }}>
                  <p className="text-white/90 text-sm mb-3">
                    Marko — kupac ceka od petka, svaki dan bez odgovora ostavlja los utisak. Vec sam mu poslala poruku jutros. Cekam odgovor do 10h.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <p className="text-white/50 text-sm italic">
                      Pratim — javim cim stignem povratnu informaciju
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Label */}
            <div className="p-[10px] border-t border-white/10 text-center" style={{ backgroundColor: '#0D2137' }}>
              <p className="italic" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>
                Primer jutarnjeg pregleda
              </p>
            </div>
          </div>

          {/* Right Column - Live Chat Area (Locked) */}
          <div 
            className="rounded-[14px] overflow-hidden flex flex-col"
            style={{ 
              backgroundColor: '#0D2137',
              border: '1px solid rgba(13,115,119,0.4)'
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-[10px] px-4 py-3" style={{ backgroundColor: '#0B1929' }}>
              <div className="w-[30px] h-[30px] rounded-full border-[1.5px] border-teal overflow-hidden">
                <img 
                  src={MIMA_AVATAR}
                  alt="MIMA"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white text-[13px] font-medium">Razgovaraj sa MIMOM</span>
              <div className="flex items-center gap-1 ml-auto">
                <span className="w-[5px] h-[5px] bg-green-500 rounded-full" />
                <span className="text-teal text-[10px]">aktivna</span>
              </div>
            </div>

            {/* Empty Messages Area */}
            <div className="flex-1 flex flex-col items-center justify-center gap-3 p-5 min-h-[280px]">
              <div className="w-[56px] h-[56px] rounded-full border-[1.5px] border-teal overflow-hidden">
                <img 
                  src={MIMA_AVATAR}
                  alt="MIMA"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white text-[14px] font-medium text-center">
                Otkljucajte razgovor sa MIMOM
              </p>
              <p className="text-white/45 text-[12px] text-center max-w-[220px] leading-[1.6]">
                Popunite dijagnostiku i dobijte personalizovani PDF — razgovor se otvara na osnovu Vasih nalaza.
              </p>
            </div>

            {/* Bottom Input Area */}
            <div className="border-t border-white/[0.07] p-[14px] space-y-3">
              <input 
                type="text"
                disabled
                placeholder="Aktivirajte chat kroz dijagnostiku..."
                className="w-full bg-white/5 border border-white/15 rounded-lg px-[14px] py-[10px] text-white/30 text-[12px] cursor-not-allowed placeholder:text-white/30"
              />
              <a 
                href="#dijagnostika"
                className="block w-full bg-teal hover:bg-teal/90 text-white text-center text-[12px] font-medium py-[10px] rounded-[7px] transition-colors"
              >
                Pokreni dijagnostiku — besplatno
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"
import { useLang } from "@/app/providers"

export function About() {
  const { lang } = useLang()

  return (
    <section className="bg-navy py-20" style={{ padding: '80px 40px' }}>
      <div className="max-w-[780px] mx-auto">
        <p
          className="uppercase font-medium mb-6"
          style={{ color: '#0D7377', fontSize: '11px', letterSpacing: '2.5px' }}
        >
          {lang === "SR" ? "O nama" : "About us"}
        </p>

        {lang === "SR" ? (
          <div className="space-y-5 text-white/75" style={{ fontSize: '17px', lineHeight: '1.8' }}>
            <p>
              NiStor je nastao kao odgovor na jaz između velikih sistema i malih firmi.
            </p>
            <p>
              Veliki sistemi imaju strukturu, procese i kontrolu. Male firme imaju energiju i brzinu — ali često bez sistema koji to drži.
            </p>
            <p>
              Mi spajamo ta dva sveta. Višedecenijsko iskustvo u korporativnom, državnom i privatnom sektoru dalo nam je uvid u to šta zaista funkcioniše — i gde svaki od tih sistema zapinje.
            </p>
            <p>
              Uzimamo principe koji funkcionišu u velikim organizacijama i prilagođavamo ih realnosti malih i srednjih preduzeća: jasna odgovornost, kratke operativne forme, brze odluke.
            </p>
            <p className="text-white/90 font-medium">
              Bez viška administracije. Bez usporavanja.
            </p>
          </div>
        ) : (
          <div className="space-y-5 text-white/75" style={{ fontSize: '17px', lineHeight: '1.8' }}>
            <p>
              NiStor was built to bridge the gap between large systems and small businesses.
            </p>
            <p>
              Large organizations have structure, processes and control. Small businesses have energy and speed — but often without the system to sustain it.
            </p>
            <p>
              We connect those two worlds. Decades of experience across corporate, public and private sectors gave us insight into what actually works — and where each system breaks down.
            </p>
            <p>
              We take the principles that work in large organizations and adapt them to the reality of small and mid-size businesses: clear accountability, short operational forms, fast decisions.
            </p>
            <p className="text-white/90 font-medium">
              No excess administration. No slowdowns.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

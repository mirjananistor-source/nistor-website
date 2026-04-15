import { Mail, ArrowUpRight } from "lucide-react"
import { useLang } from "@/app/providers"

const contacts = [
  {
    label: { SR: "Opšte informacije", EN: "General inquiries" },
    email: "info@nistor.rs",
    sub: { SR: "Pitanja i saradnja", EN: "Questions and partnerships" },
    hasTealBorder: false,
  },
  {
    label: { SR: "AI COO · MIMA", EN: "AI COO · MIMA" },
    email: "mima@nistor.rs",
    sub: { SR: "Direktno MIMI", EN: "Directly to MIMA" },
    hasTealBorder: true,
  },
]

export function Contact() {
  const { lang } = useLang()
  return (
    <section id="kontakt" className="bg-white" style={{ padding: '40px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-teal font-medium text-sm uppercase tracking-wider mb-3">
            {lang === "SR" ? "Kontakt" : "Contact"}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4 text-balance">
            {lang === "SR" ? "Razgovarajmo." : "Let's talk."}
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            {lang === "SR" 
              ? "Imate pitanje ili ste već spremni za Skener? Dostupni smo." 
              : "Have a question or ready for the Scanner? We're available."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={`mailto:${contact.email}`}
              className={`group bg-gray rounded-2xl p-6 border-2 hover:shadow-xl transition-all duration-300 ${
                contact.hasTealBorder 
                  ? "border-teal" 
                  : "border-transparent hover:border-teal/30"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center group-hover:bg-teal group-hover:scale-110 transition-all">
                  <Mail className="w-6 h-6 text-teal group-hover:text-white transition-colors" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-teal transition-colors" />
              </div>
              <h3 className="font-medium text-lg text-navy mb-1">
                {contact.label[lang]}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                {contact.sub[lang]}
              </p>
              <p className="text-navy font-medium group-hover:text-teal transition-colors">
                {contact.email}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

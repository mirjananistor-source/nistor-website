export const dynamic = "force-dynamic"

import { Navbar } from "../components/navbar"
import { Hero } from "../components/hero"
// dodaj kasnije redom ostale sekcije
// import { VideoSection } from "../components/video-section"
// import { PainSection } from "../components/pain-section"
// import { Methodology } from "../components/methodology"
// import { ZaKoga } from "../components/za-koga"
// import { Contact } from "../components/contact"
// import { Footer } from "../components/footer"
// import { MimaChat } from "../components/mima-chat"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* OSTALO dodajemo posle, jednu po jednu */}
      {/* <VideoSection /> */}
      {/* <PainSection /> */}
      {/* <Methodology /> */}
      {/* <ZaKoga /> */}
      {/* <MimaChat /> */}
      {/* <Contact /> */}
      {/* <Footer /> */}
    </main>
  )
}

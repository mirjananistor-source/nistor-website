import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { VideoSection } from "@/components/video-section"
import { PainSection } from "@/components/pain-section"
import { MimaChat } from "@/components/mima-chat"
import { ZaKoga } from "@/components/za-koga"
import { Methodology } from "@/components/methodology"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <VideoSection />
      <PainSection />
      <MimaChat />
      <ZaKoga />
      <Methodology />
      <Footer />
    </main>
  )
}
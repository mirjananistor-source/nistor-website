"use client"

import { Navbar } from "./navbar"
import { Hero } from "./hero"
import { VideoSection } from "./video-section"
import { PainSection } from "./pain-section"
import { MimaChat } from "./mima-chat"
import { ZaKoga } from "./za-koga"
import { Methodology } from "./methodology"
import { About } from "./about"
import { Contact } from "./contact"
import { Footer } from "./footer"

export default function HomeClient() {
  return (
    <main>
      <Navbar />
      <Hero />
      <VideoSection />
      <PainSection />
      <MimaChat />
      <ZaKoga />
      <Methodology />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}

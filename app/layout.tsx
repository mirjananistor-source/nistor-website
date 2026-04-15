import type { Metadata, Viewport } from "next"
import { Providers } from "./providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "NiStor | Operativni konsalting za mala i srednja preduzeca",
  description: "NiStor je srpska B2B konsalting kompanija. Vas proizvod zasluzuje operativu koja ga prati.",
  keywords: ["operativni konsalting", "B2B", "Srbija", "poslovni procesi"],
}

export const viewport: Viewport = {
  themeColor: "#0D2137",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr" className="scroll-smooth">
      <body className="antialiased" style={{ fontFamily: "Arial, Helvetica, sans-serif", backgroundColor: "#ffffff", color: "#0D2137" }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

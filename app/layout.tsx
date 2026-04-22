import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/app/providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'NiStor | Operativni konsalting za B2B kompanije',
  description: 'NiStor je srpska B2B konsalting kompanija specijalizovana za operativne procese. Vaš proizvod zaslužuje operativu koja ga prati.',
  keywords: ['operativni konsalting', 'B2B', 'Srbija', 'poslovni procesi', 'optimizacija'],
}

export const viewport: Viewport = {
  themeColor: '#0B1929',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sr" className="scroll-smooth">
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}


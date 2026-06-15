import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import ClientEffects from '@/components/ClientEffects'

export const metadata: Metadata = {
  title: 'Candron Energy Inc. | Canadian Power Distribution Equipment',
  description: 'Engineered, manufactured, assembled, and tested entirely in-house. Factory-direct switchgear, switchboards, and control panels built in Canada.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ClientEffects />
      </body>
    </html>
  )
}

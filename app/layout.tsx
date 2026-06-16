import type { Metadata } from 'next'
import { Orbitron, Chakra_Petch, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import ClientEffects from '@/components/ClientEffects'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--fd',
  display: 'swap',
  weight: ['400', '600', '700', '900'],
})

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  variable: '--ft',
  display: 'swap',
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--fb',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--fm',
  display: 'swap',
  weight: ['400', '600'],
})

const fontVars = [orbitron.variable, chakraPetch.variable, dmSans.variable, jetbrainsMono.variable].join(' ')

export const metadata: Metadata = {
  title: {
    default: 'Candron Energy Inc. | Canadian Power Distribution Equipment',
    template: '%s | Candron Energy Inc.',
  },
  description: 'Factory-direct switchgear, switchboards, and control panels engineered, manufactured, and tested entirely in-house. 24/7 emergency response across North America.',
  keywords: ['switchgear', 'switchboards', 'control panels', 'power distribution', 'electrical equipment', 'Canadian manufacturer', 'North York Ontario'],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'Candron Energy Inc.',
    title: 'Candron Energy Inc. | Canadian Power Distribution Equipment',
    description: 'Factory-direct switchgear, switchboards, and control panels engineered, manufactured, and tested entirely in-house. 24/7 emergency response across North America.',
    images: [{ url: '/images/Switchgear.jpg.jpeg', width: 1200, height: 630, alt: 'Candron Energy Inc. — Power Distribution Equipment' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Candron Energy Inc. | Canadian Power Distribution Equipment',
    description: 'Factory-direct switchgear, switchboards, and control panels. Built in Canada. 24/7 emergency response.',
    images: ['/images/Switchgear.jpg.jpeg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
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

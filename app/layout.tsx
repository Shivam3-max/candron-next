import type { Metadata } from 'next'
import { Orbitron, Chakra_Petch, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import 'flag-icons/css/flag-icons.min.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ClientEffects from '@/components/ClientEffects'
import BackToTop from '@/components/BackToTop'

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
  metadataBase: new URL('https://candron.com'),
  title: {
    default: 'CANDRON Energy Inc. | Canadian Power Distribution Equipment',
    template: '%s | CANDRON Energy Inc.',
  },
  description: 'Custom-engineered switchgear, switchboards, and control panels — manufactured and tested entirely in-house. Every customer can reach our team directly.',
  keywords: ['switchgear', 'switchboards', 'control panels', 'power distribution', 'electrical equipment', 'Canadian manufacturer', 'Toronto Ontario'],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '96x96' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'CANDRON Energy Inc.',
    title: 'CANDRON Energy Inc. | Canadian Power Distribution Equipment',
    description: 'Custom-engineered switchgear, switchboards, and control panels — manufactured and tested entirely in-house. Every customer can reach our team directly.',
    images: [{ url: '/images/switchgear.jpg', width: 1200, height: 630, alt: 'CANDRON Energy Inc. — Power Distribution Equipment' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CANDRON Energy Inc. | Canadian Power Distribution Equipment',
    description: 'Custom-engineered switchgear, switchboards, and control panels. Built in Canada. Any customer can reach our team directly.',
    images: ['/images/switchgear.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CANDRON Energy Inc.',
    url: 'https://candron.com',
    logo: 'https://candron.com/images/candronpng.png',
  }

  return (
    <html lang="en" className={fontVars}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <ClientEffects />
      </body>
    </html>
  )
}

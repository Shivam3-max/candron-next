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
    default: 'Toronto Power Equipment Manufacturer | CANDRON',
    template: '%s | CANDRON Energy Inc.',
  },
  description: 'CANDRON is a leading Toronto manufacturer of switchgear, switchboards, and dry-type transformers, delivering reliable power distribution equipment with shorter lead times.',
  keywords: ['Toronto power equipment manufacturer', 'Toronto switchgear manufacturer', 'Toronto switchboard manufacturer', 'dry-type transformer manufacturer', 'power distribution equipment', 'Canadian electrical equipment manufacturer', 'switchgear', 'switchboards', 'Toronto Ontario'],
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
    title: 'Toronto Power Equipment Manufacturer | CANDRON',
    description: 'A leading Toronto manufacturer of switchgear, switchboards, and dry-type transformers for power distribution projects across North America.',
    images: [{ url: '/images/switchgear.jpg', width: 1200, height: 630, alt: 'CANDRON Energy Inc. — Power Distribution Equipment' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toronto Power Equipment Manufacturer | CANDRON',
    description: 'A leading Toronto manufacturer of switchgear, switchboards, and dry-type transformers for power distribution projects across North America.',
    images: ['/images/switchgear.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': 'https://candron.com/#organization',
        name: 'CANDRON Energy Inc.',
        alternateName: 'CANDRON',
        url: 'https://candron.com',
        logo: 'https://candron.com/images/candronpng.png',
        image: 'https://candron.com/images/switchgear.jpg',
        description: 'A leading Toronto-based manufacturer of switchgear, switchboards, dry-type transformers, and engineered power distribution equipment.',
        telephone: '+1-647-616-2595',
        email: 'sales@candron.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Toronto',
          addressRegion: 'Ontario',
          addressCountry: 'CA',
        },
        areaServed: [
          { '@type': 'Country', name: 'Canada' },
          { '@type': 'Country', name: 'United States' },
        ],
        knowsAbout: ['Switchgear', 'Switchboards', 'Dry-Type Transformers', 'Power Distribution Equipment'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://candron.com/#website',
        url: 'https://candron.com',
        name: 'CANDRON Energy Inc.',
        alternateName: 'CANDRON',
        publisher: { '@id': 'https://candron.com/#organization' },
        inLanguage: 'en-CA',
      },
    ],
  }

  return (
    <html lang="en" className={fontVars}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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

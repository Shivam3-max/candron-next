import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Switchgear Manufacturer | MV & LV Switchgear',
  description: 'CANDRON manufactures custom MV switchgear from 2.4–38 kV and up to 2000 A, plus LV switchgear up to 6000 A. Metal-clad, metal-enclosed, pad-mounted, and service-entrance configurations built in Toronto.',
  alternates: {
    canonical: '/products/switchgear',
  },
  openGraph: {
    title: 'MV & LV Switchgear Manufacturer | CANDRON',
    description: 'One complete switchgear range: MV from 2.4–38 kV and up to 2000 A, plus LV systems up to 6000 A, engineered and manufactured in Toronto.',
    url: '/products/switchgear',
    images: [{ url: '/images/switchgear.jpg', width: 1200, height: 630, alt: 'CANDRON medium- and low-voltage switchgear' }],
  },
}

export default function SwitchgearLayout({ children }: { children: React.ReactNode }) {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://candron.com/products/switchgear#page',
    name: 'CANDRON Medium- and Low-Voltage Switchgear',
    description: 'Custom medium-voltage switchgear from 2.4 kV to 38 kV and up to 2000 A, plus low-voltage switchgear up to 6000 A.',
    url: 'https://candron.com/products/switchgear',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: 'https://candron.com/images/switchgear.jpg',
    },
    isPartOf: {
      '@id': 'https://candron.com/#website',
    },
    about: ['Medium-voltage switchgear', 'Low-voltage switchgear', 'Metal-clad switchgear', 'Pad-mounted switchgear'],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      {children}
    </>
  )
}

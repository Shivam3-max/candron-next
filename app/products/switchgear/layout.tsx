// Pages under /products/switchgear set their own metadata; this layout only adds structured data.

export default function SwitchgearLayout({ children }: { children: React.ReactNode }) {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://candron.com/products/switchgear#page',
    name: 'CANDRON Medium-Voltage Switchgear',
    description: 'Custom medium-voltage switchgear from 2.4 kV to 38 kV and up to 3,000 A: metal-clad, arc-resistant, metal-enclosed and pad-mounted.',
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

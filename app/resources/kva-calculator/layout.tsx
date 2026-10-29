import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import RelatedArticles from '@/components/blog/RelatedArticles'
import { SITE, breadcrumbLd, pageMeta } from '@/lib/seo'

const PATH = '/resources/kva-calculator'

// The page is a client component, so its metadata, structured data and related articles live here
export const metadata: Metadata = pageMeta({
  title: 'Transformer kVA Calculator — Single & Three-Phase',
  description: 'Free transformer sizing calculator: solve for kVA, volts or amps on single-phase and three-phase systems, then round up to the next standard transformer size.',
  path: PATH,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[
        breadcrumbLd([{ name: 'Resources', href: '/resources' }, { name: 'Transformer kVA Calculator', href: PATH }]),
        { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Transformer kVA Calculator', url: `${SITE}${PATH}`, applicationCategory: 'EngineeringApplication', operatingSystem: 'Any', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' } },
      ]} />
      {children}
      <RelatedArticles path={PATH} title="Related guides" />
    </>
  )
}

import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import RelatedArticles from '@/components/blog/RelatedArticles'
import { SITE, breadcrumbLd, pageMeta } from '@/lib/seo'

const PATH = '/resources/savings-payback-calculator'

// The page is a client component, so its metadata, structured data and related articles live here
export const metadata: Metadata = pageMeta({
  title: 'Transformer Energy Savings & Payback Calculator',
  description: 'Compare two transformers by annual losses, energy cost, CO₂ and simple payback, to justify a high-efficiency or lower-loss unit.',
  path: PATH,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[
        breadcrumbLd([{ name: 'Resources', href: '/resources' }, { name: 'Savings & Payback Calculator', href: PATH }]),
        { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Savings & Payback Calculator', url: `${SITE}${PATH}`, applicationCategory: 'EngineeringApplication', operatingSystem: 'Any', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' } },
      ]} />
      {children}
      <RelatedArticles path={PATH} title="Related guides" />
    </>
  )
}

import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import RelatedArticles from '@/components/blog/RelatedArticles'
import { SITE, breadcrumbLd, pageMeta } from '@/lib/seo'

const PATH = '/resources/hp-kva-calculator'

// The page is a client component, so its metadata, structured data and related articles live here
export const metadata: Metadata = pageMeta({
  title: 'HP to kVA Calculator for Motor Transformers',
  description: 'Convert motor horsepower to kVA using efficiency and power factor, to size the transformer feeding a motor or a group of motors.',
  path: PATH,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[
        breadcrumbLd([{ name: 'Resources', href: '/resources' }, { name: 'HP to kVA Calculator', href: PATH }]),
        { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'HP to kVA Calculator', url: `${SITE}${PATH}`, applicationCategory: 'EngineeringApplication', operatingSystem: 'Any', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' } },
      ]} />
      {children}
      <RelatedArticles path={PATH} title="Related guides" />
    </>
  )
}

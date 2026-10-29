import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import RelatedArticles from '@/components/blog/RelatedArticles'
import { SITE, breadcrumbLd, pageMeta } from '@/lib/seo'

const PATH = '/resources/harmonic-reactor-calculator'

// The page is a client component, so its metadata, structured data and related articles live here
export const metadata: Metadata = pageMeta({
  title: 'Line Reactor Sizing Calculator for VFDs',
  description: 'Size a line reactor for a VFD: rated current, inductance in mH for 3% or 5% impedance, and the expected reduction in current distortion.',
  path: PATH,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[
        breadcrumbLd([{ name: 'Resources', href: '/resources' }, { name: 'Line Reactor Calculator', href: PATH }]),
        { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Line Reactor Calculator', url: `${SITE}${PATH}`, applicationCategory: 'EngineeringApplication', operatingSystem: 'Any', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' } },
      ]} />
      {children}
      <RelatedArticles path={PATH} title="Related guides" />
    </>
  )
}

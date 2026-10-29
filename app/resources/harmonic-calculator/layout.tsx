import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import RelatedArticles from '@/components/blog/RelatedArticles'
import { SITE, breadcrumbLd, pageMeta } from '@/lib/seo'

const PATH = '/resources/harmonic-calculator'

// The page is a client component, so its metadata, structured data and related articles live here
export const metadata: Metadata = pageMeta({
  title: 'Harmonic Calculator — THD & K-Factor',
  description: 'Calculate total harmonic distortion (THD) and K-factor from harmonic currents, and pick the right K-rated transformer for non-linear loads.',
  path: PATH,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[
        breadcrumbLd([{ name: 'Resources', href: '/resources' }, { name: 'Harmonic Calculator', href: PATH }]),
        { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Harmonic Calculator', url: `${SITE}${PATH}`, applicationCategory: 'EngineeringApplication', operatingSystem: 'Any', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' } },
      ]} />
      {children}
      <RelatedArticles path={PATH} title="Related guides" />
    </>
  )
}

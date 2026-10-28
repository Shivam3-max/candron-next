import type { MetadataRoute } from 'next'
import { DRY } from '@/lib/dry-type'
import { LIQUID } from '@/lib/ranges/liquid'
import { DIST } from '@/lib/ranges/dist'
import { LOADBANKS } from '@/lib/ranges/loadbanks'
import { productHref, type RangeDef } from '@/lib/ranges/core'

/** Hub, family and product URLs of a range. */
const rangeUrls = (r: RangeDef) => [r.hubHref, ...r.families.map(f => f.href), ...r.products.map(p => productHref(r, p))]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://candron.com'

  const routes = [
    '',
    '/about',
    '/project-process',
    '/products',
    '/inventory',
    '/products/control-panels',
    '/products/control-panels/automation',
    '/products/control-panels/mcc',
    '/products/control-panels/process',
    '/products/control-panels/scada',
    '/products/transformers',
    ...rangeUrls(LIQUID),
    ...rangeUrls(DRY),
    '/products/transformers/dry-type/guide',
    ...rangeUrls(DIST),
    ...rangeUrls(LOADBANKS),
    '/inventory',
    '/resources',
    '/terms-and-conditions',
    '/warranty',
    '/blog',
    '/resources/lead-time-planner',
    '/resources/fat-commissioning-pack',
    '/resources/rfq-scorecard',
    '/resources/projects-radar',
    '/resources/kva-calculator',
    '/resources/kw-kva-calculator',
    '/resources/hp-kva-calculator',
    '/resources/fault-current-calculator',
    '/resources/inductance-calculator',
    '/resources/harmonic-calculator',
    '/resources/harmonic-reactor-calculator',
    '/resources/efficiency-calculator',
    '/resources/savings-payback-calculator',
    '/manufacturing',
    '/services',
    '/testing',
    '/commissioning',
    '/industries',
    '/contact',
  ]

  return [...new Set(routes)].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/products' ? 0.9 : 0.7,
  }))
}

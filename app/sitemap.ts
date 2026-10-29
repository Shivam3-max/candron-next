import type { MetadataRoute } from 'next'
import type { RowDataPacket } from 'mysql2/promise'
import { CATEGORIES, getAllPosts, postsIn } from '@/lib/blog'
import { getDb, isDatabaseConfigured } from '@/lib/db'
import { DRY } from '@/lib/dry-type'
import { LIQUID } from '@/lib/ranges/liquid'
import { DIST } from '@/lib/ranges/dist'
import { LOADBANKS } from '@/lib/ranges/loadbanks'
import { productHref, type RangeDef } from '@/lib/ranges/core'

/** Hub, family and product URLs of a range. */
const rangeUrls = (r: RangeDef) => [r.hubHref, ...r.families.map(f => f.href), ...r.products.map(p => productHref(r, p))]

/** Date the static pages last changed meaningfully. Bump it when site-wide content changes. */
const SITE_UPDATED = new Date('2026-10-29')

/** Active inventory items, when the database is reachable at build or request time. */
async function inventoryUrls(): Promise<{ slug: string; updated_at: Date }[]> {
  if (!isDatabaseConfigured()) return []
  try {
    const [rows] = await getDb().execute<(RowDataPacket & { slug: string; updated_at: Date })[]>('SELECT slug, updated_at FROM products WHERE is_active=1')
    return rows
  } catch {
    return []
  }
}

const priorityOf = (route: string) =>
  route === '' ? 1
    : ['/products', '/products/transformers', '/products/power-distribution', '/products/load-banks', '/inventory', '/contact'].includes(route) ? 0.9
      : route.startsWith('/products') ? 0.8
        : route.startsWith('/resources/') || route === '/blog' ? 0.7
          : ['/terms-and-conditions', '/warranty'].includes(route) ? 0.3
            : 0.6

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    '/resources/lead-time-index',
    '/resources/generator-test-planner',
    '/resources/oil-test-readout',
    '/resources/cold-climate-checklist',
    '/resources/division-26-specs',
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

  const posts = getAllPosts()
  const pages: MetadataRoute.Sitemap = [...new Set(routes)].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: route === '/blog' && posts[0] ? new Date(posts[0].updated ?? posts[0].date) : SITE_UPDATED,
    changeFrequency: route === '' || route === '/inventory' || route === '/blog' ? 'weekly' : 'monthly',
    priority: priorityOf(route),
  }))
  const articles: MetadataRoute.Sitemap = posts.map(p => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  const categories: MetadataRoute.Sitemap = CATEGORIES.filter(c => postsIn(c.slug).length).map(c => ({
    url: `${baseUrl}/blog/category/${c.slug}`,
    lastModified: new Date(postsIn(c.slug)[0].updated ?? postsIn(c.slug)[0].date),
    changeFrequency: 'weekly',
    priority: 0.5,
  }))
  const stock: MetadataRoute.Sitemap = (await inventoryUrls()).map(i => ({
    url: `${baseUrl}/inventory/${i.slug}`,
    lastModified: new Date(i.updated_at),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))
  return [...pages, ...articles, ...categories, ...stock]
}

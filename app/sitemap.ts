import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://candron.com'

  const routes = [
    '',
    '/about',
    '/products',
    '/products/switchgear',
    '/products/switchgear/metal-clad',
    '/products/switchgear/load-interrupter',
    '/products/switchgear/service-entrance',
    '/products/switchgear/low-voltage',
    '/products/switchboards',
    '/products/switchboards/main-breaker',
    '/products/switchboards/main-tie-main',
    '/products/switchboards/distribution',
    '/products/switchboards/utility-approved',
    '/products/control-panels',
    '/products/control-panels/automation',
    '/products/control-panels/mcc',
    '/products/control-panels/process',
    '/products/control-panels/scada',
    '/products/junction-box-splitters',
    '/products/mv-switchgear',
    '/products/lv-switchgear',
    '/manufacturing',
    '/testing',
    '/commissioning',
    '/industries',
    '/contact',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/products' ? 0.9 : 0.7,
  }))
}

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/cart', '/checkout', '/order/', '/quote/', '/account'],
      },
    ],
    sitemap: 'https://candron.com/sitemap.xml',
  }
}

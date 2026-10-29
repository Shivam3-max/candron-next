/**
 * SEO helpers: page metadata with canonical URLs and snippet-length descriptions, and
 * schema.org JSON-LD builders. Rendered with components/JsonLd.tsx.
 */
import type { Metadata } from 'next'

export const SITE = 'https://candron.com'
export const ORG_ID = `${SITE}/#organization`

/** Shortens a description to fit a search snippet, ending on a sentence or clause where possible. */
export function snippet(text: string, max = 158) {
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max)
  const sentence = cut.lastIndexOf('. ')
  if (sentence > max * 0.55) return cut.slice(0, sentence + 1)
  const clause = Math.max(cut.lastIndexOf(', '), cut.lastIndexOf(': '), cut.lastIndexOf(' — '), cut.lastIndexOf('; '))
  if (clause > max * 0.6) return `${cut.slice(0, clause).replace(/[,:;—\s]+$/, '')}.`
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,:;—\s]+$/, '')}…`
}

/** Standard page metadata: title, trimmed description, canonical and social cards. */
export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  const desc = snippet(description)
  const images = image ? [{ url: image }] : undefined
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: { title: `${title} | CANDRON`, description: desc, url: path, ...(images && { images }) },
    twitter: { card: 'summary_large_image', title: `${title} | CANDRON`, description: desc, ...(images && { images: [image as string] }) },
  }
}

export type Crumb = { name: string; href: string }

export const breadcrumbLd = (items: Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', href: '/' }, ...items].map((c, i) => ({
    '@type': 'ListItem', position: i + 1, name: c.name, item: `${SITE}${c.href === '/' ? '' : c.href}`,
  })),
})

export const faqLd = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})

export const productLd = ({ name, description, path, category, image }: { name: string; description: string; path: string; category: string; image?: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name,
  description: snippet(description, 300),
  category,
  url: `${SITE}${path}`,
  ...(image && { image: `${SITE}${image}` }),
  brand: { '@type': 'Brand', name: 'CANDRON' },
  countryOfOrigin: { '@type': 'Country', name: 'Canada' },
  seller: { '@id': ORG_ID },
})

export const articleLd = ({ title, description, path, published, updated, image, keywords }: {
  title: string; description: string; path: string; published: string; updated?: string; image?: string; keywords?: string[]
}) => ({
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: title,
  description,
  url: `${SITE}${path}`,
  mainEntityOfPage: `${SITE}${path}`,
  datePublished: published,
  dateModified: updated ?? published,
  inLanguage: 'en-CA',
  ...(image && { image: `${SITE}${image}` }),
  ...(keywords && { keywords: keywords.join(', ') }),
  author: { '@type': 'Organization', name: 'CANDRON Engineering Team', url: `${SITE}/about` },
  publisher: { '@id': ORG_ID },
})

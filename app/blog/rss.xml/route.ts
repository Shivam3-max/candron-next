import { getAllPosts } from '@/lib/blog'
import { SITE } from '@/lib/seo'

export const dynamic = 'force-static'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** RSS feed of every blog post, newest first. */
export function GET() {
  const items = getAllPosts().map(p => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid>${SITE}/blog/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`).join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CANDRON Engineering Blog</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Plain-English guides to transformers, switchgear, testing and Canadian standards.</description>
    <language>en-ca</language>${items}
  </channel>
</rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}

/**
 * Blog content: Markdown files in content/blog/<slug>.md with a small front-matter block.
 * Read at build time; every post is statically generated. To publish, add a .md file and deploy.
 *
 * Front matter (one `key: value` per line; lists are comma-separated):
 *   title, seoTitle? (shorter <title> for search results), description, date (YYYY-MM-DD), updated?, category, keywords,
 *   related ("Label | /path" pairs separated by semicolons), cta (Label | /path), image?
 * A "## Frequently asked questions" section with "### Question" headings becomes FAQ structured data.
 */
import fs from 'node:fs'
import path from 'node:path'
import { Marked, type Tokens } from 'marked'

const DIR = path.join(process.cwd(), 'content', 'blog')

export const CATEGORIES = [
  { slug: 'transformers', name: 'Transformers', blurb: 'Sizing, choosing and looking after dry-type and liquid-filled transformers.' },
  { slug: 'switchgear', name: 'Switchgear & Switchboards', blurb: 'How power distribution equipment works and how to specify it.' },
  { slug: 'testing-maintenance', name: 'Testing & Maintenance', blurb: 'Oil tests, load bank tests, commissioning and keeping equipment healthy.' },
  { slug: 'codes-standards', name: 'Codes & Standards', blurb: 'CSA standards, Canadian regulations and what they mean on a project.' },
  { slug: 'project-planning', name: 'Project Planning', blurb: 'Lead times, procurement and getting equipment on site when it is needed.' },
] as const

export type CategorySlug = (typeof CATEGORIES)[number]['slug']

export interface Heading { id: string; text: string }
export interface Faq { q: string; a: string }
export interface Post {
  slug: string
  title: string
  seoTitle: string
  description: string
  date: string
  updated?: string
  category: CategorySlug
  keywords: string[]
  related: { label: string; href: string }[]
  cta?: { label: string; href: string }
  image?: string
  html: string
  headings: Heading[]
  faqs: Faq[]
  words: number
  minutes: number
}

const ENTITIES: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&apos;': "'" }
const textOf = (html: string) => html.replace(/<[^>]+>/g, '').replace(/&(amp|lt|gt|quot|apos|#39);/g, m => ENTITIES[m])
const slugify = (s: string) => textOf(s).toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const plain = (s: string) => s.replace(/\*\*|__|`/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

function parseFrontMatter(src: string) {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(src)
  if (!m) throw new Error('Blog post is missing its front matter')
  const data: Record<string, string> = {}
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':')
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  return { data, body: src.slice(m[0].length) }
}

/** Questions and answers under the "Frequently asked questions" heading. */
function extractFaqs(body: string): Faq[] {
  const start = body.search(/^## Frequently asked questions\s*$/im)
  if (start < 0) return []
  const section = body.slice(start).split(/^## /m)[1] ?? ''
  return section.split(/^### /m).slice(1).map(block => {
    const [q, ...rest] = block.split('\n')
    return { q: plain(q.trim()), a: plain(rest.join(' ').replace(/\s+/g, ' ').trim()) }
  }).filter(f => f.q && f.a)
}

function render(body: string) {
  const headings: Heading[] = []
  const marked = new Marked({ gfm: true })
  marked.use({
    renderer: {
      heading({ tokens, depth }: Tokens.Heading) {
        const text = this.parser.parseInline(tokens)
        const id = slugify(text)
        if (depth === 2) headings.push({ id, text: textOf(text) })
        return `<h${depth} id="${id}">${text}</h${depth}>\n`
      },
      link({ href, title, tokens }: Tokens.Link) {
        const text = this.parser.parseInline(tokens)
        const external = /^https?:\/\//.test(href) && !href.startsWith('https://candron.com')
        const t = title ? ` title="${title}"` : ''
        return external ? `<a href="${href}"${t} target="_blank" rel="noopener">${text}</a>` : `<a href="${href}"${t}>${text}</a>`
      },
      table(token: Tokens.Table) {
        const cell = (c: Tokens.TableCell, tag: 'th' | 'td') => `<${tag}>${this.parser.parseInline(c.tokens)}</${tag}>`
        const head = `<tr>${token.header.map(c => cell(c, 'th')).join('')}</tr>`
        const rows = token.rows.map(r => `<tr>${r.map(c => cell(c, 'td')).join('')}</tr>`).join('')
        return `<div class="bp-table"><table><thead>${head}</thead><tbody>${rows}</tbody></table></div>\n`
      },
    },
  })
  const html = marked.parse(body, { async: false }) as string
  return { html, headings }
}

function load(file: string): Post {
  const slug = file.replace(/\.md$/, '')
  const { data, body } = parseFrontMatter(fs.readFileSync(path.join(DIR, file), 'utf8'))
  const { html, headings } = render(body)
  const words = body.split(/\s+/).filter(Boolean).length
  const [ctaLabel, ctaHref] = (data.cta ?? '').split('|').map(s => s.trim())
  const list = (v?: string) => (v ? v.split(',').map(s => s.trim()).filter(Boolean) : [])
  if (!CATEGORIES.some(c => c.slug === data.category)) throw new Error(`Unknown blog category "${data.category}" in ${file}`)
  return {
    slug,
    title: data.title,
    seoTitle: data.seoTitle || data.title,
    description: data.description,
    date: data.date,
    updated: data.updated || undefined,
    category: data.category as CategorySlug,
    keywords: list(data.keywords),
    related: (data.related ?? '').split(';').map(pair => pair.split('|').map(s => s.trim())).filter(([l, h]) => l && h).map(([label, href]) => ({ label, href })),
    cta: ctaLabel && ctaHref ? { label: ctaLabel, href: ctaHref } : undefined,
    image: data.image || undefined,
    html,
    headings,
    faqs: extractFaqs(body),
    words,
    minutes: Math.max(1, Math.round(words / 230)),
  }
}

let cache: Post[] | null = null

/** Every post, newest first. */
export function getAllPosts(): Post[] {
  if (!cache) {
    const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter(f => f.endsWith('.md')) : []
    cache = files.map(load).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)))
  }
  return cache
}

export const getPost = (slug: string) => getAllPosts().find(p => p.slug === slug)
export const categoryOf = (slug: string) => CATEGORIES.find(c => c.slug === slug)!
export const postsIn = (category: string) => getAllPosts().filter(p => p.category === category)

/** Other posts to read next: same category first, then the newest. */
export function relatedPosts(post: Post, n = 3) {
  const others = getAllPosts().filter(p => p.slug !== post.slug)
  return [...others.filter(p => p.category === post.category), ...others.filter(p => p.category !== post.category)].slice(0, n)
}

export const formatDate = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })

/** Posts that link to a site page, most specific match first: the page itself, then a parent or child page. */
export function postsForPath(pagePath: string, n = 3) {
  const score = (href: string) => {
    const h = href.split('?')[0]
    if (h === pagePath) return 1000
    if (h.length > 1 && pagePath.startsWith(`${h}/`)) return h.length
    if (pagePath.length > 1 && h.startsWith(`${pagePath}/`)) return pagePath.length
    return 0
  }
  return getAllPosts()
    .map(p => ({ p, s: Math.max(0, ...p.related.map(r => score(r.href)), p.cta ? score(p.cta.href) : 0) }))
    .filter(x => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map(x => x.p)
}

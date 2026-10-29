import Link from 'next/link'
import { categoryOf, formatDate, type Post } from '@/lib/blog'

/** Article card used on the blog index, category pages and "read next". */
export default function PostCard({ p, featured = false }: { p: Post; featured?: boolean }) {
  return (
    <Link href={`/blog/${p.slug}`} className={`bp-card${featured ? ' is-featured' : ''}`}>
      <span className="bp-card-cat">{categoryOf(p.category).name}</span>
      <h3>{p.title}</h3>
      <p>{p.description}</p>
      <span className="bp-card-meta">{formatDate(p.date)} · {p.minutes} min read</span>
    </Link>
  )
}

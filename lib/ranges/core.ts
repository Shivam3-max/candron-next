import type { RangeDef, RangeProduct } from './types'

export const familyOf = (r: RangeDef, id: string) => r.families.find(f => f.id === id)!
export const productsIn = (r: RangeDef, id: string) => r.products.filter(p => p.family === id)
export const productHref = (r: RangeDef, p: Pick<RangeProduct, 'family' | 'slug' | 'path'>) =>
  p.path ?? `${familyOf(r, p.family).href}/${p.slug}`
export const findProduct = (r: RangeDef, family: string, slug: string) =>
  r.products.find(p => p.family === family && p.slug === slug)
export const bySlug = (r: RangeDef, slug: string) => r.products.find(p => p.slug === slug)
export const byPath = (r: RangeDef, path: string) => r.products.find(p => productHref(r, p) === path)

/** Resolve a related key: "family/slug", or a slug (same family first, then any family). */
export function resolve(r: RangeDef, key: string, from?: string) {
  if (key.includes('/')) {
    const [f, s] = key.split('/')
    return findProduct(r, f, s)
  }
  return (from && findProduct(r, from, key)) || bySlug(r, key)
}

/** Route helpers for a family whose products live at family.href/[slug]. */
export function familyRoute(r: RangeDef, familyId: string) {
  return {
    generateStaticParams: () => productsIn(r, familyId).filter(p => !p.path).map(p => ({ slug: p.slug })),
    find: (slug: string) => {
      const p = findProduct(r, familyId, slug)
      return p && !p.path ? p : undefined
    },
  }
}

export type { RangeDef, RangeProduct, RangeFamily, RangeNeed, RangeHub, Art } from './types'

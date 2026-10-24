import ProductPage, { productMetadata } from '@/components/range/ProductPage'
import { byPath } from '@/lib/ranges/core'
import { DIST } from '@/lib/ranges/dist'

const p = byPath(DIST, '/products/lv-switchgear')!

export const metadata = productMetadata(DIST, p)

export default function Page() {
  return <ProductPage r={DIST} p={p} />
}

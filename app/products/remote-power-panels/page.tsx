import ProductPage, { productMetadata } from '@/components/range/ProductPage'
import { byPath } from '@/lib/ranges/core'
import { DIST } from '@/lib/ranges/dist'

const p = byPath(DIST, '/products/remote-power-panels')!

export const metadata = productMetadata(DIST, p)

export default function Page() {
  return <ProductPage r={DIST} p={p} />
}

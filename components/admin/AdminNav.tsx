import Link from 'next/link'

const LINKS = [
  { key: 'inventory', href: '/admin', label: 'Inventory' },
  { key: 'orders', href: '/admin/orders', label: 'Orders' },
  { key: 'quotes', href: '/admin/quotes', label: 'Quotes' },
  { key: 'customers', href: '/admin/customers', label: 'Customers' },
  { key: 'shop', href: '/admin/shop', label: 'Shop settings' },
] as const

export default function AdminNav({ current }: { current: (typeof LINKS)[number]['key'] }) {
  return (
    <nav className="ia-nav" aria-label="Admin sections">
      {LINKS.map(l => (
        <Link key={l.key} href={l.href} className={l.key === current ? 'on' : ''} aria-current={l.key === current ? 'page' : undefined}>{l.label}</Link>
      ))}
    </nav>
  )
}

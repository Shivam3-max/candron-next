import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { breadcrumbLd } from '@/lib/seo'

// The page is a client component, so its metadata lives here
export const metadata: Metadata = { alternates: { canonical: '/products/control-panels' },
  title: 'Control Panels',
  description: 'Custom UL 508A industrial control panels with PLC, HMI, and SCADA integration, engineered by CANDRON, made and tested in Canada.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Products', href: '/products' }, { name: 'Control Panels', href: '/products/control-panels' }])} />
      {children}
    </>
  )
}

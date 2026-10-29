import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { breadcrumbLd } from '@/lib/seo'

export const metadata: Metadata = { alternates: { canonical: '/contact' },
  title: 'Contact',
  description: 'Get in touch with CANDRON Energy Inc. for equipment quotes, emergency response, engineering studies, or project inquiries.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Contact', href: '/contact' }])} />
      {children}
    </>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Candron Energy Inc. for equipment quotes, emergency response, engineering studies, or project inquiries. We respond within one business day.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

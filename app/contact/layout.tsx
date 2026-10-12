import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with CANDRON Energy Inc. for equipment quotes, emergency response, engineering studies, or project inquiries. Available 24/7 with responses within 4 hours.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from 'next'

// The page is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: 'Switchboards',
  description: 'Custom low voltage switchboards up to 4000 A at 600 V for commercial, industrial, and infrastructure projects, built and tested in-house.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

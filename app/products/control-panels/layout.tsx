import type { Metadata } from 'next'

// The page is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: 'Control Panels',
  description: 'Custom UL 508A industrial control panels with PLC, HMI, and SCADA integration, engineered by CANDRON, made and tested in Canada.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

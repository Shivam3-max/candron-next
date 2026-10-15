import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Electrical Engineering Services',
  description: 'Contact CANDRON about electrical engineering studies, coordination, and project requirements.',
}

export default function ServicesPage() {
  redirect('/contact?service=electrical-engineering')
}

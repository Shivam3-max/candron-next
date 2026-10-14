import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Electrical Engineering Services',
  description: 'Electrical engineering services are provided through Delta Wye Engineering.',
}

export default function ServicesPage() {
  redirect('https://deltawyeeng.com')
}

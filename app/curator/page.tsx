import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPersonById } from '@/lib/people'
import ProfilePage from '@/components/ProfilePage'

export const metadata: Metadata = {
  title: 'Jomiro Eming — The Wrong List',
  description: 'Jomiro Eming is a Visual Designer & Storyteller and the curator of The Wrong List — a directory of unconventional professionals who went their own way anyway.',
  alternates: { canonical: '/curator' },
}

export default function CuratorPage() {
  const curator = getPersonById('jomiro')

  if (!curator) notFound()

  return <ProfilePage person={curator} reversed={true} />
}

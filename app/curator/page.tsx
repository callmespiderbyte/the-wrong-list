import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPersonById } from '@/lib/people'
import ProfilePage from '@/components/ProfilePage'

export const metadata: Metadata = {
  title: 'Curator',
  description: 'Jomiro Eming — freelance graphic designer, creative strategist, and the person behind The Wrong List.',
  alternates: { canonical: 'https://thewronglist.com/curator' },
}

export default function CuratorPage() {
  const curator = getPersonById('jomiro')

  if (!curator) notFound()

  return <ProfilePage person={curator} reversed={true} />
}

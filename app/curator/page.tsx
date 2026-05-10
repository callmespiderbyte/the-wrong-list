import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPersonById } from '@/lib/people'
import ProfilePage from '@/components/ProfilePage'

export const metadata: Metadata = {
  title: 'Jomiro Eming — Curator of The Wrong List',
  description: 'Jomiro Eming curates The Wrong List — a directory of people who went their own way anyway. His philosophy: the wrong path is often the more valuable one.',
  alternates: { canonical: '/curator' },
}

export default function CuratorPage() {
  const curator = getPersonById('jomiro')

  if (!curator) notFound()

  return <ProfilePage person={curator} reversed={true} />
}

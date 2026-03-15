import { notFound } from 'next/navigation'
import { getPersonById } from '@/lib/people'
import ProfilePage from '@/components/ProfilePage'

export default function CuratorPage() {
  const curator = getPersonById('jomiro')

  if (!curator) notFound()

  return <ProfilePage person={curator} reversed={true} />
}

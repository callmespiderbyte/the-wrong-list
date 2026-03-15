import { notFound } from 'next/navigation'
import { getPeople, getPersonById } from '@/lib/people'
import ProfilePage from '@/components/ProfilePage'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const people = getPeople()
  return people.map((person) => ({ id: person.id }))
}

export default async function PersonPage({ params }: PageProps) {
  const { id } = await params
  const person = getPersonById(id)

  if (!person) {
    notFound()
  }

  return <ProfilePage person={person} />
}

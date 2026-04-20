import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import { getPeople, getPersonById } from '@/lib/people'
import ProfilePage from '@/components/ProfilePage'

const SITE_URL = 'https://thewronglist.com'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const people = getPeople()
  return people.map((person) => ({ id: person.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const person = getPersonById(id)
  if (!person) return {}

  const profileUrl = `${SITE_URL}/people/${person.id}`
  const title = `${person.name} — The Wrong List`
  const description = `${person.name}, ${person.tagline}. ${person.quote}`

  // Use the pre-generated share card if it exists; otherwise fall back to the site OG image
  const cardPath = path.join(process.cwd(), 'public', 'share-cards', `${person.id}.png`)
  const hasCard = fs.existsSync(cardPath)
  const imageUrl = hasCard
    ? `${SITE_URL}/share-cards/${person.id}.png`
    : `${SITE_URL}/assets/og-image.png`
  const imageWidth = hasCard ? 1080 : 1201
  const imageHeight = hasCard ? 1350 : 631

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: profileUrl,
      siteName: 'The Wrong List',
      images: [{ url: imageUrl, width: imageWidth, height: imageHeight }],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: profileUrl,
    },
  }
}

export default async function PersonPage({ params }: PageProps) {
  const { id } = await params
  const person = getPersonById(id)

  if (!person) {
    notFound()
  }

  return <ProfilePage person={person} />
}

'use client'

import { useState, useEffect } from 'react'
import { Person } from '@/lib/types'
import ProfileRow from '@/components/ProfileRow'

export default function ShuffledDirectory({ people }: { people: Person[] }) {
  const [shuffled, setShuffled] = useState(people)

  useEffect(() => {
    setShuffled([...people].sort(() => Math.random() - 0.5))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return shuffled.map((person, index) => (
    <ProfileRow key={person.id} person={person} index={index} />
  ))
}

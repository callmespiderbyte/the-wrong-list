'use client'

import { useState, useEffect } from 'react'
import { Person } from '@/lib/types'
import ProfileCard from '@/components/ProfileCard'

export default function ShuffledCards({ people }: { people: Person[] }) {
  const [shuffled, setShuffled] = useState(people)

  useEffect(() => {
    setShuffled([...people].sort(() => Math.random() - 0.5))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="cards-grid">
      {shuffled.map((person, index) => (
        <ProfileCard key={person.id} person={person} index={index} />
      ))}
    </div>
  )
}

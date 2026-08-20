'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Person } from '@/lib/types'
import ProfileCard from '@/components/ProfileCard'
import DirectoryToolbar from '@/components/DirectoryToolbar'

type SortMode = 'az' | 'za' | null

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export default function ProfileDirectory({ people }: { people: Person[] }) {
  const [order, setOrder] = useState<Person[]>(people)
  const [sortMode, setSortMode] = useState<SortMode>(null)
  const [activeTags, setActiveTags] = useState<string[]>([])

  useEffect(() => {
    setOrder(shuffle(people))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const allTags = useMemo(() => {
    const s = new Set<string>()
    people.forEach((p) => p.tags.forEach((t) => s.add(t)))
    return Array.from(s).sort()
  }, [people])

  const visible = useMemo(() => {
    let list = order
    if (sortMode) {
      list = [...list].sort((a, b) =>
        sortMode === 'az' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      )
    }
    if (activeTags.length > 0) {
      list = list.filter((p) => activeTags.every((t) => p.tags.includes(t)))
    }
    return list
  }, [order, sortMode, activeTags])

  function handleRandomize() {
    setOrder(shuffle(people))
    setSortMode(null)
  }

  function handleSortToggle() {
    setSortMode((m) => (m === 'az' ? 'za' : 'az'))
  }

  function handleToggleTag(tag: string) {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <section
      id="directory"
      style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        paddingLeft: 'clamp(16px, 4vw, 60px)',
        paddingRight: 'clamp(16px, 4vw, 60px)',
        paddingBottom: '80px',
      }}
    >
      <DirectoryToolbar
        allTags={allTags}
        activeTags={activeTags}
        sortMode={sortMode}
        onRandomize={handleRandomize}
        onSortToggle={handleSortToggle}
        onToggleTag={handleToggleTag}
        onClearTags={() => setActiveTags([])}
      />

      <div className="cards-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((person, index) => (
            <ProfileCard key={person.id} person={person} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

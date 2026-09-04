import { Person } from './types'
import peopleData from '../data/people.json'

export function getPeople(): Person[] {
  return (peopleData as Person[]).filter((p) => p.id !== 'jomiro')
}

export function getPersonById(id: string): Person | undefined {
  return (peopleData as Person[]).find((p) => p.id === id)
}

export function isNewProfile(person: Person, days = 30): boolean {
  if (!person.dateAdded) return false
  const addedAt = new Date(person.dateAdded).getTime()
  if (Number.isNaN(addedAt)) return false
  const ageMs = Date.now() - addedAt
  return ageMs >= 0 && ageMs <= days * 24 * 60 * 60 * 1000
}

export function getAdjacentPeople(id: string): { prev: Person | null; next: Person | null } {
  const people = getPeople()
  const index = people.findIndex((p) => p.id === id)
  if (index === -1 || people.length < 2) return { prev: null, next: null }

  const prev = people[(index - 1 + people.length) % people.length]
  const next = people[(index + 1) % people.length]
  return { prev, next }
}

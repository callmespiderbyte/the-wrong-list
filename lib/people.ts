import { Person } from './types'
import peopleData from '../data/people.json'

export function getPeople(): Person[] {
  return (peopleData as Person[]).filter((p) => p.id !== 'jomiro')
}

export function getPersonById(id: string): Person | undefined {
  return (peopleData as Person[]).find((p) => p.id === id)
}

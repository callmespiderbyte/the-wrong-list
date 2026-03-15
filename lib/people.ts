import { Person } from './types'
import peopleData from '../data/people.json'

export function getPeople(): Person[] {
  return peopleData as Person[]
}

export function getPersonById(id: string): Person | undefined {
  return (peopleData as Person[]).find((p) => p.id === id)
}

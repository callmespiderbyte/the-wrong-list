export interface Person {
  id: string
  name: string
  tagline: string
  quote: string
  tags: string[]
  bio: string
  website?: string
  linkedin?: string
  email?: string
  behance?: string
  photo: string
  backgroundColor: 'red' | 'teal' | 'indigo' | 'light-blue' | 'dark-blue' | 'purple'
}

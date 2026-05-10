import { MetadataRoute } from 'next'
import { getPeople } from '@/lib/people'

const BASE = 'https://thewronglist.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const people = getPeople()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/curator`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/manifesto`,lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/press`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const profileRoutes: MetadataRoute.Sitemap = people.map((person) => ({
    url: `${BASE}/people/${person.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [...staticRoutes, ...profileRoutes]
}

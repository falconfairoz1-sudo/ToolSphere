import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://your-domain.com'
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/privacy',
    '/terms',
    '/help',
    '/bookmarks',
    '/recent',
    '/settings',
    '/profile',
  ]

  // Tool categories
  const categories = [
    'ai-tools',
    'pdf-tools', 
    'image-tools',
    'video-tools',
    'text-tools',
    'developer-tools',
    'calculators',
    'converters',
    'generators',
    'utilities'
  ]

  // Generate sitemap entries
  const pages: MetadataRoute.Sitemap = []

  // Add static pages
  staticPages.forEach(page => {
    pages.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: page === '' ? 1 : 0.8,
    })
  })

  // Add category pages
  categories.forEach(category => {
    pages.push({
      url: `${baseUrl}/category/${category}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  return pages
}
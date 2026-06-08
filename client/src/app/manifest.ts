import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ToolDataBase - 150+ Tools Platform',
    short_name: 'ToolDataBase',
    description: 'Fast, clean, and smart multi-tool platform with 150+ tools including PDF, image, AI, and developer tools',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512', 
        type: 'image/png',
        purpose: 'any'
      }
    ],
    categories: ['productivity', 'utilities', 'tools'],
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png'
      },
      {
        src: '/screenshot-narrow.png',
        sizes: '640x1136',
        type: 'image/png'
      }
    ]
  }
}
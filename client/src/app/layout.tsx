import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ToolDataBase - 150+ Tools in One Platform',
  description: 'Fast, clean, and smart multi-tool platform. PDF tools, image editors, AI generators, calculators, and more. No login required, 100% free.',
  keywords: 'tools, pdf, image, video, ai, developer tools, online tools, free tools, calculator, converter, generator',
  authors: [{ name: 'ToolDataBase Team' }],
  creator: 'ToolDataBase',
  publisher: 'ToolDataBase',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL || 'https://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ToolDataBase - 150+ Tools in One Platform',
    description: 'Fast, clean, and smart multi-tool platform. PDF tools, image editors, AI generators, calculators, and more.',
    url: '/',
    siteName: 'ToolDataBase',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ToolDataBase - 150+ Tools Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToolDataBase - 150+ Tools in One Platform',
    description: 'Fast, clean, and smart multi-tool platform. PDF tools, image editors, AI generators, and more.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' }
  ],
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

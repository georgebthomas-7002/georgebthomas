import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Resources | George B. Thomas',
  description: 'Explore free videos, podcasts, and articles on HubSpot, marketing, AI, and personal growth. Learn from 30+ years of expertise at your own pace.',
  openGraph: {
    title: 'Free Resources | George B. Thomas',
    description: 'Explore free videos, podcasts, and articles on HubSpot, marketing, AI, and personal growth.',
    url: 'https://www.georgebthomas.com/resources',
    images: [
      {
        url: '/images/george-speaking.jpg',
        width: 1200,
        height: 630,
        alt: 'George B. Thomas Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Resources | George B. Thomas',
    description: 'Free videos, podcasts, and articles on HubSpot, marketing, AI, and personal growth.',
  },
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

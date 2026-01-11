import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book George | George B. Thomas',
  description: 'Book George B. Thomas for your next keynote, podcast, workshop, or virtual event. Expert speaker on HubSpot, marketing, leadership, and personal transformation.',
  openGraph: {
    title: 'Book George | George B. Thomas',
    description: 'Book George B. Thomas for keynotes, podcasts, workshops, and events.',
    url: 'https://www.georgebthomas.com/book',
    images: [
      {
        url: '/images/george-speaking.jpg',
        width: 1200,
        height: 630,
        alt: 'Book George B. Thomas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book George | George B. Thomas',
    description: 'Book George B. Thomas for your next event.',
  },
}

export default function BookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

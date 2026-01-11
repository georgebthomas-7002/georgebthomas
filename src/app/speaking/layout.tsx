import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Keynote Speaking | George B. Thomas',
  description: 'Book George for your next event. Energizing keynotes on HubSpot, AI, video, leadership, and transformation. INBOUND speaker since 2015. 100+ stages worldwide.',
  openGraph: {
    title: 'Keynote Speaking | George B. Thomas',
    description: 'Book George for your next event. Energizing keynotes on HubSpot, AI, video, leadership, and transformation. INBOUND speaker since 2015.',
    url: 'https://www.georgebthomas.com/speaking',
    images: [
      {
        url: '/images/george-speaking.jpg',
        width: 1200,
        height: 630,
        alt: 'George B. Thomas Keynote Speaking',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keynote Speaking | George B. Thomas',
    description: 'Energizing keynotes on HubSpot, AI, video, leadership, and transformation. INBOUND speaker since 2015.',
  },
}

export default function SpeakingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

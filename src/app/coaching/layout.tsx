import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '1:1 Coaching | George B. Thomas',
  description: 'Transform your mindset and master HubSpot with personalized coaching. $200/hour with flexible packages from 10-30 hours. Start your transformation today.',
  openGraph: {
    title: '1:1 Coaching | George B. Thomas',
    description: 'Transform your mindset and master HubSpot with personalized coaching. $200/hour with flexible packages.',
    url: 'https://www.georgebthomas.com/coaching',
    images: [
      {
        url: '/images/george-speaking.jpg',
        width: 1200,
        height: 630,
        alt: 'George B. Thomas Coaching',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '1:1 Coaching | George B. Thomas',
    description: 'Transform your mindset and master HubSpot with personalized coaching. $200/hour.',
  },
}

export default function CoachingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

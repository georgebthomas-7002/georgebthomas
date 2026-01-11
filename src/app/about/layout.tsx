import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About George B. Thomas | Speaker, Coach & HubSpot Expert',
  description: 'Discover George\'s journey from dropout to INBOUND speaker. 30+ years transforming audiences, 42+ HubSpot certifications. Become superhuman.',
  openGraph: {
    title: 'About George B. Thomas | Speaker, Coach & HubSpot Expert',
    description: 'Discover George\'s journey from dropout to INBOUND speaker. 30+ years transforming audiences, 42+ HubSpot certifications.',
    url: 'https://www.georgebthomas.com/about',
    images: [
      {
        url: '/images/george-speaking.jpg',
        width: 1200,
        height: 630,
        alt: 'George B. Thomas Speaking',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About George B. Thomas | Speaker, Coach & HubSpot Expert',
    description: 'Discover George\'s journey from dropout to INBOUND speaker. 30+ years transforming audiences.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

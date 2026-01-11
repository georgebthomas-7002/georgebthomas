import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Expertise | HubSpot, Video, AI & More | George B. Thomas',
  description: 'Access 30+ years of marketing expertise. HubSpot strategy, video marketing, AI implementation, podcasting, and transformation coaching.',
  openGraph: {
    title: 'Expertise | HubSpot, Video, AI & More | George B. Thomas',
    description: 'Access 30+ years of marketing expertise. HubSpot strategy, video marketing, AI implementation, and transformation coaching.',
    url: 'https://www.georgebthomas.com/expertise',
    images: [
      {
        url: '/images/george-speaking.jpg',
        width: 1200,
        height: 630,
        alt: 'George B. Thomas - Marketing Expert',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expertise | HubSpot, Video, AI & More | George B. Thomas',
    description: 'Access 30+ years of marketing expertise. HubSpot, video, AI, and transformation coaching.',
  },
}

export default function ExpertiseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

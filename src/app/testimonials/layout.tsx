import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Testimonials | George B. Thomas',
  description: 'Real stories of transformation. See what clients say about working with George B. Thomas—keynote speaking, coaching, and HubSpot expertise.',
  openGraph: {
    title: 'Client Testimonials | George B. Thomas',
    description: 'Real stories of transformation. See what clients say about working with George B. Thomas.',
    url: 'https://www.georgebthomas.com/testimonials',
    images: [
      {
        url: '/images/george-speaking.jpg',
        width: 1200,
        height: 630,
        alt: 'George B. Thomas Client Testimonials',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Testimonials | George B. Thomas',
    description: 'Real stories of transformation. See what clients say about working with George B. Thomas.',
  },
}

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

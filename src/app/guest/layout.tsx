import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Podcast Guest Info | George B. Thomas',
  description: 'Everything podcast hosts need to know about George B. Thomas. Bio, interview topics, suggested questions, and booking information.',
  openGraph: {
    title: 'Podcast Guest Info | George B. Thomas',
    description: 'Everything podcast hosts need to know about George B. Thomas. Bio, interview topics, suggested questions, and booking information.',
    url: 'https://www.georgebthomas.com/guest',
    images: [
      {
        url: '/images/george-headshot.jpg',
        width: 1200,
        height: 630,
        alt: 'George B. Thomas - Podcast Guest',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Podcast Guest Info | George B. Thomas',
    description: 'Everything podcast hosts need to know about George B. Thomas. Bio, interview topics, suggested questions, and booking information.',
  },
}

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

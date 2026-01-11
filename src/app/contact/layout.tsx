import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | George B. Thomas',
  description: 'Get in touch with George B. Thomas. Questions about speaking, coaching, or collaboration? I would love to hear from you.',
  openGraph: {
    title: 'Contact | George B. Thomas',
    description: 'Get in touch with George B. Thomas for speaking, coaching, or collaboration opportunities.',
    url: 'https://www.georgebthomas.com/contact',
    images: [
      {
        url: '/images/george-speaking.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact George B. Thomas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | George B. Thomas',
    description: 'Get in touch with George B. Thomas.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

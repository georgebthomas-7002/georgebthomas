import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply for Coaching | George B. Thomas',
  description: 'Start your coaching journey today. Apply for 1:1 coaching with George B. Thomas and unlock your potential. Quick application, personalized experience.',
  openGraph: {
    title: 'Apply for Coaching | George B. Thomas',
    description: 'Start your coaching journey today. Apply for 1:1 coaching with George B. Thomas and unlock your potential.',
    url: 'https://www.georgebthomas.com/coaching/apply',
    images: [
      {
        url: '/images/george-speaking.jpg',
        width: 1200,
        height: 630,
        alt: 'Apply for Coaching with George B. Thomas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apply for Coaching | George B. Thomas',
    description: 'Start your coaching journey today. Apply for 1:1 coaching and unlock your potential.',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

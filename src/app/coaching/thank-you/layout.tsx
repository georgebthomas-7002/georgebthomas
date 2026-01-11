import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You | George B. Thomas',
  description: 'Your coaching application has been received. Welcome to your transformation journey with George B. Thomas.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

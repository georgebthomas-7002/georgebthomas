import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.georgebthomas.com'),
  title: 'George B. Thomas | Professional Speaker & Coach',
  description: 'Keynote speaker and coach helping you unlock potential and achieve results. HubSpot expert, transformation coach, INBOUND speaker since 2015.',
  keywords: ['speaker', 'coach', 'keynote', 'leadership', 'HubSpot', 'transformation', 'personal development'],
  authors: [{ name: 'George B. Thomas' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.georgebthomas.com',
    siteName: 'George B. Thomas',
    title: 'George B. Thomas | Professional Speaker & Coach',
    description: 'Keynote speaker and coach helping you unlock potential and achieve results. HubSpot expert, INBOUND speaker.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'George B. Thomas - Speaker & Coach',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'George B. Thomas | Professional Speaker & Coach',
    description: 'Keynote speaker and coach helping you unlock potential. HubSpot expert, INBOUND speaker.',
    creator: '@georgebthomas',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Resource Center | George B. Thomas',
  description: 'Explore articles, videos, and podcast episodes on HubSpot, marketing, leadership, and personal growth.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import Script from 'next/script'
import '@/styles/globals.css'
import { StickyGuestCTA } from '@/components/StickyGuestCTA'

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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <StickyGuestCTA />
        {children}

        {/* Delphi.ai Chat Bubble */}
        <Script id="delphi-bubble-script" strategy="beforeInteractive">
          {`
            window.delphi = {...(window.delphi ?? {}) };
            window.delphi.bubble = {
              config: "09cb4287-c5a5-449d-8e00-980dff0138a3",
              overrides: {
                landingPage: "VOICE",
              },
              trigger: {
                color: "#E07A5F",
              },
            };
          `}
        </Script>
        <Script
          id="delphi-bubble-bootstrap"
          src="https://embed.delphi.ai/loader.js"
          strategy="afterInteractive"
        />

        {/* Google Analytics (GA4) */}
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        {/* HubSpot Tracking */}
        {process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID && (
          <Script
            id="hubspot-tracking"
            src={`//js.hs-scripts.com/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}.js`}
            strategy="afterInteractive"
          />
        )}

        {/* Custom Delphi Chat Label */}
        <div className="delphi-chat-wrapper">
          <span className="delphi-chat-label">Talk with AI GBT</span>
        </div>
      </body>
    </html>
  )
}

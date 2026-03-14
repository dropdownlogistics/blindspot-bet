import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "blindspot.bet — See What You've Been Missing",
  description: 'Sports betting analytics. Track every bet. Surface every pattern. Find your blind spots before they cost you.',
  metadataBase: new URL('https://blindspot.bet'),
  openGraph: {
    title: "blindspot.bet — See What You've Been Missing",
    description: 'Track every bet. Surface every pattern. Find your edge — and your leaks.',
    url: 'https://blindspot.bet',
    siteName: 'blindspot.bet',
    images: [{ url: '/api/og', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "blindspot.bet — See What You've Been Missing",
    description: 'Track every bet. Surface every pattern. Find your edge — and your leaks.',
    images: ['/api/og'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
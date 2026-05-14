import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import PageTransition from '@/components/PageTransition'
import Footer from '@/components/Footer'
import ProductHuntPopup from '@/components/ProductHuntPopup'

const healTheWeb = localFont({
  src: '../public/fonts/HealTheWebA-Regular.otf',
  variable: '--font-heal',
  display: 'swap',
})

const robotoMono = localFont({
  src: '../public/fonts/RobotoMono-VariableFont_wght.ttf',
  variable: '--font-mono',
  display: 'swap',
})

const vanillaCreamOx = localFont({
  src: '../public/fonts/VanillaCreamOx-Regular.otf',
  variable: '--font-vanilla',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://thewronglist.com'),
  title: {
    default: 'The Wrong List',
    template: '%s | The Wrong List',
  },
  description: 'A curated, invite-only directory of unconventional thinkers who have been labelled "too different" in their professional lives.',
  openGraph: {
    type: 'website',
    siteName: 'The Wrong List',
    title: 'The Wrong List',
    description: 'A curated directory of unconventional thinkers.',
    url: 'https://thewronglist.com',
    images: [{ url: '/assets/og-image.png', width: 1201, height: 631 }],
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Wrong List',
    description: 'A curated directory of unconventional thinkers.',
    images: ['/assets/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://thewronglist.com',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'The Wrong List',
  url: 'https://thewronglist.com',
  description: 'A curated, invite-only directory of unconventional thinkers who have been labelled too different in their professional lives.',
  creator: {
    '@type': 'Person',
    name: 'Jomiro Eming',
    jobTitle: 'Freelance Graphic Designer and Creative Strategist',
    url: 'https://thewronglist.com/curator',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hamburg',
      addressCountry: 'DE',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${healTheWeb.variable} ${robotoMono.variable} ${vanillaCreamOx.variable}`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        {/* Grain SVG filter — injected once, referenced globally */}
        <svg
          aria-hidden="true"
          style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        >
          <defs>
            <filter id="grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
        </svg>
        <PageTransition />
        {children}
        <Footer />
        <ProductHuntPopup />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import PageTransition from '@/components/PageTransition'
import Footer from '@/components/Footer'

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
  title: 'The Wrong List — A directory of unconventional professionals',
  description: 'A hand-curated directory of unconventional professionals who were told they were too much, too different, or too hard to place.',
  openGraph: {
    title: 'The Wrong List',
    description: 'A hand-curated directory of unconventional professionals who were told they were too much, too different, or too hard to place.',
    url: 'https://thewronglist.com',
    siteName: 'The Wrong List',
    images: [{ url: 'https://www.thewronglist.com/assets/og-image.png', width: 1201, height: 631 }],
    type: 'website',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Wrong List',
    description: 'A hand-curated directory of unconventional professionals who were told they were too much, too different, or too hard to place.',
    images: ['https://www.thewronglist.com/assets/og-image.png'],
  },
  alternates: {
    canonical: 'https://thewronglist.com',
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
              >
                <animate
                  attributeName="seed"
                  values="0;8;3;15;6;11;2;9;4;13;7;1;0"
                  dur="1.4s"
                  repeatCount="indefinite"
                  calcMode="discrete"
                />
              </feTurbulence>
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
        </svg>
        <PageTransition />
        {children}
        <Footer />
      </body>
    </html>
  )
}

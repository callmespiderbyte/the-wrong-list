import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Script from 'next/script'
import PageTransition from '@/components/PageTransition'
import Footer from '@/components/Footer'
import ProductHuntPopup from '@/components/ProductHuntPopup'
import Analytics from '@/components/Analytics'
import CookieBanner from '@/components/CookieBanner'
import PrivacyModal from '@/components/PrivacyModal'

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
        {/* Consent Mode v2 default — all denied until user accepts */}
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'wait_for_update': 500
          });
        `}} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J9JRLPD0ZN"
          strategy="afterInteractive"
        />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-J9JRLPD0ZN');
        `}} />
        {/* Upgrade consent immediately for returning visitors who already accepted */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            function getCookie(name) {
              var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
              return match ? match[2] : null;
            }
            if (getCookie('twl_cookie_consent') === 'accepted') {
              gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });
            }
          })();
        `}} />
        <Analytics />
        <PageTransition />
        {children}
        <Footer />
        <ProductHuntPopup />
        <CookieBanner />
        <PrivacyModal />
      </body>
    </html>
  )
}

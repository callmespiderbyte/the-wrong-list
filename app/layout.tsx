import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

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
  title: 'The Wrong List',
  description: 'Wrong by most standards, right by the ones that matter.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${healTheWeb.variable} ${robotoMono.variable} ${vanillaCreamOx.variable}`}>
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
        {children}
      </body>
    </html>
  )
}

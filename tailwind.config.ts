import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#7B0D1E',
        'brand-teal': '#0B3D3D',
        'brand-off-white': '#F2EDE4',
        'brand-black': '#0A0A0A',
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'sans-serif'],
        display: ['var(--font-dm-serif)', 'serif'],
      },
      keyframes: {
        blobShift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 15px) scale(0.97)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(4px)' },
        },
      },
      animation: {
        'blob-shift': 'blobShift 10s ease-in-out infinite',
        'blob-shift-alt': 'blobShift 12s ease-in-out infinite reverse',
        'fade-in': 'fadeIn 0.4s ease-in-out forwards',
        'bounce-down': 'bounceDown 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config

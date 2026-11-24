/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050014',
        bg2: '#0B071C',
        card: '#110C25',
        neonPurple: '#8B5CF6',
        neonViolet: '#A855F7',
        neonCyan: '#38BDF8',
        neonPink: '#D946EF',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 28px rgba(168, 85, 247, 0.28)',
        cyanGlow: '0 0 28px rgba(56, 189, 248, 0.28)',
      }
    },
  },
  plugins: [],
}

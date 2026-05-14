/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#ff2d95',
        'neon-blue': '#00f0ff',
        'neon-purple': '#b300ff',
        'neon-yellow': '#ffea00',
        'cyber-dark': '#0d0221',
        'cyber-black': '#0a0a0a',
      },
      fontFamily: {
        'cyber': ['"Orbitron"', 'sans-serif'],
        'mono': ['"Share Tech Mono"', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow 1.5s ease-in-out infinite alternate',
        'flicker': 'flicker 2s infinite',
        'scanline': 'scan 8s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #ff2d95, 0 0 10px #ff2d95, 0 0 20px #ff2d95' },
          '100%': { textShadow: '0 0 10px #ff2d95, 0 0 30px #ff2d95, 0 0 40px #ff2d95' },
        },
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 100%': { opacity: '1' },
          '20%, 21.999%, 63%, 63.999%': { opacity: '0.8' },
        },
        scan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
      },
    },
  },
  plugins: [],
}
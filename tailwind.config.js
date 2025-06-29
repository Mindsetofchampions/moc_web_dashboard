/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8A2BE2',
          light: '#9370DB',
          dark: '#4B0082',
        },
        secondary: {
          DEFAULT: '#00FFFF',
          dark: '#00CED1',
        },
        accent: '#FF00FF',
        warning: '#FFA500',
        info: '#00BFFF',
        success: '#32CD32',
        background: {
          dark: '#0D0C1D',
          surface: '#17162E',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'pulse-dot': 'pulseDotAnimation 1.8s infinite',
        'super-pulse': 'superPulse 2.5s infinite ease-in-out',
        'player-mega-pulse': 'playerMegaPulse 2s infinite',
        'rotate-slow': 'rotate 25s linear infinite',
      },
    },
  },
  plugins: [],
}
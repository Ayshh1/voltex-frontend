/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void-black': '#00000a',
        'nebula-purple': '#7b2fff',
        'aurora-cyan': '#00c9ff',
        'cosmic-pink': '#ff6b9d',
        'star-white': '#e2e8ff',
        'gain-green': '#00ff9f',
        'loss-red': '#ff4d6d',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'syne': ['Syne', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(123, 47, 255, 0.5)',
            borderColor: 'rgba(123, 47, 255, 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(123, 47, 255, 0.8)',
            borderColor: 'rgba(123, 47, 255, 0.6)',
          },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}

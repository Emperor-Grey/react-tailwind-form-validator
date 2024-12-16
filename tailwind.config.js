/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        shake: 'shake 0.3s ease forwards',
      },
      keyframes: {
        shake: {
          '0%': {
            transform: 'translate(0)',
          },
          '25%': {
            transform: 'translate(-5px, 0)',
          },
          '50%': {
            transform: 'translate(5px, 0)',
          },
          '75%': {
            transform: 'translate(-5px, 0)',
          },
          '100%': {
            transform: 'translate(0)',
          },
        },
        shimmer: {
          from: {
            backgroundPosition: '0 0',
          },
          to: {
            backgroundPosition: '-200% 0',
          },
        },
      },
    },
  },
  safelist: ['animate-shake', 'animate-shimmer'],
  plugins: [],
};

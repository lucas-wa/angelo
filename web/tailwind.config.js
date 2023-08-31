/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      animation: {
        'appear': 'slideup .5s ease',
        'slide-left': 'slideleft .5s ease'
      },

      keyframes: {
        slideup: {
          '0%': {
            transform: 'translateY(10px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          },

        },

        slideleft: {
          '0%': {
            transform: 'translateX(-50px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          },

        }
      }
    },
  },
  plugins: [],
}
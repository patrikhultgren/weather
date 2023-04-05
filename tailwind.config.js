/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        karma: 'Karma, sans-serif, Arial, Verdana',
      },
      colors: {
        black: '#020f23',
        beige: '#ededed',
        gray: '#d6d6d6',
      },
    },
  },
  plugins: [],
}

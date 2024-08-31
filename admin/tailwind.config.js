/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'list': "0.5fr 2fr 1fr 1fr .5fr",
        'order': "0.5fr 2fr 1fr 1fr 1fr",
      }
    },
  },
  plugins: [],
}
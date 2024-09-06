/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header-image': "url('/assets/frontend-assets/header_img.png')",
      },
      gridTemplateColumns: {
        '15': 'repeat(auto-fill, minmax(240px, 1fr))',
        '211': '2fr 1fr 1fr',
        'cart': '1fr 1.5fr 1fr 1fr 1fr 0.5fr ',
        'my-order': '0.5fr 2fr 1fr 1fr 2fr 1fr'
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

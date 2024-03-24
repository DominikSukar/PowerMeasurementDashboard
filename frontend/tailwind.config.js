/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Open Sans"','sans-serif'],
    },
    extend: {
      colors: {
        '1': '#03045E',
        '2': '#023E8A',
        '3': '#0077B6',
        '4': '#0096C7',
        '5': '#00B4D8',
        '6': "#48CAE4",
        '7': "#90E0EF",
        '8': "#ADE8F4",
        '9': "#CAF0F8",
      },
      height: {
        '152': '38rem',
      },
    },
  },
  plugins: [],
}
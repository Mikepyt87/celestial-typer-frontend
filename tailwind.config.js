/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors"); /*6.4k (gzipped: 2.6k)*/
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        primary: colors.yellow,
      },
    },
  },
  plugins: [],
};
// celestial-typer-frontend/src/index.css

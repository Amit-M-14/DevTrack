/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        linen: '#F9EAE1',
        smoky: '#7D4F50',
        dusty: '#CC8B86',
        taupe: '#AA998F',
        oak: '#D1BE9C',
      }
    },
  },
  plugins: [],
}
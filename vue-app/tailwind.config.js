/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0d0f11',
        primary: '#cec0c7',
        secondary: '#0b0d0e',
        accent: '#728264',
      }
    },
  },
  plugins: [],
}


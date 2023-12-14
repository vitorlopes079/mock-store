/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
        'josefin': ['Josefin Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}


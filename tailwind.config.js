/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        josefin: ["Josefin Sans", "sans-serif"],
        pacifico: ["Pacifico", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },

      width: {
        '380': "380px",
        '280': "280px",
      },
      height: {
        '560': "560px",
        "420": "420px",
      },
    },
  },
  plugins: [],
};

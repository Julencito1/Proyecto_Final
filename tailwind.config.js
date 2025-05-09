/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,php}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
        WorkSans: ["Work Sans", "sans-serif"],
        NotoSans: ["Noto Sans", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
        Rubik: ["Rubik", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        'trece': '13px',
      }
    },
  },
  plugins: [],
}


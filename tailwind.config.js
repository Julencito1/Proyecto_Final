/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,php}"],
  theme: {
    extend: {
      screens: {
        'max-xs': { max: '475px' },
        'max-sm': { max: '639px', min: '475.01px' },
        'max-md': { max: '767px' },
        'max-lg': { max: '1023px' },
        'max-xl': { max: '1279px' },
        'max-2xl': { max: '1535px' },
        'max-all': {max: '1279px', min: '475.01px'},
        'between_sm-md': { max: '767px', min: '639.01px'},
        'between_md-lg': { max: '1023px', min: '767.01px'},
        'between_lg-xl': { max: '1279px', min: '1023.01px'},
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
        NotoSans: ["Noto Sans", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
        Lexend: ["Lexend", "sans-serif"],
        Geist: ["Geist", "sans-serif"],
      },
      fontSize: {
        'trece': '13px',
      }
    },
  },
  plugins: [],
}


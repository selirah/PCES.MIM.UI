const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        appTheme: "#191f45",
        sloganTextColor: "#786FA4",
        logoutTextColor: "#648BBA",
        transparent: 'transparent',
        current: 'currentColor',
        indigo: colors.indigo,
        yellow: colors.yellow,
        amber: colors.amber,
        orange: colors.orange,
        "blue-navy":"#202A44",
        "greenish-blue":'#224952',
        "blue-ocean":"#0AA3CF",
        "blue-dark-ocean":"#003E78",
        "blue-light":'#CCDAF5',
        "blue-even-lighter":"#B8CEFF",
        "blue-lightest":"#F2F7F9"
      },
      spacing:{
        "1/5":"20%",
        "99%":"92%"
      }
    },
    fontFamily: {
      play: ['Play', 'sans-serif']
    }
  },
  variants: {
    extend: {},
    scrollbar: ['rounded']
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ]
}

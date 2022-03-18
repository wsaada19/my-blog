const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    safelist: ['bg-blue-400', 'bg-yellow-700'], // TODO remove this and just use hex codes for custom colors
  },
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      minHeight: {
        full: '100vh',
      },
      scale: {
        1025: '1.025',
      },
      colors: {
        blue: {
          600: '#2565C7',
          700: '#1c4d97',
          800: '#14376c',
          900: '#09172e',
        },
        yellow: {
          700: '#ed8106',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

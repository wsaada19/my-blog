module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './graphs/**/*.{js,ts,jsx,tsx}',
  ],

  safelist: [
    'bg-blue-400',
    'bg-orange-700, bg-red-600',
    'bg-green-600',
    'bg-blue-700',
    'bg-orange-500',
  ], // TODO remove this and use hex codes for custom colors
  darkMode: 'class',
  mode: 'jit',
  theme: {
    screens: {
      xs: '460px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundColor: ['checked'],
      minHeight: {
        full: '100vh',
      },
      scale: {
        1025: '1.025',
      },
      colors: {
        light: '#eee',
        blue: {
          400: '#0096FF',
          600: '#2565C7',
          700: '#1c4d97',
          800: '#14376c',
          900: '#09172e',
        },
        yellow: {
          700: '#ed8106',
        },
        red: {
          600: '#C9082A',
        },
        green: {
          600: 'rgb(27, 177, 82)',
        },
      },
    },
  },
  variants: {
    extend: { backgroundColor: ['even'] },
  },
  plugins: [],
};

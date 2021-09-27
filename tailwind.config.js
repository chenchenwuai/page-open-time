module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      'gray-light': 'var(--gray-light)',
      'gray-mid': 'var(--gray-mid)',
      'gray-dark': 'var(--gray-dark)',
      'primary': 'var(--primary)',
      'secondary': 'var(--secondary)',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  corePlugins: {
  },
  purge: [],
  darkMode: false,
  theme: {},
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  variants: {
    extend: {
      backgroundColor: ['group-focus'],
    }
  },
}

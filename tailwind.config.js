const plugin = require('tailwindcss/plugin')

module.exports = {
  corePlugins: {
  },
  purge: [],
  darkMode: false,
  theme: {},
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-pseudo-elements'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.separator': {
          content: 'url(/themes/lovata-tailwind-shopaholic/assets/images/separator.svg)',
        }
      }
      addUtilities(newUtilities, ['before'])
    }),
  ],
}

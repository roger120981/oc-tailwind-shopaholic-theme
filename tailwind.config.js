const plugin = require('tailwindcss/plugin')

module.exports = {
  corePlugins: {
  },
  content: [
    './layouts/**/*.htm',
    './pages/**/*.htm',
    './partials/**/*.htm',
    './partials/**/*.js',
  ],
  theme: {
    extend: {
      transitionDuration: {
        '0': '0ms',
      },
      gridTemplateColumns: {
        'full': '100%',
        'social': 'repeat(auto-fill, 40px)',
        'payments': 'repeat(auto-fit, 56px)',
      },
      gridTemplateRows: {
        'auto-fr-auto': 'auto 1fr auto',
      },
      outline: {
        blue: ['1px dashed #1E40AF', '1px'],
      },
      backgroundSize: {
        '45': '45%',
        '65': '65%',
        '300': '300px',
        '75': '75%',
        'info-icon': '12.5rem',
      },
      backgroundImage: {
        'check': "url('/themes/lovata-tailwind-shopaholic/assets/images/check.svg')"
      },
      fontSize: {
        error: ['9rem', '1'],
      },
      maxWidth: {
        '850': '850px',
        'screen': '100vw',
        'screen-3xl': '1920px',
        225: '900px',
      },
      backgroundImage: {
        'feedback': "url('/themes/lovata-tailwind-shopaholic/assets/images/union.svg')",
      },
      margin: {
        '-screen-1/2': '-50vw',
      },
      padding: {
        54: '13.5rem',
        57: '14.25rem',
      },
      maxHeight: {
        160: '40rem',
      },
      width: {
        90: '360px',
        174: '696px',
        23: '92px',
        174: '696px',
        225: '900px',
      },
      height: {
        23: '92px',
        131: '524px'
      },
      spacing: {
        2.25: '9px',
        1.75: '7px',
        0.25: '1px',
      },
    }
  },
  variants: {
    extend: {
      margin: ['first', 'last'],
      textColor: ['active', 'focus-visible', 'visited'],
      outline: ['focus-visible'],
      backgroundColor: ['group-focus', 'active', 'focus-visible', 'disabled'],
      ringWidth: ['focus-visible'],
      ringColor: ['hover', 'active', 'focus', 'focus-visible'],
      ringOffsetWidth: ['responsive', 'focus-visible', 'focus'],
      opacity: ['hover', 'focus'],
      fill: ['hover', 'group-hover', 'group-focus', 'focus'],
      stroke: ['hover', 'group-hover', 'group-focus', 'focus'],
      width: ['hover'],
      borderWidth: ['first', 'last'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-pseudo-elements'),
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.separator': {
          content: 'url(/themes/lovata-tailwind-shopaholic/assets/images/separator.svg)',
        }
      }
      addUtilities(newUtilities, ['before'])
    }),
    plugin(({ addVariant, e }) => {
      addVariant('backdrop', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.${e(`backdrop${separator}${className}`)}::backdrop`)
      })
    }),
  ]
}

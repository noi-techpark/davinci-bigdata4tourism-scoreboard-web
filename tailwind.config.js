/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    colors: {
      white: '#FFF',
      black: '#000',
      gray: {
        '100': '#FCFCFC',
        '300': '#F4F4F4',
        '400': '#c8c8c8',
        '500': '#707070'
      },
      primary: {
        '500': '#C1CA01',
      },
      error: {
        '500': '#D20707',
      },
      metric0: {
        '500': 'hsl(358, 60%, 59%)',
      },
      metric1: {
        '500': 'hsl(91, 21%, 49%)',
      },
      metric2: {
        '500': 'hsl(52, 90%, 50%)',
      },
      metric3: {
        '500': 'hsl(206, 43%, 72%)',
      },
      metric4: {
        '500': 'hsl(71, 55%, 49%)',
      },
      metric5: {
        '500': 'hsl(25, 74%, 51%)',
      }
    },
    spacing: {
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '1rem',
      '4': '2rem',
      '5': '4rem',
      '6': '6rem',
      'i': '1.5rem'
    },
    extend: {
      borderWidth: {
        '3': '3px'
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '7rem'
      }
    }
  },
  variants: {},
  plugins: []
}

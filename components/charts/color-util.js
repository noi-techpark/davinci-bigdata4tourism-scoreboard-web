const palette = require('google-palette')

export const rgbaPalette = (count, alpha = 1.0) =>
  palette('mpn65', count).map((hex) => {
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)

    return `rgba(${r}, ${g}, ${b}, ${alpha}`
  })

export const rgbPalette = (count) =>
  palette('mpn65', count).map((hex) => `#${hex}`)

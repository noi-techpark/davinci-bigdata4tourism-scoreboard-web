// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const palette = require('google-palette')

const borderAlpha = 1.0
const chartAlpha = 0.5
const hoverAlpha = 0.8

export const rgbaPalette = (count, alpha = 1.0) =>
  palette('mpn65', count).map((hex) => {
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)

    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  })

export const rgbPalette = (count) =>
  palette('mpn65', count).map((hex) => `#${hex}`)

export const borderRgba64 = rgbaPalette(64, borderAlpha)
export const chartRgba64 = rgbaPalette(64, chartAlpha)
export const hoverRgba64 = rgbaPalette(64, hoverAlpha)

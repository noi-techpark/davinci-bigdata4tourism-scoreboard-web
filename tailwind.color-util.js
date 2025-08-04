// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * This file provides utilities to add a bunch of color classes to tailwind.css and nuxt.
 */

const palette = require('google-palette')

const paletteCount = 64

const buildColors = (count, alpha = 1.0) =>
  palette('mpn65', count).map((hex) => {
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)

    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  })

const buildPostCss = (count) => {
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(`text-chart-${i}`)
        result.push(`hover:text-chart-${i}`)
        result.push(`bg-chart-${i}`)
        result.push(`border-chart-${i}`)
        result.push(`hover:border-chart-${i}`)
    }
    return result
}

module.exports = {
    colors: buildColors(paletteCount, 0.5).reduce((prev, curr, index) => ({...prev, [index]: curr}), {}),
    postCss: buildPostCss(paletteCount)
}
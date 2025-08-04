// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export const AXES_FONT_FAMILY = '"Source Sans Pro", sans-serif'
export const AXES_FONT_COLOR = '#000'
export const AXES_FONT_SIZE = 15
export const AXES_PADDING = 10

export const DATASET_COLOR_METRICS = {
  metric0: {
    hue: 358,
    sat: 60,
    light: 59
  },
  metric1: {
    hue: 91,
    sat: 21,
    light: 49
  },
  metric2: {
    hue: 52,
    sat: 90,
    light: 50
  },
  metric3: {
    hue: 206,
    sat: 43,
    light: 72
  },
  metric4: {
    hue: 71,
    sat: 55,
    light: 49
  },
  metric5: {
    hue: 25,
    sat: 74,
    light: 51
  }
}
export const DATASET_COLOR_LINE_NORMAL = {
  hue: 0,
  sat: 0,
  light: 0
}
export const DATASET_COLOR_BAR_NORMAL = {
  hue: 0,
  sat: 0,
  light: 0
}
export const DATASET_COLOR_PIE_NORMAL = {
  hue: 0,
  sat: 0,
  light: 78
}
export const DATASET_PATTERN_STYLES = [
  'disc',
  'cross',
  'diamond',
  'square',
  'triangle'
]
export const DATASET_PATTERN_SIZE = 15

export function hslToColor(hue, sat, light) {
  return 'hsl(' + hue + ', ' + sat + '%, ' + light + '%)'
}

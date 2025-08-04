<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <span>0</span>
</template>

<script>
import { CountUp } from 'countup.js'

export default {
  props: {
    number: {
      type: Number,
      default: 0
    },
    decimalPlaces: {
      type: Number,
      default: 0
    },
    suffix: {
      type: String,
      default: ''
    }
  },
  mounted() {
    const options = {
      duration: 3,
      separator: '.',
      decimal: ',',
      decimalPlaces: this.decimalPlaces,
      suffix: ' ' + this.suffix,
      useEasing: true,
      easingFn: (t, b, c, d) => {
        const ts = (t /= d) * t
        const tc = ts * t
        return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t)
      }
    }

    const instance = new CountUp(this.$el, this.number, options)

    instance.start()
  }
}
</script>

<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <CountUp :number="value" :decimal-places="decimalPlaces" :suffix="unit" />
    <div>{{ title }}</div>
  </div>
</template>

<script>
import CountUp from '@/components/count-up.vue'

export default {
  components: {
    CountUp
  },
  props: {
    decimalPlaces: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    }
  }
}
</script>

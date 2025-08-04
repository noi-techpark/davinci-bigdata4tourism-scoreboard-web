<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div :class="['min-h-160', borderClass]">
    <div class="mb-3">{{ metric.description }}</div>
    <div :class="'relative'">
      <Spinner
        v-if="metric.loading"
        :containerClass="
          'absolute bg-gray-500 flex justify-center w-full h-full min-h-100 z-1100'
        "
      ></Spinner>
      <div v-if="metric.loadError" class="text-error-500">
        {{ metric.loadError }}
      </div>
      <div v-if="showStats">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/spinner.vue'

export default {
  components: {
    Spinner
  },
  computed: {
    borderClass() {
      const index = this.$store.state.metrics.openMetric
      return `mt-4 p-2 lg:p-3 border-l-8 border-metric${index}-500`
    },
    metric() {
      return this.$store.getters['metrics/currentMetric']
    },
    showStats() {
      return (
        this.metric.loaded ||
        (this.metric.loading &&
          this.metric.results != null &&
          this.metric.results.length)
      )
    }
  }
}
</script>

<style scoped>
.min-h-100 {
  min-height: 100px;
}
.min-h-160 {
  min-height: 160px;
}
</style>

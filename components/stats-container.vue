<template>
  <div :class="'min-h-100'">
    <div>{{ metric.description }}</div>
    <div :class="'relative'">
      <Spinner
        v-if="metric.loading"
        :containerClass="
          'absolute bg-gray-500 flex justify-center w-full h-full min-h-100'
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
</style>

<template>
  <div :class="'flex'">
    <Gauge
      v-for="(gauge, index) in gauges"
      :key="index + gauge.value"
      :class="[
        'flex-1 text-center font-light text-5xl sm:text-2xl md:text-4xl border border-black mr-1',
        { 'ml-1': index !== 0 },
        { 'mr-1': index !== gauges.length - 1 }
      ]"
      :value="gauge.value"
      :title="gauge.title"
      :decimal-places="gauge.decimalPlaces"
      :unit="gauge.unit"
    ></Gauge>
  </div>
</template>

<script>
import Gauge from '@/components/charts/gauge.vue'

export default {
  components: {
    Gauge
  },
  props: {
    gauges: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<template>
  <div :class="'lg:flex'">
    <Gauge
      v-for="(gauge, index) in gauges"
      :key="index + gauge.value"
      :class="[
        'flex-1 text-center font-light text-2xl lg:text-4xl border border-black mb-2 lg:ml-0 lg:mr-0',
        { 'lg:ml-1': index !== 0 },
        { 'lg:mr-1': index !== gauges.length - 1 }
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

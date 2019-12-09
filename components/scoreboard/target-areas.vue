<template>
  <StatsContainer>
    <GaugeList :gauges="gauges"></GaugeList>
    <HorizontalBarChart
      :chartData="chartData"
      :options="chartOptions"
    ></HorizontalBarChart>
  </StatsContainer>
</template>

<script>
import provideDataMixin from './mixins/scoreboard-data.mixin'
import { rgbPalette, rgbaPalette } from '@/components/charts/color-util'
import GaugeList from '@/components/charts/gauge-list.vue'
import HorizontalBarChart from '@/components/charts/group.vue'
import StatsContainer from '@/components/stats-container.vue'

import * as esConfig from '@/meta/elasticsearch/target-areas'
import * as filters from '@/meta/filters'

const NUMBER_OF_TOP_COUNT = 5

const percentage = (total, value) => (total !== 0 ? (100.0 / total) * value : 0)

const buildTopAreas = (result) => {
  const topCount = Math.min(
    NUMBER_OF_TOP_COUNT,
    result[esConfig.propTopAreas].length
  )

  return result[esConfig.propTopAreas].slice(0, topCount).map((c) => ({
    decimalPlaces: 2,
    title: c.name,
    value: percentage(result[esConfig.propTotal], c.value),
    unit: '%'
  }))
}

export default {
  components: {
    GaugeList,
    HorizontalBarChart,
    StatsContainer
  },
  mixins: [provideDataMixin(esConfig, filters.applyQueryFilters)],
  computed: {
    chartData() {
      if (this.metric.results == null) {
        return null
      }

      const result = this.metric.results[0]
      const topAreas = result[esConfig.propTopAreas]
      return {
        labels: topAreas.map((c) => c.name),
        datasets: [
          {
            data: topAreas.map((c) => c.value),
            fill: false,
            backgroundColor: rgbaPalette(topAreas.length, 0.5),
            borderColor: rgbPalette(topAreas.length),
            borderWidth: 1,
            hoverBackgroundColor: rgbaPalette(topAreas.length, 0.8)
          }
        ]
      }
    },
    chartOptions() {
      return {
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          yAxes: [{ ticks: { beginAtZero: true } }]
        },
        title: {
          display: true,
          text: this.metric.title
        }
      }
    },
    gauges() {
      if (this.metric.results == null) {
        return []
      }

      const result = this.metric.results[0]
      return [
        {
          title: 'Different target areas',
          value: result[esConfig.propAreaCount]
        },
        {
          title: 'Total',
          value: result[esConfig.propTotal]
        },
        ...buildTopAreas(result)
      ]
    }
  }
}
</script>

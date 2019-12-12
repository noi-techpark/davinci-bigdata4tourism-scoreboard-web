<template>
  <StatsContainer>
    <GaugeList :gauges="gauges"></GaugeList>
    <HorizontalBarChart
      :chartData="chartData"
      :options="chartOptions"
    ></HorizontalBarChart>

    <Map
      :center="map.center"
      :zoom="map.zoom"
      :markers="map.markers"
      class="mt-5"
    />
  </StatsContainer>
</template>

<script>
import provideDataMixin from './mixins/scoreboard-data.mixin'
import {
  borderRgba64,
  chartRgba64,
  hoverRgba64
} from '@/components/charts/color-util'
import GaugeList from '@/components/charts/gauge-list.vue'
import HorizontalBarChart from '@/components/charts/group.vue'
import Map from '@/components/map.vue'
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

  return result[esConfig.propTopAreas].slice(0, topCount).map((c, index) => ({
    classes: `bg-chart-${index} border-chart-${index} text-white`,
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
    Map,
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
            backgroundColor: chartRgba64,
            borderColor: borderRgba64,
            borderWidth: 1,
            hoverBackgroundColor: hoverRgba64
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
    },
    map() {
      return {
        center: {
          lat: 46.5,
          lng: 11.35
        },
        zoom: 9,
        markers: [
          { lat: 46.51, lng: 11.37 },
          { lat: 46.52, lng: 11.35 },
          { lat: 46.59, lng: 11.41 },
          { lat: 46.57, lng: 11.31 }
        ]
      }
    }
  }
}
</script>

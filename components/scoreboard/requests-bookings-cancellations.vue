<template>
  <StatsContainer>
    <GaugeList :gauges="gauges"></GaugeList>
    <LineChart :chartData="chartData" :options="chartOptions"></LineChart>
  </StatsContainer>
</template>

<script>
import provideDataMixin from './mixins/scoreboard-data.mixin'
import { rgbaPalette } from '@/components/charts/color-util'
import GaugeList from '@/components/charts/gauge-list.vue'
import LineChart from '@/components/charts/year.vue'
import StatsContainer from '@/components/stats-container.vue'

import * as esConfig from '@/meta/elasticsearch/requests-bookings-cancellations'
import * as filters from '@/meta/filters'

const percentage = (total, value) => (total !== 0 ? (100.0 / total) * value : 0)

export default {
  components: {
    GaugeList,
    LineChart,
    StatsContainer
  },
  mixins: [provideDataMixin(esConfig, filters.applyQueryFilters)],
  computed: {
    chartData() {
      if (this.metric.results == null) {
        return null
      }

      const colors = rgbaPalette(3, 0.5)

      const dateHistogram = this.metric.results[0][esConfig.propDateHistogram]
      return {
        labels: dateHistogram.labels,
        datasets: [
          {
            label: 'Requests',
            steppedLine: true,
            data: dateHistogram.requests,
            borderColor: colors[0],
            fill: false
          },
          {
            label: 'Bookings',
            steppedLine: true,
            data: dateHistogram.bookings,
            borderColor: colors[1],
            fill: false
          },
          {
            label: 'Cancellations',
            steppedLine: true,
            data: dateHistogram.cancellations,
            borderColor: colors[2],
            fill: false
          }
        ]
      }
    },
    chartOptions() {
      return {
        maintainAspectRatio: false,
        responsive: true,

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
      const total = result[esConfig.propTotal].value
      return [
        {
          title: 'Total',
          value: total
        },
        {
          decimalPlaces: 2,
          title: 'Requests',
          value: percentage(total, result[esConfig.propRequests].value),
          unit: '%'
        },
        {
          decimalPlaces: 2,
          title: 'Bookings',
          value: percentage(total, result[esConfig.propBookings].value),
          unit: '%'
        },
        {
          decimalPlaces: 2,
          title: 'Cancellations',
          value: percentage(total, result[esConfig.propCancellations].value),
          unit: '%'
        }
      ]
    }
  }
}
</script>

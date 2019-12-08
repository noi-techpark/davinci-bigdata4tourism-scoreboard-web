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

import * as esConfig from '@/meta/elasticsearch/accomodation-category'
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

      const colors = rgbaPalette(5, 0.5)

      const dateHistogram = this.metric.results[0][esConfig.propDateHistogram]
      return {
        labels: dateHistogram.labels,
        datasets: [
          {
            label: 'Hotels 1-3 stars',
            steppedLine: true,
            data: dateHistogram[esConfig.propHotel1to3],
            borderColor: colors[0],
            fill: false
          },
          {
            label: 'Hotels 4-5 stars',
            steppedLine: true,
            data: dateHistogram[esConfig.propHotel4to5],
            borderColor: colors[1],
            fill: false
          },
          {
            label: 'Private accomodations',
            steppedLine: true,
            data: dateHistogram[esConfig.propPrivate],
            borderColor: colors[2],
            fill: false
          },
          {
            label: 'Farms',
            steppedLine: true,
            data: dateHistogram[esConfig.propFarms],
            borderColor: colors[3],
            fill: false
          },
          {
            label: 'Others',
            steppedLine: true,
            data: dateHistogram[esConfig.propOthers],
            borderColor: colors[4],
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
          title: 'Hotel 1-3 stars',
          value: percentage(total, result[esConfig.propHotel1to3].value),
          unit: '%'
        },
        {
          decimalPlaces: 2,
          title: 'Hotel 4-5 stars',
          value: percentage(total, result[esConfig.propHotel4to5].value),
          unit: '%'
        },
        {
          decimalPlaces: 2,
          title: 'Private accomodations',
          value: percentage(total, result[esConfig.propPrivate].value),
          unit: '%'
        },
        {
          decimalPlaces: 2,
          title: 'Farms',
          value: percentage(total, result[esConfig.propFarms].value),
          unit: '%'
        },
        {
          decimalPlaces: 2,
          title: 'Others',
          value: percentage(total, result[esConfig.propOthers].value),
          unit: '%'
        }
      ]
    }
  }
}
</script>

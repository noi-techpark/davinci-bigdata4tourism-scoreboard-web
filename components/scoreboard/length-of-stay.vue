<template>
  <StatsContainer>
    <GaugeList :gauges="gauges"></GaugeList>
    <BarChart :chartData="chartData" :options="chartOptions"></BarChart>
  </StatsContainer>
</template>

<script>
import provideDataMixin from './mixins/scoreboard-data.mixin'
import {
  borderRgba64,
  chartRgba64,
  hoverRgba64
} from '@/components/charts/color-util'
import BarChart from '@/components/charts/bar.vue'
import GaugeList from '@/components/charts/gauge-list.vue'
import StatsContainer from '@/components/stats-container.vue'

import * as esConfig from '@/meta/elasticsearch/length-of-stay'
import * as filters from '@/meta/filters'

const NUMBER_OF_TOP_COUNT = 5

const percentage = (total, value) => (total !== 0 ? (100.0 / total) * value : 0)

const dayText = (days) => `${days} day${days !== 1 ? 's' : ''}`

const buildTopStays = (result) => {
  const topCount = Math.min(
    NUMBER_OF_TOP_COUNT,
    result[esConfig.propLengthOfStay].length
  )

  return result[esConfig.propLengthOfStay]
    .slice(0, topCount)
    .map((stay, index) => ({
      classes: `bg-chart-${index} border-chart-${index} text-white`,
      decimalPlaces: 2,
      title: dayText(stay.days),
      value: percentage(result.total.value, stay.count),
      unit: '%'
    }))
}

export default {
  components: {
    GaugeList,
    BarChart,
    StatsContainer
  },
  mixins: [provideDataMixin(esConfig, filters.applyQueryFilters)],
  computed: {
    chartData() {
      if (this.metric.results == null) {
        return null
      }

      const result = this.metric.results[0]
      const lengthOfStay = result[esConfig.propLengthOfStay]
      return {
        labels: lengthOfStay.map((stay) => dayText(stay.days)),
        datasets: [
          {
            data: lengthOfStay.map((stay) => stay.count),
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
          title: 'Total',
          value: result[esConfig.propTotal].value
        },
        ...buildTopStays(result)
      ]
    }
  }
}
</script>

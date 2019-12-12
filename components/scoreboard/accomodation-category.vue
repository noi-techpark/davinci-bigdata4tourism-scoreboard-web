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

import * as esConfig from '@/meta/elasticsearch/accomodation-category'
import * as filters from '@/meta/filters'

const percentage = (total, value) => (total !== 0 ? (100.0 / total) * value : 0)

export default {
  components: {
    BarChart,
    GaugeList,
    StatsContainer
  },
  mixins: [provideDataMixin(esConfig, filters.applyQueryFilters)],
  computed: {
    chartData() {
      if (this.metric.results == null) {
        return null
      }

      const dateHistogram = this.metric.results[0][esConfig.propDateHistogram]
      return {
        labels: dateHistogram.labels,
        datasets: [
          {
            label: 'Hotels 1-3 stars',
            data: dateHistogram[esConfig.propHotel1to3],
            backgroundColor: chartRgba64[0],
            borderColor: borderRgba64[0],
            hoverBackgroundColor: hoverRgba64[0],
            fill: false
          },
          {
            label: 'Hotels 4-5 stars',
            data: dateHistogram[esConfig.propHotel4to5],
            backgroundColor: chartRgba64[1],
            borderColor: borderRgba64[1],
            hoverBackgroundColor: hoverRgba64[1],
            fill: false
          },
          {
            label: 'Private accomodations',
            data: dateHistogram[esConfig.propPrivate],
            backgroundColor: chartRgba64[2],
            borderColor: borderRgba64[2],
            hoverBackgroundColor: hoverRgba64[2],
            fill: false
          },
          {
            label: 'Farms',
            data: dateHistogram[esConfig.propFarms],
            backgroundColor: chartRgba64[3],
            borderColor: borderRgba64[3],
            hoverBackgroundColor: hoverRgba64[3],
            fill: false
          },
          {
            label: 'Others',
            data: dateHistogram[esConfig.propOthers],
            backgroundColor: chartRgba64[4],
            borderColor: borderRgba64[4],
            hoverBackgroundColor: hoverRgba64[4],
            fill: false
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
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Percentage'
              },
              stacked: true,
              ticks: {
                beginAtZero: true,
                max: 100
              }
            }
          ]
        },
        title: {
          display: true,
          text: this.metric.title
        },
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              const index = tooltipItem.datasetIndex
              const label = data.datasets[index].label
              return `${label}: ${tooltipItem.value}%`
            }
          }
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
          classes: `bg-chart-0 border-chart-0 text-white`,
          decimalPlaces: 2,
          title: 'Hotel 1-3 stars',
          value: percentage(total, result[esConfig.propHotel1to3].value),
          unit: '%'
        },
        {
          classes: `bg-chart-1 border-chart-1 text-white`,
          decimalPlaces: 2,
          title: 'Hotel 4-5 stars',
          value: percentage(total, result[esConfig.propHotel4to5].value),
          unit: '%'
        },
        {
          classes: `bg-chart-2 border-chart-2 text-white`,
          decimalPlaces: 2,
          title: 'Private accomodations',
          value: percentage(total, result[esConfig.propPrivate].value),
          unit: '%'
        },
        {
          classes: `bg-chart-3 border-chart-3 text-white`,
          decimalPlaces: 2,
          title: 'Farms',
          value: percentage(total, result[esConfig.propFarms].value),
          unit: '%'
        },
        {
          classes: `bg-chart-4 border-chart-4 text-white`,
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

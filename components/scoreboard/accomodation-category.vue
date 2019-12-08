<template>
  <StatsContainer>
    <GaugeList :gauges="gauges"></GaugeList>
    <BarChart :chartData="chartData" :options="chartOptions"></BarChart>
  </StatsContainer>
</template>

<script>
import provideDataMixin from './mixins/scoreboard-data.mixin'
import { rgbaPalette } from '@/components/charts/color-util'
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

      const colors = rgbaPalette(5, 0.5)
      const hoverColors = rgbaPalette(5, 0.8)

      const dateHistogram = this.metric.results[0][esConfig.propDateHistogram]
      return {
        labels: dateHistogram.labels,
        datasets: [
          {
            label: 'Hotels 1-3 stars',
            data: dateHistogram[esConfig.propHotel1to3],
            backgroundColor: colors[0],
            borderColor: colors[0],
            hoverBackgroundColor: hoverColors[0],
            fill: false
          },
          {
            label: 'Hotels 4-5 stars',
            data: dateHistogram[esConfig.propHotel4to5],
            backgroundColor: colors[1],
            borderColor: colors[1],
            hoverBackgroundColor: hoverColors[1],
            fill: false
          },
          {
            label: 'Private accomodations',
            data: dateHistogram[esConfig.propPrivate],
            backgroundColor: colors[2],
            borderColor: colors[2],
            hoverBackgroundColor: hoverColors[2],
            fill: false
          },
          {
            label: 'Farms',
            data: dateHistogram[esConfig.propFarms],
            backgroundColor: colors[3],
            borderColor: colors[3],
            hoverBackgroundColor: hoverColors[3],
            fill: false
          },
          {
            label: 'Others',
            data: dateHistogram[esConfig.propOthers],
            backgroundColor: colors[4],
            borderColor: colors[4],
            hoverBackgroundColor: hoverColors[4],
            fill: false
          }
        ]
      }
    },
    chartOptions() {
      return {
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

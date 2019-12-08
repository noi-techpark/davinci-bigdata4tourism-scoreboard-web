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

import * as esConfig from '@/meta/elasticsearch/family-situation'
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
            label: 'Unaccompanied',
            data: dateHistogram[esConfig.propUnaccompanied],
            backgroundColor: colors[0],
            borderColor: colors[0],
            hoverBackgroundColor: hoverColors[0],
            fill: false
          },
          {
            label: 'Groups without children',
            data: dateHistogram[esConfig.propGroupsWithoutChildren],
            backgroundColor: colors[1],
            borderColor: colors[1],
            hoverBackgroundColor: hoverColors[1],
            fill: false
          },
          {
            label: 'Couples without children',
            data: dateHistogram[esConfig.propCouplesWithoutChildren],
            backgroundColor: colors[2],
            borderColor: colors[2],
            hoverBackgroundColor: hoverColors[2],
            fill: false
          },
          {
            label: 'Singles with children',
            data: dateHistogram[esConfig.propSinglesWithChildren],
            backgroundColor: colors[3],
            borderColor: colors[3],
            hoverBackgroundColor: hoverColors[3],
            fill: false
          },
          {
            label: 'Families',
            data: dateHistogram[esConfig.propFamilies],
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
              stacked: true,
              ticks: {
                beginAtZero: true
              }
            }
          ]
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
      const total = result[esConfig.propTotal].value
      return [
        {
          title: 'Total',
          value: result[esConfig.propTotal].value
        },
        {
          decimalPlaces: 2,
          title: 'Unaccompanied',
          value: percentage(total, result[esConfig.propUnaccompanied].value),
          unit: '%'
        },
        {
          decimalPlaces: 2,
          title: 'Groups without children',
          value: percentage(
            total,
            result[esConfig.propGroupsWithoutChildren].value
          ),
          unit: '%'
        },
        {
          decimalPlaces: 2,
          title: 'Couples without children',
          value: percentage(
            total,
            result[esConfig.propCouplesWithoutChildren].value
          ),
          unit: '%'
        },
        {
          decimalPlaces: 2,
          title: 'Singles with children',
          value: percentage(
            total,
            result[esConfig.propSinglesWithChildren].value
          ),
          unit: '%'
        },
        {
          decimalPlaces: 2,
          title: 'Families',
          value: percentage(total, result[esConfig.propFamilies].value),
          unit: '%'
        }
      ]
    }
  }
}
</script>

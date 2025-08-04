<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

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

      const dateHistogram = this.metric.results[0][esConfig.propDateHistogram]
      return {
        labels: dateHistogram.labels,
        datasets: [
          {
            label: 'Single adult',
            data: dateHistogram[esConfig.propSingleAdult],
            backgroundColor: chartRgba64[0],
            borderColor: borderRgba64[0],
            hoverBackgroundColor: hoverRgba64[0],
            fill: false
          },
          {
            label: 'Groups without children',
            data: dateHistogram[esConfig.propGroupsWithoutChildren],
            backgroundColor: chartRgba64[1],
            borderColor: borderRgba64[1],
            hoverBackgroundColor: hoverRgba64[1],
            fill: false
          },
          {
            label: 'Couples without children',
            data: dateHistogram[esConfig.propCouplesWithoutChildren],
            backgroundColor: chartRgba64[2],
            borderColor: borderRgba64[2],
            hoverBackgroundColor: hoverRgba64[2],
            fill: false
          },
          {
            label: 'Singles with children',
            data: dateHistogram[esConfig.propSinglesWithChildren],
            backgroundColor: chartRgba64[3],
            borderColor: borderRgba64[3],
            hoverBackgroundColor: hoverRgba64[3],
            fill: false
          },
          {
            label: 'Families',
            data: dateHistogram[esConfig.propFamilies],
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
          classes: `bg-chart-0 border-chart-0 text-white`,
          decimalPlaces: 2,
          title: 'Single adult',
          value: percentage(total, result[esConfig.propSingleAdult].value),
          unit: '%'
        },
        {
          classes: `bg-chart-1 border-chart-1 text-white`,
          decimalPlaces: 2,
          title: 'Groups without children',
          value: percentage(
            total,
            result[esConfig.propGroupsWithoutChildren].value
          ),
          unit: '%'
        },
        {
          classes: `bg-chart-2 border-chart-2 text-white`,
          decimalPlaces: 2,
          title: 'Couples without children',
          value: percentage(
            total,
            result[esConfig.propCouplesWithoutChildren].value
          ),
          unit: '%'
        },
        {
          classes: `bg-chart-3 border-chart-3 text-white`,
          decimalPlaces: 2,
          title: 'Singles with children',
          value: percentage(
            total,
            result[esConfig.propSinglesWithChildren].value
          ),
          unit: '%'
        },
        {
          classes: `bg-chart-4 border-chart-4 text-white`,
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

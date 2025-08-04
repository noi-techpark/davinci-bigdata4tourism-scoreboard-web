<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <StatsContainer>
    <GaugeList :gauges="gauges"></GaugeList>
    <LineChart :chartData="chartData" :options="chartOptions"></LineChart>
  </StatsContainer>
</template>

<script>
import provideDataMixin from './mixins/scoreboard-data.mixin'
import { chartRgba64 } from '@/components/charts/color-util'
import GaugeList from '@/components/charts/gauge-list.vue'
import LineChart from '@/components/charts/year.vue'
import StatsContainer from '@/components/stats-container.vue'

import * as esConfig from '@/meta/elasticsearch/data-quality'
import * as filters from '@/meta/filters'

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

      const dateHistogram = this.metric.results[0][esConfig.propDateHistogram]
      return {
        labels: dateHistogram.labels,
        datasets: [
          {
            label: 'Sources',
            steppedLine: true,
            data: dateHistogram.data,
            borderColor: chartRgba64[0],
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
        scales: {
          yAxes: [
            {
              ticks: { beginAtZero: true, stepSize: 1 }
            }
          ]
        },
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
      return [
        {
          title: 'Total',
          value: result[esConfig.propTotal]
        },
        {
          title: 'Min. sources',
          value: result[esConfig.propMin]
        },
        {
          title: 'Max. sources',
          value: result[esConfig.propMax]
        }
      ]
    }
  }
}
</script>

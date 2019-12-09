<template>
  <StatsContainer>
    <GaugeList :gauges="gauges"></GaugeList>
    <BarChart :chartData="chartData" :options="chartOptions"></BarChart>
  </StatsContainer>
</template>

<script>
import provideDataMixin from './mixins/scoreboard-data.mixin'
import BarChart from '@/components/charts/bar.vue'
import GaugeList from '@/components/charts/gauge-list.vue'
import StatsContainer from '@/components/stats-container.vue'

import * as esConfig from '@/meta/elasticsearch/time-until-arrival'
import * as filters from '@/meta/filters'

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

      const result = this.metric.results[0]
      const days = result[esConfig.propDays]
      return {
        labels: days.map((day) => day.name),
        datasets: [
          {
            data: days.map((day) => day.value),
            fill: false,
            borderWidth: 1
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
          title: 'Min.',
          value: result[esConfig.propMin]
        },
        {
          title: 'Max.',
          value: result[esConfig.propMax]
        },
        {
          title: 'Average',
          value: result[esConfig.propAvg]
        }
      ]
    }
  }
}
</script>

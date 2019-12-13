<template>
  <StatsContainer>
    <GaugeList :gauges="gauges"></GaugeList>
    <HorizontalBarChart
      :chartData="chartData"
      :options="chartOptions"
    ></HorizontalBarChart>

    <div v-if="geojson == null">
      Loading Map...
    </div>
    <div class="metric-map mt-5">
      <Map :zoom="4">
        <template v-slot:layers>
          <l-choropleth-layer
            :data="choroplethData"
            :geojson="geojson"
            :colorScale="colorScale"
            :value="{
              key: 'value',
              metric: 'visitors'
            }"
            geojson-id-key="iso_a2"
            title-key="name"
            id-key="code"
          >
            <template slot-scope="props">
              <l-info-control
                :item="props.currentItem"
                :unit="props.unit"
                title="Target area"
                placeholder="Hover over an area"
              />
              <l-reference-chart
                :colorScale="colorScale"
                :min="props.min"
                :max="props.max"
                title="Visitors"
                position="topright"
              />
            </template>
          </l-choropleth-layer>
        </template>
      </Map>
    </div>
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
import Map from '@/components/map/map.vue'
import StatsContainer from '@/components/stats-container.vue'

import * as esConfig from '@/meta/elasticsearch/country-of-origin'
import * as filters from '@/meta/filters'

const NUMBER_OF_TOP_COUNT = 5

const percentage = (total, value) => (total !== 0 ? (100.0 / total) * value : 0)

const buildTopCountries = (result) => {
  const topCount = Math.min(
    NUMBER_OF_TOP_COUNT,
    result[esConfig.propTopCountries].length
  )

  return result[esConfig.propTopCountries]
    .slice(0, topCount)
    .map((c, index) => ({
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
      const topCountries = result[esConfig.propTopCountries]
      return {
        labels: topCountries.map((c) => c.name),
        datasets: [
          {
            data: topCountries.map((c) => c.value),
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
          title: 'Countries',
          value: result[esConfig.propCountryCount]
        },
        {
          title: 'Total',
          value: result[esConfig.propTotal]
        },
        ...buildTopCountries(result)
      ]
    },
    choroplethData() {
      return this.$store.state.metrics.metrics[4].results[0].countries
    },
    colorScale() {
      return ['e7d090', 'e9ae7b', 'de7062']
    }
  },
  mounted() {
    import('@/assets/geojson/world.geo.json').then(
      (data) => (this.geojson = data.default)
    )
  }
}
</script>

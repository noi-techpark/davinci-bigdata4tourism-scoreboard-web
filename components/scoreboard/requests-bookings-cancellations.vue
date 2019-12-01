<template>
  <StatsContainer>
    <GaugeList :gauges="gauges"></GaugeList>
  </StatsContainer>
</template>

<script>
import provideDataMixin from './mixins/scoreboard-data.mixin'
import GaugeList from '@/components/charts/gauge-list.vue'
import StatsContainer from '@/components/stats-container.vue'

import * as esConfig from '@/meta/elasticsearch/requests-bookings-cancellations'
import * as filters from '@/meta/filters'

const percentage = (total, value) => (total !== 0 ? (100.0 / total) * value : 0)

export default {
  components: {
    GaugeList,
    StatsContainer
  },
  mixins: [provideDataMixin(esConfig, filters.applyQueryFilters)],
  computed: {
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

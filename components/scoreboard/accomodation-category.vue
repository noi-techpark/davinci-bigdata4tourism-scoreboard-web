<template>
  <StatsContainer>
    <GaugeList :gauges="gauges"></GaugeList>
  </StatsContainer>
</template>

<script>
import provideDataMixin from './mixins/scoreboard-data.mixin'
import GaugeList from '@/components/charts/gauge-list.vue'
import StatsContainer from '@/components/stats-container.vue'

import * as esConfig from '@/meta/elasticsearch/accomodation-category'
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
        }
      ]
    }
  }
}
</script>

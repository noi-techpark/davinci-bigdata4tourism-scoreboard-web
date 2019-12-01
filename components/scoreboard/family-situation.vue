<template>
  <StatsContainer>
    <GaugeList :gauges="gauges"></GaugeList>
  </StatsContainer>
</template>

<script>
import provideDataMixin from './mixins/scoreboard-data.mixin'
import GaugeList from '@/components/charts/gauge-list.vue'
import StatsContainer from '@/components/stats-container.vue'

import * as esConfig from '@/meta/elasticsearch/family-situation'
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

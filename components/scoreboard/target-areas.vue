<template>
  <StatsContainer>
    <GaugeList :gauges="gauges"></GaugeList>
  </StatsContainer>
</template>

<script>
import provideDataMixin from './mixins/scoreboard-data.mixin'
import GaugeList from '@/components/charts/gauge-list.vue'
import StatsContainer from '@/components/stats-container.vue'

import * as esConfig from '@/meta/elasticsearch/target-areas'
import * as filters from '@/meta/filters'

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
      return [
        {
          title: 'Total',
          value: result[esConfig.propTotal].value
        },
        {
          title: 'Different target areas',
          value: result[esConfig.propAreaCount].value
        }
      ]
    }
  }
}
</script>

// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export default (esConfig, enhanceQuery) => {
  return {
    computed: {
      mappers() {
        return [esConfig.resultBuilder]
      },
      metric() {
        return this.$store.getters['metrics/currentMetric']
      },
      queries() {
        return [
          enhanceQuery({
            query: esConfig.query,
            globalFilters: this.$store.state.metrics.globalFilters
          })
        ]
      }
    },
    destroyed() {
      this.unsubscribe()
    },
    mounted() {
      this.loadMetric()
      this.unsubscribe = this.$store.subscribeAction({
        after: (action) => {
          if (action.type === 'metrics/toggleGlobalFilter') {
            this.loadMetric()
          }
        }
      })
    },
    methods: {
      loadMetric() {
        this.$store.dispatch('metrics/loadMetric', {
          metric: this.metric,
          queries: this.queries,
          mappers: this.mappers
        })
      }
    }
  }
}

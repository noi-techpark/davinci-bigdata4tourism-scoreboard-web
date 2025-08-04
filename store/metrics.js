// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import filters from '@/meta/filters'
import metrics from '@/meta/metrics'

export const state = () => ({
  metrics,
  openMetric: 0,
  globalFilters: {
    ...filters.reduce((prev, curr) => ({ ...prev, [curr.name]: [] }), {}),
    visible: false
  }
})

export const getters = {
  currentMetric: (state) => {
    const openMetric = state.openMetric
    return state.metrics[openMetric]
  },
  currentComponent: (state) => {
    const openMetric = state.openMetric
    return state.metrics[openMetric].component
  },
  filterAsMap: (state) => (name) => {
    const filters = state.globalFilters[name]
    return filters.reduce((prev, curr) => ({ ...prev, [curr]: curr }), {})
  },
  isMetricOpen: (state) => (index) => {
    return state.openMetric === index
  }
}

export const mutations = {
  loadMetric(state, { index }) {
    const metrics = [...state.metrics]
    metrics[index].loading = true
    metrics[index].loaded = false
    metrics[index].loadError = null
    state.metrics = metrics
  },
  loadMetricError(state, { index, message }) {
    const metrics = [...state.metrics]
    metrics[index].loading = false
    metrics[index].loaded = false
    metrics[index].loadError = message
    state.metrics = metrics
  },
  metricLoaded(state, { index, results }) {
    const metrics = [...state.metrics]
    metrics[index].loading = false
    metrics[index].loaded = true
    metrics[index].loadError = null
    metrics[index].results = results
    state.metrics = metrics
  },
  resetMetrics(state) {
    const metrics = [...state.metrics]

    metrics.forEach((metric) => {
      metric.loading = false
      metric.loaded = false
      metric.loadError = null
    })
    state.metrics = metrics
  },
  openMetric(state, index) {
    state.openMetric = index
  },
  closeMetric(state) {
    state.openMetric = null
  },
  movemap(state, { center, zoom }) {
    const index = state.openMetric
    const metrics = [...state.metrics]
    metrics[index] = { ...metrics[index], map: { center, zoom } }
    state.metrics = metrics
  },
  toggleGlobalFilter(state, { name, value }) {
    const filter = [...state.globalFilters[name]]
    const index = filter.findIndex((i) => i === value)

    if (index >= 0) {
      filter.splice(index, 1)
    } else {
      filter.push(value)
    }

    state.globalFilters[name] = filter
  }
}

export const actions = {
  async loadMetric({ commit, state }, { metric, queries, mappers }) {
    if (metric.loaded || metric.loading) return

    const id = metric.id
    const index = state.metrics.findIndex((m) => m.id === id)

    try {
      commit('loadMetric', { index })

      if (queries.length !== mappers.length) {
        commit('loadMetricError', {
          index,
          message: `The number of queries (${queries.length}) and mappers (${mappers.length}) differ`
        })
      }

      const responses = await this.$esClient.msearch(queries)
      const responseData = responses.data.responses

      if (responseData.length !== queries.length) {
        commit('loadMetricError', {
          index,
          message: `The number of queries (${queries.length}) and responses (${responseData.length}) differ`
        })
        return
      }

      const results = []
      for (let i = 0; i < responseData.length; i++) {
        const response = responseData[i]
        const mapper = mappers[i]
        const result = mapper(response)
        results.push(result)
      }

      commit('metricLoaded', { index, results })
    } catch (err) {
      commit('loadMetricError', {
        index,
        message: err.message ? err.message : err
      })
      // eslint-disable-next-line
      console.error(err)
    }
  },
  movemap({ commit }, { center, zoom }) {
    commit('movemap', { center, zoom })
  },
  toggleGlobalFilter({ commit }, { name, value }) {
    commit('resetMetrics')
    commit('toggleGlobalFilter', { name, value })
  }
}

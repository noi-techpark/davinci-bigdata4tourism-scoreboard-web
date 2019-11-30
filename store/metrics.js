import Vue from 'vue'
import territories from '@/meta/territories'
import nace from '@/meta/nace'
import metrics from '@/meta/metrics'

export const state = () => ({
  loaded: false,
  repaint: {
    territories: false
  },
  territories,
  selectedTerritories: [],
  nace,
  metrics,
  openMetric: 0
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
  isMetricOpen: (state) => (index) => {
    return state.openMetric === index
  },
  hasDataByNace: (state) => (index) => {
    return state.metrics[index].dataByNace !== null
  },
  getDataByTerritory: (state) => (index) => {
    return state.metrics[index].dataByTerritory
  },
  getDataByNace: (state) => (index) => {
    return state.metrics[index].dataByNace
  },
  getYears: (state) => (index) => {
    const data = state.metrics[index].dataByTerritory

    if (data === undefined) return []

    return data[Object.keys(data)[0]]
      .sort((yearA, yearB) => {
        return parseInt(yearA.year) - parseInt(yearB.year)
      })
      .map((year) => {
        return year.year
      })
  },
  getTerritoryLabel: (state) => (territory) => {
    return state.territories[territory]
  }
}

export const mutations = {
  loadMetric(state, { index }) {
    const metrics = state.metrics
    metrics[index].loading = true
    metrics[index].loaded = false
    metrics[index].loadError = null
    state.metrics = [...metrics]
  },
  loadMetricError(state, { index, message }) {
    const metrics = state.metrics
    state.metrics[index].loading = false
    state.metrics[index].loaded = false
    state.metrics[index].loadError = message
    state.metrics = [...metrics]
  },
  metricLoaded(state, { index, results }) {
    const metrics = state.metrics
    metrics[index].loading = false
    metrics[index].loaded = true
    metrics[index].loadError = null
    metrics[index].results = results
    state.metrics = [...metrics]
  },
  startRepaint(state, part) {
    state.repaint[part] = true
  },
  finishRepaint(state, part) {
    state.repaint[part] = false
  },
  openMetric(state, index) {
    state.openMetric = index
  },
  closeMetric(state) {
    state.openMetric = null
  },
  selectTerritories(state, selectedTerritories) {
    state.selectedTerritories = selectedTerritories
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
      if (metric.loaded === true) {
        return
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
    }
  },
  selectTerritories({ commit }, selectedTerritories) {
    commit('selectTerritories', selectedTerritories)
    commit('startRepaint', 'territories')

    Vue.nextTick(() => {
      commit('finishRepaint', 'territories')
    })
  }
}

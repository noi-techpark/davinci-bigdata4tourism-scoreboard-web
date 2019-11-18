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
  openMetric: null
})

export const getters = {
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
  loadingMetrics(state) {
    state.loaded = true
  },
  metricsLoaded(state) {
    state.loaded = true
  },
  metricLoaded(state, { id, dataByTerritory, dataByNace }) {
    state.metrics.forEach((metric) => {
      if (metric.id !== id) return

      metric.dataByTerritory = dataByTerritory
      metric.dataByNace = dataByNace

      const latest = dataByTerritory.ITD1.reduce(
        (previousValue, currentValue) => {
          if (parseInt(previousValue.year) > parseInt(currentValue.year)) {
            return previousValue
          } else {
            return currentValue
          }
        }
      )

      metric.value = latest.total
    })
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
  async load({ commit }) {
    try {
      commit('loadingMetrics')

      const request0 = this.$axios('/tourism-nifi_2020/_count?q=booking:true')

      const responses = await Promise.all([request0])

      commit('metricLoaded', {
        id: 'metric0',
        dataByTerritory: responses[0].data.statistics,
        dataByNace: responses[6].data.statistics
      })

      commit('metricsLoaded')
    } catch (e) {}
  },
  selectTerritories({ commit }, selectedTerritories) {
    commit('selectTerritories', selectedTerritories)
    commit('startRepaint', 'territories')

    Vue.nextTick(() => {
      commit('finishRepaint', 'territories')
    })
  }
}

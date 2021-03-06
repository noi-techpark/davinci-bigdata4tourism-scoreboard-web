import Vue from 'vue'
import * as L from 'leaflet'
import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth'

Vue.component('l-info-control', InfoControl)
Vue.component('l-reference-chart', ReferenceChart)
Vue.component('l-choropleth-layer', ChoroplethLayer)

const LeafletPlugin = {
  install(Vue) {
    // Expose Leaflet
    Vue.prototype.$L = L
  }
}

Vue.use(LeafletPlugin)

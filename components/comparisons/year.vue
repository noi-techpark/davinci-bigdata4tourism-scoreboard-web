<template>
  <div>
    <div class="flex justify-between items-center">
      <div>
        <SelectableButton
          v-for="(selectedTerritory, id) in selectedTerritories"
          :key="id"
          :text="territories[selectedTerritory]"
          :value="selectedTerritory"
          :selected-value="markedTerritory"
          :selected-color="metric.id"
          :click="markTerritory"
          class="my-1 mr-3"
        />
      </div>

      <SelectTerritories class="my-1 flex items-center" />
    </div>

    <div class="mt-5 pb-2 overflow-x-scroll md:overflow-auto">
      <YearChart :chart-data="data" :y-axix-unit="metric.unit" class="chart" />
    </div>
  </div>
</template>

<script>
import SelectableButton from '@/components/selectable-button.vue'
import SelectTerritories from '@/components/select-territories.vue'
import YearChart from '@/components/charts/year.vue'

import {
  DATASET_COLOR_LINE_NORMAL,
  DATASET_COLOR_METRICS,
  hslToColor
} from '@/components/charts/config'

export default {
  components: {
    SelectableButton,
    SelectTerritories,
    YearChart
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    metric: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      markedTerritory: null
    }
  },
  computed: {
    territories() {
      return this.$store.state.metrics.territories
    },
    selectedTerritories() {
      return this.$store.state.metrics.selectedTerritories
    },
    hasMarkedTerritory() {
      return (
        this.markedTerritory !== null &&
        this.selectedTerritories.includes(this.markedTerritory)
      )
    },
    data() {
      const data = this.$store.getters['metrics/getDataByTerritory'](this.index)
      const years = this.$store.getters['metrics/getYears'](this.index)

      const datasets = this.$store.state.metrics.selectedTerritories.map(
        (territory) => {
          const hsl = this.isTerritoryMarked(territory)
            ? DATASET_COLOR_METRICS[this.metric.id]
            : DATASET_COLOR_LINE_NORMAL

          const color = hslToColor(hsl.hue, hsl.sat, hsl.light)

          return {
            data: years.map((year) => {
              return data[territory].find((item) => {
                return item.year === year
              }).total
            }),
            label: this.$store.getters['metrics/getTerritoryLabel'](
              territory
            ).toUpperCase(),
            fill: false,
            borderColor: color,
            pointStyle: 'rect',
            pointRadius: 8,
            pointHoverRadius: 10,
            pointBackgroundColor: color,
            pointHoverBackgroundColor: color,
            pointBorderColor: color,
            pointHoverBorderColor: color,
            lineTension: 0
          }
        }
      )

      if (this.hasMarkedTerritory) {
        const markedTerritoryIndex = this.selectedTerritories.indexOf(
          this.markedTerritory
        )
        const markedDataset = datasets[markedTerritoryIndex]

        datasets.splice(markedTerritoryIndex, 1)

        datasets.unshift(markedDataset)
      }

      return {
        labels: years,
        datasets
      }
    }
  },
  methods: {
    isTerritoryMarked(territory) {
      return this.markedTerritory === territory
    },
    markTerritory(territory) {
      if (this.isTerritoryMarked(territory)) {
        this.markedTerritory = null
      } else {
        this.markedTerritory = territory
      }
    },
    openTerritoriesSelection() {},
    closeTerritoriesSelection() {}
  }
}
</script>

<style scoped>
.chart {
  min-width: 800px;
}

@screen md {
  .chart {
    min-width: 0;
  }
}
</style>

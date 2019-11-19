<template>
  <div>
    <div class="flex justify-between items-center">
      <div>
        <SelectableButton
          v-for="group in metric.groups"
          :key="group.id"
          :text="group.name"
          :value="group.id"
          :selected-value="markedGroup"
          :selected-color="metric.id"
          :click="markGroup"
          class="my-1 mr-3"
        />
      </div>

      <SelectYear
        :years="years"
        :selected-year="selectedYear"
        :select-year="selectYear"
        class="my-1 flex items-center"
      />
    </div>

    <div
      v-if="!repaintTerritories"
      class="mt-5 pb-2 overflow-x-scroll md:overflow-hidden"
    >
      <GroupChart
        :chart-data="data"
        :style="{ height: data.datasets[0].data.length * 80 + 'px' }"
        class="chart"
      />
    </div>

    <div v-if="hasMarkedGroup" class="mt-5 flex flex-wrap">
      <div
        v-for="(item, id) in legend"
        :key="id"
        class="ml-4 mb-2 flex items-center font-thin uppercase"
      >
        <div
          :style="{
            'background-color': item.color
          }"
          class="mr-2 w-3 h-3"
        />
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import SelectableButton from '@/components/selectable-button.vue'
import SelectYear from '@/components/select-year.vue'
import GroupChart from '@/components/charts/group.vue'
import {
  DATASET_COLOR_BAR_NORMAL,
  DATASET_COLOR_METRICS,
  hslToColor
} from '@/components/charts/config'

export default {
  components: {
    SelectableButton,
    SelectYear,
    GroupChart
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    metric: {
      type: Object,
      required: true
    },
    selectedYear: {
      type: String,
      required: true
    },
    selectYear: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      markedGroup: null
    }
  },
  computed: {
    repaintTerritories() {
      return this.$store.state.metrics.repaint.territories
    },
    territories() {
      return this.$store.state.metrics.territories
    },
    selectedTerritories() {
      return this.$store.state.metrics.selectedTerritories
    },
    years() {
      return this.$store.getters['metrics/getYears'](this.index)
    },
    hasMarkedGroup() {
      return this.markedGroup !== null
    },
    markedGroupDetails() {
      return this.metric.groups.find((group) => {
        return group.id === this.markedGroup
      })
    },
    legend() {
      return Object.entries(this.markedGroupDetails.values).map(
        (entry, index, entries) => {
          return {
            name: entry[1],
            color: this.lightenColor(
              DATASET_COLOR_BAR_NORMAL,
              index,
              entries.length
            )
          }
        }
      )
    },
    data() {
      const data = this.$store.getters['metrics/getDataByTerritory'](this.index)

      const territoriesLabels = this.selectedTerritories.map((territory) => {
        return this.$store.getters['metrics/getTerritoryLabel'](
          territory
        ).toUpperCase()
      })

      const datasets = []

      if (this.hasMarkedGroup) {
        Object.keys(this.markedGroupDetails.values).map((value, i, values) => {
          const datasetData = []
          const datasetColor = []

          this.selectedTerritories.forEach((id) => {
            const hsl =
              id === 'ITD1'
                ? DATASET_COLOR_METRICS[this.metric.id]
                : DATASET_COLOR_BAR_NORMAL

            const color = this.lightenColor(hsl, i, values.length)

            datasetData.push(
              data[id]
                .find((year) => {
                  return year.year === this.selectedYear
                })
                .groups.find((g) => {
                  return g.id === this.markedGroup
                }).values[value]
            )

            datasetColor.push(color)
          })

          datasets.push({
            data: datasetData,
            borderWidth: 0,
            backgroundColor: datasetColor,
            hoverBackgroundColor: datasetColor,
            borderColor: datasetColor,
            hoverBorderColor: datasetColor,
            label: this.markedGroupDetails.values[value]
          })
        })
      } else {
        const datasetData = []
        const datasetColor = []

        this.selectedTerritories.forEach((id) => {
          datasetData.push(
            data[id].find((year) => {
              return year.year === this.selectedYear
            }).total
          )

          datasetColor.push(
            id === 'ITD1'
              ? this.lightenColor(DATASET_COLOR_METRICS[this.metric.id], 0, 1)
              : this.lightenColor(DATASET_COLOR_BAR_NORMAL, 0, 1)
          )
        })

        datasets.push({
          data: datasetData,
          borderWidth: 0,
          backgroundColor: datasetColor,
          hoverBackgroundColor: datasetColor,
          borderColor: datasetColor,
          hoverBorderColor: datasetColor
        })
      }

      return {
        labels: territoriesLabels,
        datasets
      }
    }
  },
  methods: {
    isGroupMarked(group) {
      return this.markedGroup === group
    },
    markGroup(group) {
      if (this.isGroupMarked(group)) {
        this.markedGroup = null
      } else {
        this.markedGroup = group
      }
    },
    lightenColor(hsl, index, count) {
      const light = hsl.light + ((100 - hsl.light) / count) * index

      return hslToColor(hsl.hue, hsl.sat, light)
    }
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

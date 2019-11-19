<template>
  <div>
    <div>
      <div class="flex justify-between items-center">
        <div class="font-bold text-xl uppercase">
          {{ metric.title }} in Italy devided by Nace
        </div>

        <SelectYear
          :years="years"
          :selected-year="selectedYear"
          :select-year="selectYear"
          class="my-1"
        />
      </div>
    </div>
    <div class="mt-3 pb-2 flex flex-col md:flex-row">
      <div class="mb-4 md:mb-0 flex-1 flex flex-col">
        <div>
          <SelectableButton
            v-for="group in nace"
            :key="group.id"
            :text="group.name"
            :value="group.id"
            :selected-value="markedGroupId"
            :selected-color="metric.id"
            :click="markGroup"
            class="my-1 mr-3"
          />
        </div>
        <div
          v-if="!hasMarkedGroup"
          class="mt3 flex flex-wrap justify-between md:justify-start"
        >
          <div
            v-for="group in groupsWithValue"
            :key="group.id"
            class="my-3 mr-3 w-full sm:w-1/3 md:w-1/4"
          >
            <button
              :class="group.class"
              @click="markGroup(group.id)"
              class="text-left"
            >
              {{ group.name }}
            </button>
            <br />
            <span :class="'text-' + metric.id + '-500'" class="font-bold">{{
              group.value
            }}</span>
          </div>
        </div>
        <div
          v-if="hasMarkedGroup"
          class="mt-3 flex flex-wrap justify-between md:justify-start"
        >
          <div
            v-for="subgroup in subgroupsOfMarkedGroupWithValues"
            :key="subgroup.id"
            class="my-3 mr-3 w-full sm:w-1/3 md:w-1/4"
          >
            <button
              :class="subgroup.class"
              @click="markSubgroup(subgroup.id)"
              class="text-left"
            >
              {{ subgroup.name }}
            </button>
            <br />
            <span :class="'text-' + metric.id + '-500'" class="font-bold">{{
              subgroup.value
            }}</span>
          </div>
        </div>
      </div>

      <NaceChart :chart-data="data" :options="options" class="flex-1" />
    </div>
  </div>
</template>

<script>
import SelectableButton from '@/components/selectable-button.vue'
import SelectYear from '@/components/select-year.vue'
import NaceChart from '@/components/charts/nace.vue'

import {
  DATASET_COLOR_PIE_NORMAL,
  DATASET_COLOR_METRICS,
  hslToColor
} from '@/components/charts/config'

export default {
  components: {
    SelectableButton,
    SelectYear,
    NaceChart
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
      markedGroupId: null,
      markedSubgroupId: null
    }
  },
  computed: {
    nace() {
      return this.$store.state.metrics.nace
    },
    years() {
      return this.$store.getters['metrics/getYears'](this.index)
    },
    hasMarkedGroup() {
      return this.markedGroupId !== null
    },
    hasMarkedSubgroup() {
      return this.markedSubgroupId !== null
    },
    markedGroup() {
      if (!this.hasMarkedGroup) {
        return null
      }

      return this.nace.find((group) => {
        return this.isGroupMarked(group.id)
      })
    },
    markedSubgroup() {
      if (!this.hasMarkedSubgroup) {
        return null
      }

      return this.markedGroupId.subgroups((subgroup) => {
        return this.isSubgroupMarked(subgroup.id)
      })
    },
    dataFromSelectedYear() {
      return {}
    },
    groupsWithValue() {
      return this.nace.map((group) => {
        let value = 'NO DATA'

        if (
          group.id in this.dataFromSelectedYear &&
          this.dataFromSelectedYear[group.id] !== null
        ) {
          value =
            this.dataFromSelectedYear[group.id].toLocaleString('de-DE') +
            ' ' +
            this.metric.unit
        }

        return {
          id: group.id,
          name: group.name,
          value,
          class: 'text-black-500 hover:text-' + this.metric.id + '-500'
        }
      })
    },
    subgroupsOfMarkedGroupWithValues() {
      if (!this.hasMarkedGroup) {
        return null
      }

      return this.markedGroup.subgroups.map((subgroup) => {
        let value = 'NO DATA'

        if (
          subgroup.id in this.dataFromSelectedYear &&
          this.dataFromSelectedYear[subgroup.id] !== null
        ) {
          value =
            this.dataFromSelectedYear[subgroup.id].toLocaleString('de-DE') +
            ' ' +
            this.metric.unit
        }

        return {
          id: subgroup.id,
          name: subgroup.name,
          value,
          class:
            this.markedSubgroupId === subgroup.id
              ? 'text-' +
                this.metric.id +
                '-500 hover:text-' +
                this.metric.id +
                '-500'
              : 'text-black-500 hover:text-' + this.metric.id + '-500'
        }
      })
    },
    data() {
      const data = this.dataFromSelectedYear

      const metricColor = DATASET_COLOR_METRICS[this.metric.id]

      const normalColor = hslToColor(
        DATASET_COLOR_PIE_NORMAL.hue,
        DATASET_COLOR_PIE_NORMAL.sat,
        DATASET_COLOR_PIE_NORMAL.light
      )
      const markedColor = [
        hslToColor(metricColor.hue, metricColor.sat, metricColor.light),
        hslToColor(
          metricColor.hue,
          metricColor.sat,
          (100 - metricColor.light) * 0.5 + metricColor.light
        )
      ]
      const hoverColor = markedColor

      const dataset = {
        data: [],
        label: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }

      if (this.hasMarkedGroup) {
        this.nace.forEach((group, index) => {
          if (this.markedGroupId !== group.id) {
            return
          }

          group.subgroups.forEach((subgroup) => {
            dataset.data.push(data[subgroup.id])
            dataset.label.push(subgroup.name.toUpperCase())

            if (
              !this.hasMarkedSubgroup ||
              this.markedSubgroupId === subgroup.id
            ) {
              dataset.backgroundColor.push(markedColor[index])
              dataset.hoverBackgroundColor.push(hoverColor[index])
            } else {
              dataset.backgroundColor.push(normalColor)
              dataset.hoverBackgroundColor.push(hoverColor[index])
            }
          })
        })
      } else {
        this.nace.forEach((group, index) => {
          dataset.data.push(data[group.id])
          dataset.label.push(group.name.toUpperCase())
          dataset.backgroundColor.push(markedColor[index])
          dataset.hoverBackgroundColor.push(hoverColor[index])
        })
      }

      return {
        datasets: [dataset]
      }
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        rotation: Math.PI * (this.hasMarkedGroup ? 1 : 0.5),
        circumference: Math.PI * (this.hasMarkedGroup ? 1 : 2),
        tooltips: {
          callbacks: {
            label(tooltipItems, data) {
              const dataset = data.datasets[tooltipItems.datasetIndex]
              const value = dataset.data[tooltipItems.index]
              const label =
                dataset.label === undefined
                  ? data.labels[tooltipItems.index]
                  : dataset.label[tooltipItems.index]

              return label + ': ' + value.toLocaleString('de-DE')
            }
          }
        }
      }
    }
  },
  methods: {
    isGroupMarked(groupId) {
      return this.markedGroupId === groupId
    },
    isSubgroupMarked(subgroupId) {
      return this.markedSubgroupId === subgroupId
    },
    markGroup(groupId) {
      if (this.isGroupMarked(groupId)) {
        this.markedGroupId = null
        this.markedSubgroupId = null
      } else {
        this.markedGroupId = groupId
        this.markedSubgroupId = null
      }
    },
    markSubgroup(subgroupId) {
      if (this.isSubgroupMarked(subgroupId)) {
        this.markedSubgroupId = null
      } else {
        this.markedSubgroupId = subgroupId
      }
    }
  }
}
</script>

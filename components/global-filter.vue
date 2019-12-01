<template>
  <div>
    <button
      slot="button"
      v-if="!visible"
      @click="toggleVisibility"
      class="text-black hover:text-gray-500"
    >
      <ConfigIcon class="icon fill-current" />
      <span class="sr-only">Open global filters</span>
    </button>

    <button
      slot="button"
      v-if="visible"
      @click="toggleVisibility"
      class="text-black hover:text-gray-500"
    >
      <CloseIcon class="icon fill-current" />
      <span class="sr-only">Close global filters</span>
    </button>

    <div v-if="visible">
      <div v-for="filter in filters" :key="filter.name">
        <SelectableButton
          v-for="data in filter.values"
          :key="data.value"
          :text="data.text"
          :value="data.value"
          :selected-value="filterAsMap(filter.name)[data.value]"
          :selected-color="filterActive"
          :click="toggle(filter.name, data.value)"
          class="my-1 mr-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CloseIcon from '@/components/icons/close.vue'
import ConfigIcon from '@/components/icons/config.vue'
import SelectableButton from '@/components/selectable-button.vue'

export default {
  components: {
    CloseIcon,
    ConfigIcon,
    SelectableButton
  },
  props: {
    filterActive: {
      type: String,
      default: () => 'filterActive'
    },
    filters: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    visible() {
      return this.$store.state.metrics.globalFilters.visible
    },
    ...mapGetters({
      filterAsMap: 'metrics/filterAsMap'
    })
  },
  methods: {
    toggle(name, value) {
      return () => {
        this.$store.dispatch('metrics/toggleGlobalFilter', { name, value })
      }
    },
    toggleVisibility() {
      this.$store.dispatch('metrics/toggleGlobalFiltersVisibility')
    }
  }
}
</script>

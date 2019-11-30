<template>
  <div>
    <button
      slot="button"
      v-if="!visible"
      @click="toggleFiltersVisibility"
      class="text-black hover:text-gray-500"
    >
      <ConfigIcon class="icon fill-current" />
      <span class="sr-only">Open global filters</span>
    </button>

    <button
      slot="button"
      v-if="visible"
      @click="toggleFiltersVisibility"
      class="text-black hover:text-gray-500"
    >
      <CloseIcon class="icon fill-current" />
      <span class="sr-only">Close global filters</span>
    </button>

    <div v-if="visible">
      <div>
        <SelectableButton
          v-for="data in years"
          :key="data.value"
          :text="data.text"
          :value="data.value"
          :selected-value="1"
          :selected-color="2"
          class="my-1 mr-3"
        />
      </div>

      <div>
        <SelectableButton
          v-for="data in types"
          :key="data.value"
          :text="data.text"
          :value="data.value"
          :selected-value="1"
          :selected-color="2"
          class="my-1 mr-3"
        />
      </div>

      <div>
        <SelectableButton
          v-for="data in categories"
          :key="data.value"
          :text="data.text"
          :value="data.value"
          :selected-value="1"
          :selected-color="2"
          class="my-1 mr-3"
        />
      </div>

      <div>
        <SelectableButton
          v-for="data in family"
          :key="data.value"
          :text="data.text"
          :value="data.value"
          :selected-value="1"
          :selected-color="2"
          class="my-1 mr-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from '@/components/icons/close.vue'
import ConfigIcon from '@/components/icons/config.vue'
import SelectableButton from '@/components/selectable-button.vue'

export default {
  components: {
    CloseIcon,
    ConfigIcon,
    SelectableButton
  },
  computed: {
    categories() {
      return [
        { text: 'Hotel 1-3 stars', value: 1 },
        { text: 'Hotel 4-5 stars', value: 2 },
        { text: 'Private accomodations', value: 3 },
        { text: 'Farms', value: 4 },
        { text: 'Others', value: 5 }
      ]
    },
    family() {
      return [
        { text: 'Unaccompanied', value: 0 },
        { text: 'Groups without children', value: 1 },
        { text: 'Couples without children', value: 2 },
        { text: 'Singles with children', value: 3 },
        { text: 'Families', value: 4 },
        { text: 'Others', value: 5 }
      ]
    },
    types() {
      return [
        { text: 'Requests', value: 0 },
        { text: 'Bookings', value: 1 },
        { text: 'Cancellations', value: 2 }
      ]
    },
    visible() {
      return this.$store.state.metrics.globalFilters.visible
    },
    years() {
      return [
        { text: '2016', value: 2016 },
        { text: '2017', value: 2017 },
        { text: '2018', value: 2018 },
        { text: '2019', value: 2019 },
        { text: '2020', value: 2020 }
      ]
    }
  },
  methods: {
    toggleFiltersVisibility() {
      this.$store.dispatch('metrics/toggleGlobalFiltersVisibility')
    }
  }
}
</script>

<template>
  <div
    v-if="!visible"
    class="sticky top-0 z-2000 bg-white border border-black mb-3"
  >
    <Modal>
      <button
        slot="button"
        slot-scope="{ openModal }"
        @click="openModal"
        class="flex w-full p-2 text-black hover:text-gray-500"
      >
        <ConfigIcon class="self-center mr-2"></ConfigIcon>
        <span class="self-center text-xl">CONFIGURE FILTERS</span>
      </button>

      <div
        slot="modal"
        v-cloak
        slot-scope="{ closeModal }"
        class="m-4 bg-white"
      >
        <div class="p-4 flex justify-between items-center">
          <div class="font-bold text-xl md:text-2xl uppercase">
            Filters
          </div>

          <button @click="closeModal" class="text-black hover:text-gray-500">
            <ExitIcon class="icon fill-current" />
            <span class="sr-only">Close Configuration</span>
          </button>
        </div>

        <div
          class="content p-4 pb-3 flex flex-wrap border-t border-b border-gray-400 text-black text-lg"
        >
          <div class="mb-3">
            Set global filters to get a more specific view on a certain subset
            of the data set. It is possible to select multiple filter
            combinations. Filters do apply immediately on the search result.
          </div>

          <div
            v-for="filter in filters"
            :key="filter.name"
            class="mt-2 uppercase"
          >
            <div>{{ filter.title }}</div>
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

        <div class="p-4 flex justify-end">
          <button
            @click="closeModal"
            class="mr-2 px-4 py-2 text-lg md:text-xl font-bold text-black hover:text-white hover:bg-black"
          >
            CLOSE
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ConfigIcon from '@/components/icons/config.vue'
import ExitIcon from '@/components/icons/exit.vue'
import Modal from '@/components/modal.vue'
import SelectableButton from '@/components/selectable-button.vue'

export default {
  components: {
    ConfigIcon,
    ExitIcon,
    Modal,
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
    }
  }
}
</script>

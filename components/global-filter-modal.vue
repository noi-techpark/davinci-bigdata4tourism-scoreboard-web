<template>
  <div
    v-if="!visible"
    class="sticky top-0 z-2000 bg-white border-2 border-black mb-3"
    style="z-index: 1001"
  >
    <Modal>
      <button
        slot="button"
        slot-scope="{ openModal }"
        @click="openModal"
        class="flex w-full p-2 text-black hover:text-gray-500"
      >
        <ConfigIcon class="icon fill-current self-center mr-2" />
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
          class="content p-4 pb-3 flex flex-wrap border-t border-b border-gray-400 text-black text-lg uppercase"
        >
          <div v-for="filter in filters" :key="filter.name" class="mt-2">
            <div>{{ filter.name }}</div>
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
    },
    toggleVisibility() {
      this.$store.dispatch('metrics/toggleGlobalFiltersVisibility')
    }
  }
}
</script>

<style scoped>
.z-2000 {
  z-index: 2000;
}
</style>

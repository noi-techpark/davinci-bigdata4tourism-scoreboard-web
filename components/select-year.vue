<template>
  <div class="select-year relative text-black hover:text-gray-500">
    <select
      :value="selectedYear"
      @change="change"
      class="block appearance-none w-full py-3 px-4 leading-tight text-xl focus:outline-none cursor-pointer"
    >
      <option v-for="year in years" :key="year" :value="year">{{
        year
      }}</option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
    >
      <DownIcon class="fill-current w-i" />
    </div>
  </div>
</template>

<script>
import DownIcon from '@/components/icons/down.vue'

export default {
  components: {
    DownIcon
  },
  props: {
    years: {
      type: Array,
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
  methods: {
    change(e) {
      this.selectYear(e.target.value)
    }
  }
}
</script>

<style scoped>
.select-year {
  min-width: 110px;
}
</style>

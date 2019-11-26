<template>
  <div>
    <ul class="list-reset hidden flex lg:flex border-b mt-5">
      <li
        v-for="(tab, index) in tabs"
        :class="['-mb-px mr-1 ', { 'is-active': tab.isActive }]"
        :key="index"
      >
        <a
          :href="tab.href"
          @click="selectTab(tab)"
          :class="[
            'uppercase inline-block h-full border-black border-2 py-2 px-4 text-xl font-semibold',
            tabClass(tab, index)
          ]"
          >{{ tab.name }}</a
        >
      </li>
    </ul>

    <!-- Display selectbox for mobile -->
    <div class="relative lg:hidden">
      <select
        @change="selectOption($event)"
        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        <option
          v-for="(tab, index) in tabs"
          :key="index"
          :selected="tab.isActive"
          >{{ tab.name }}</option
        >
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>

    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { tabs: [] }
  },
  created() {
    this.tabs = this.$children
  },
  methods: {
    tabClass(tab, index) {
      return tab.isActive
        ? `border-metric${index}-500 text-metric${index}-500`
        : `hover:border-metric${index}-500 hover:text-metric${index}-500`
      // : `hover:bg-metric${index}-500 hover:text-metric${index}-500`
    },
    selectOption(e) {
      if (e.target.options.selectedIndex > -1) {
        console.log(event.target.value)
        this.selectTab({ name: event.target.value })
        // console.log(
        //   e.target.options[e.target.options.selectedIndex].dataset.foo
        // )
      }
    },
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        tab.isActive = tab.name === selectedTab.name
      })
    }
  }
}
</script>

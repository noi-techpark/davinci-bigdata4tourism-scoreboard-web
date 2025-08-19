<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="my-5">
    <div class="projectmessage">
      Project concluded: For more info please write to
      <a href="mailto:help@opendatahub.com">help@opendatahub.com</a><br /><br />
    </div>
    <div class="title-container w-full flex flex-col">
      <div class="title-box my-4 mr-6">
        <div
          class="px-4 py-2 title-text leading-tight font-thin text-4xl md:text-6xl lg:text-7xl text-black uppercase"
        >
          Big data for Tourism - South Tyrol
        </div>
      </div>
    </div>

    <!-- <div :class="['mt-3 text-xl text-semibold uppercase', marginClasses]">
      Filters
    </div>
    <GlobalFilterModal
      :filters="filters"
      :class="marginClasses"
    ></GlobalFilterModal> -->

    <!-- <div :class="['mt-3 text-xl text-semibold uppercase', marginClasses]">
      Metrics
    </div>
    <Tabs
      :class="marginClasses"
      :selectedIndex="selectedIndex"
      :tabs="tabs"
      @tab-changes="openMetric($event)"
    ></Tabs> -->

    <!-- eslint-disable-next-line -->
    <!-- <component :is="currentComponent" :key="selectedIndex" class="tab"></component> -->
    <div id="imgplaceholder"></div>
  </div>
</template>

<!-- <script>
import { mapMutations } from 'vuex'
import filters from '@/meta/filters'
// import GlobalFilterModal from '@/components/global-filter-modal.vue'
// import Tabs from '@/components/tabs/tabs.vue'

export default {
  components: {
    // GlobalFilterModal,
    // Tabs
  },
  computed: {
    currentComponent() {
      return this.$store.getters['metrics/currentComponent']
    },
    filters() {
      return filters
    },
    selectedIndex() {
      return this.$store.state.metrics.openMetric
    },
    marginClasses() {
      return 'ml-2 mr-2 xl:ml-0 xl:mr-0'
    },
    tabs() {
      return this.$store.state.metrics.metrics.map((metric) => ({
        id: metric.id,
        name: metric.title,
        href: '#'
      }))
    }
  },
  methods: {
    ...mapMutations({
      openMetric: 'metrics/openMetric'
    })
  }
}
</script> -->

<style scoped>
.title-container {
  min-height: 400px;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('/title-mobile.jpg');

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    background-image: url('/title-mobile.jpg');
  }

  @screen lg {
    background-image: url('/title-desktop.jpg');

    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
      background-image: url('/title-desktop.jpg');
    }
  }
}

.title-box {
  background-color: rgba(255, 255, 255, 0.7);
}

#imgplaceholder {
  min-height: 835px;
  background-image: url('/screenshot_bd4t_filters.jpg');
}

.projectmessage {
  font-size: x-large;
  font-weight: 600;
}
.projectmessage a:hover {
  text-decoration: underline;
}
</style>

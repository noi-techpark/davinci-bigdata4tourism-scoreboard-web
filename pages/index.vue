<template>
  <div class="my-5">
    <div class="title-container w-full flex flex-col">
      <div class="title-box my-4 mr-6">
        <div
          class="px-4 py-2 title-text leading-tight font-thin text-4xl md:text-6xl lg:text-7xl text-black uppercase"
        >
          Big data for Tourism - South Tyrol
        </div>
      </div>
    </div>

    <Tabs
      :selectedIndex="selectedIndex"
      :tabs="tabs"
      @tab-changes="openMetric($event)"
    ></Tabs>

    <!-- eslint-disable-next-line -->
    <component :is="currentComponent" :key="selectedIndex" class="tab"></component>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Tabs from '@/components/tabs/tabs.vue'

export default {
  components: {
    Tabs
  },
  computed: {
    currentComponent() {
      return this.$store.getters['metrics/currentComponent']
    },
    selectedIndex() {
      return this.$store.state.metrics.openMetric
    },
    loaded() {
      return this.$store.state.metrics.loaded
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
</script>

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
</style>

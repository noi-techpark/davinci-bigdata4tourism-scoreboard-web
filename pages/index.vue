<template>
  <div class="my-5">
    <div class="title-container w-full flex flex-col">
      <div class="title-box my-4 mr-6">
        <div
          class="px-4 py-2 title-text leading-tight font-thin text-4xl md:text-6xl lg:text-7xl text-black uppercase"
        >
          All Statistical Innovation Data for South Tyrol
        </div>
      </div>
    </div>

    <div v-if="loaded" class="flex flex-wrap">
      <Metric
        v-for="(metric, index) in metrics"
        :key="index"
        :index="index"
        :metric="metric"
      />
    </div>
  </div>
</template>

<script>
import Metric from '@/components/metric.vue'

export default {
  components: {
    Metric
  },
  computed: {
    loaded() {
      return this.$store.state.metrics.loaded
    },
    metrics() {
      return this.$store.state.metrics.metrics
    }
  },
  fetch({ store }) {
    return store.dispatch('metrics/load')
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
    background-image: url('/title-mobile@2x.jpg');
  }

  @screen lg {
    background-image: url('/title-desktop.jpg');

    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
      background-image: url('/title-desktop@2x.jpg');
    }
  }
}

.title-box {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>

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

    <Tabs>
      <Tab :selected="true" name="Requests, Bookings, Cancellations">
        <h1>Requests, Bookings, Cancellations</h1>
      </Tab>
      <Tab name="Time until arrival">
        <h1>Time until arrival</h1>
      </Tab>
      <Tab name="Accommodation category">
        <h1>Accommodation category</h1>
      </Tab>
      <Tab name="Family situation">
        <h1>Family situation</h1>
      </Tab>
      <Tab name="Countries of origin">
        <h1>Countries of origin</h1>
      </Tab>
      <Tab name="Target areas">
        <h1>Target areas</h1>
      </Tab>
    </Tabs>

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
import Tabs from '@/components/tabs/tabs.vue'
import Tab from '@/components/tabs/tab.vue'

export default {
  components: {
    Metric,
    Tabs,
    Tab
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

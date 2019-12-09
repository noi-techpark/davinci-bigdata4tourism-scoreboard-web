<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map :zoom="zoom" :center="[center.lat, center.lng]">
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <v-marker-cluster>
          <l-marker
            v-for="(marker, index) in markers"
            :lat-lng="[marker.lat, marker.lng]"
            :key="index"
          />
        </v-marker-cluster>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    center: {
      type: Object,
      required: true
    },
    zoom: {
      type: Number,
      required: true
    },
    markers: {
      type: Array,
      required: false,
      default: () => []
    }
  }
}
</script>

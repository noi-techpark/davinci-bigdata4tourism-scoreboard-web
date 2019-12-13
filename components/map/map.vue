<template>
  <client-only>
    <div class="map-container">
      <l-map :zoom="zoom" :center="[center.lat, center.lng]">
        <slot name="tiles">
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></l-tile-layer>
        </slot>
        <slot name="layers"></slot>
      </l-map>
    </div>
  </client-only>
</template>

<script>
export default {
  props: {
    center: {
      type: Object,
      default: () => ({
        lat: 46.65,
        lng: 11.35
      })
    },
    zoom: {
      type: Number,
      default: () => 9
    }
  }
}
</script>

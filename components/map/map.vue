<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <client-only>
    <div class="map-container">
      <l-map
        :zoom="zoom"
        :center="[center.lat, center.lng]"
        @moveend="positionChanges"
      >
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
  },
  data() {
    return {
      emittedCenter: {
        lat: null,
        lng: null
      },
      emittedZoom: null,
      centerChangedByProps: false,
      zoomChangedByProps: false
    }
  },
  watch: {
    center(newCenter, oldCenter) {
      this.centerChangedByProps =
        newCenter.lat !== this.emittedCenter.lat ||
        newCenter.lng !== this.emittedCenter.lng
    },
    zoom(newZoom, oldZoom) {
      this.zoomChangedByProps = newZoom !== this.emittedZoom
    }
  },
  methods: {
    positionChanges(event) {
      this.emittedCenter = event.target.getCenter()
      this.emittedZoom = event.target.getZoom()

      const shouldEmit =
        this.center.lat !== this.emittedCenter.lat ||
        this.center.lng !== this.emittedCenter.lng ||
        this.zoom !== this.emittedZoom

      if (
        shouldEmit &&
        !this.centerChangedByProps &&
        !this.zoomChangedByProps
      ) {
        this.$emit('moveend', {
          center: this.emittedCenter,
          zoom: this.emittedZoom
        })
      } else {
        this.centerChangedByProps = false
        this.zoomChangedByProps = false
      }
    }
  }
}
</script>

<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <button
    :class="style"
    @click="click(value)"
    class="px-4 py-2 border-3 uppercase"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    selectedValue: {
      type: String,
      default: null
    },
    selectedColor: {
      type: String,
      required: true
    },
    click: {
      type: Function,
      required: true
    }
  },
  computed: {
    isSelected() {
      return this.value === this.selectedValue
    },
    style() {
      const styleNotSeleted =
        'border-black hover:border-' +
        this.selectedColor +
        '-500 text-black hover:text-' +
        this.selectedColor +
        '-500'

      const styleSelected =
        'border-' +
        this.selectedColor +
        '-500 bg-' +
        this.selectedColor +
        '-500 hover:bg-white text-white hover:text-' +
        this.selectedColor +
        '-500'

      return {
        [styleNotSeleted]: !this.isSelected,
        [styleSelected]: this.isSelected
      }
    }
  }
}
</script>

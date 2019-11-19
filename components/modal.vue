<template>
  <div>
    <slot :open-modal="openModal" name="button"></slot>

    <portal v-if="paint" to="modals">
      <transition @after-leave="afterLeave" name="modal">
        <div v-show="open" @click="closeModal" class="modal-mask">
          <div @click.stop class="modal-container">
            <slot :close-modal="closeModal" name="modal"></slot>
          </div>
        </div>
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paint: false,
      open: false
    }
  },
  methods: {
    openModal() {
      this.paint = true
      this.open = true
    },
    closeModal() {
      this.open = false
    },
    afterLeave() {
      this.paint = false
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  overflow-x: hidden;
  overflow-y: auto;
}

.modal-container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  transition: all 0.3s ease;
}

@screen lg {
  .modal-container {
    width: 1000px;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}
</style>

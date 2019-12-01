<template>
  <div :class="containerClass">
    <div class="lds-dual-ring self-center"></div>
  </div>
</template>

<script>
export default {
  props: {
    containerClass: {
      type: String,
      default: () =>
        'absolute bg-gray-500 flex justify-center w-full h-full opacity-75'
    }
  }
}
</script>

<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

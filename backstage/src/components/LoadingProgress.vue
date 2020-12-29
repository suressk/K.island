<template>
  <div class="loading-progress loading" v-show="loading"></div>
</template>

<script>
export default {
  name: 'LoadingProgress',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.loading-progress {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100vw;
  height: 3px;
  background-image: linear-gradient(90deg, #f40, #4f0, #0df, #f40);
  background-size: 400%;
  &.loading {
    animation: bgAnimate 6s infinite linear;
 }
}
@keyframes bgAnimate {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 400%;
  }
}
</style>

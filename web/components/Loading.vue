<template>
  <div v-show="loading" class="loader flex-center fixed-center">
    <span />
    <span />
    <span />
    <span />
    <span />
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
.k-dark {
  .loader {
    background-color: var(--dark-theme-body);
  }
}
.loader {
  z-index: 100;
  background-color: var(--white);
  width: 100vw;
  height: 100vh;
  span {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background: var(--success);
    transform-origin: right bottom;
    animation: load 1s ease infinite;
    &:first-child {
      animation-delay:0.13s;
    }
    &:nth-child(2) {
      animation-delay:0.26s;
    }
    &:nth-child(3) {
      animation-delay:0.39s;
    }
    &:nth-child(4) {
      animation-delay:0.52s;
    }
    &:last-child {
      animation-delay:0.65s;
      margin-right: 0;
    }
  }
}
@keyframes load {
  0%{
    opacity: 1;
    transform: scale(1);
  }
  100%{
    opacity: 0;
    transform: rotate(90deg) scale(.3);
  }
}
</style>

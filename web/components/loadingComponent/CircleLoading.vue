<template>
  <div v-show="loading" class="spinner flex-center fixed-center">
    <div class="spinner-container">
      <span />
      <span />
      <span />
      <span />
    </div>
    <div class="spinner-container">
      <span />
      <span />
      <span />
      <span />
    </div>
    <div class="spinner-container">
      <span />
      <span />
      <span />
      <span />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CircleLoading',
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
.spinner {
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: var(--white);
  .spinner-container {
    position: absolute;
    width: 50px;
    height: 50px;
    &:first-child {
      span:nth-child(2) {
        animation-delay: -0.9s;
      }
      span:nth-child(3) {
        animation-delay: -0.6s;
      }
      span:last-child {
        animation-delay: -0.3s;
      }
    }
    &:nth-child(2) {
      transform: rotateZ(45deg);
      span:first-child {
        animation-delay: -1.1s;
      }
      span:nth-child(2) {
        animation-delay: -0.8s;
      }
      span:nth-child(3) {
        animation-delay: -0.5s;
      }
      span:last-child {
        animation-delay: -0.2s;
      }
    }
    &:nth-child(3) {
      transform: rotateZ(90deg);
      span:first-child {
        animation-delay: -1.0s;
      }
      span:nth-child(2) {
        animation-delay: -0.7s;
      }
      span:nth-child(3) {
        animation-delay: -0.4s;
      }
      span:last-child {
        animation-delay: -0.1s;
      }
    }
    span {
      position: absolute;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: var(--darkGreen);
      animation: bounceDelay 1.2s infinite ease-in-out both;
      &:first-child {
        top: 0; left: 0;
      }
      &:nth-child(2) {
        top: 0; right: 0;
      }
      &:nth-child(3) {
        right: 0; bottom: 0;
      }
      &:last-child {
        left: 0; bottom: 0;
      }
    }
  }
}

@keyframes bounceDelay {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>

<template>
  <div v-show="loading" class="spinner">
    <div class="spinner-container container1">
      <div class="circle1" />
      <div class="circle2" />
      <div class="circle3" />
      <div class="circle4" />
    </div>
    <div class="spinner-container container2">
      <div class="circle1" />
      <div class="circle2" />
      <div class="circle3" />
      <div class="circle4" />
    </div>
    <div class="spinner-container container3">
      <div class="circle1" />
      <div class="circle2" />
      <div class="circle3" />
      <div class="circle4" />
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

<style scoped>
.spinner {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 9999;
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.container1 > div, .container2 > div, .container3 > div {
  width: 10px;
  height: 10px;
  background-color: #333;
  border-radius: 100%;
  position: absolute;
  animation: bounceDelay 1.2s infinite ease-in-out;
  animation-fill-mode: both;
}

.spinner .spinner-container {
  position: absolute;
  width: 50px;
  height: 50px;
}

.container2 {
  transform: rotateZ(45deg);
}

.container3 {
  transform: rotateZ(90deg);
}

.circle1 { top: 0; left: 0; }
.circle2 { top: 0; right: 0; }
.circle3 { right: 0; bottom: 0; }
.circle4 { left: 0; bottom: 0; }

.container2 .circle1 {
  animation-delay: -1.1s;
}

.container3 .circle1 {
  animation-delay: -1.0s;
}

.container1 .circle2 {
  animation-delay: -0.9s;
}

.container2 .circle2 {
  animation-delay: -0.8s;
}

.container3 .circle2 {
  animation-delay: -0.7s;
}

.container1 .circle3 {
  animation-delay: -0.6s;
}

.container2 .circle3 {
  animation-delay: -0.5s;
}

.container3 .circle3 {
  animation-delay: -0.4s;
}

.container1 .circle4 {
  animation-delay: -0.3s;
}

.container2 .circle4 {
  animation-delay: -0.2s;
}

.container3 .circle4 {
  animation-delay: -0.1s;
}

@keyframes bounceDelay {
  0%, 80%, 100% {
    transform: scale(0.0);
  }
  40% {
    transform: scale(1.0);
  }
}
</style>

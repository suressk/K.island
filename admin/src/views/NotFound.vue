<template>
  <section class="not-found">
    <div class="perspective-container fixed-center">
      <span class="card" />
      <span class="card" />
      <span class="card" />
      <p class="tip txt-overflow">
        迷路了哟
        <router-link to="/">点我</router-link>
        回到首页
      </p>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "NotFound",
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.not-found {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--ink);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  .perspective-container {
    perspective: 500px;
    width: 100px;
    height: 100px;
    transform-origin: bottom center;
    .card {
      transform-style: preserve-3d;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: var(--primary);
      border-radius: 20px;
      transform: rotateX(60deg) rotateZ(45deg);
      animation: cardRotate 2s ease-in-out infinite;
      &:nth-child(2) {
        background-color: rgba(255, 255, 255, .6);
        transform: rotateX(60deg) rotateZ(45deg) scale(0.8) translateZ(20px);
        animation: card2Bounce 2s ease infinite;
      }
      &:nth-child(3) {
        background-color: rgba(255, 255, 255, .3);
        transform: rotateX(60deg) rotateZ(45deg) scale(0.5) translateZ(50px);
        animation: card3Bounce 2s ease-in-out infinite;
      }
    }

    .tip {
      position: absolute;
      left: 50%;
      bottom: -50px;
      font-size: 14px;
      transform: translateX(-50%);
    }
  }
}

@keyframes cardRotate {
  0% {
    transform: rotateX(60deg) rotateZ(45deg);
  }
  100% {
    transform: rotateX(60deg) rotateZ(405deg);
  }
}

@keyframes card2Bounce {
  0%, 100% {
    transform: rotateX(60deg) rotateZ(45deg) scale(0.8) translateZ(20px);
  }
  50% {
    transform: rotateX(60deg) rotateZ(45deg) scale(0.8) translateZ(50px);
  }
}
@keyframes card3Bounce {
  0%, 100% {
    transform: rotateX(60deg) rotateZ(45deg) scale(0.5) translateZ(50px);
  }
  50% {
    transform: rotateX(60deg) rotateZ(45deg) scale(0.5) translateZ(100px);
  }
}
</style>

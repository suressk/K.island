<template>
  <div class="k-empty">
    <div class="perspective-container absolute-center">
      <span class="card" />
      <span class="card" />
      <span class="card" />
      <slot>
        <p class="tip txt-overflow">
          好像出错了呀！
          <nuxt-link class="link" to="/">点我</nuxt-link>
          回到首页（麻烦联系一下小K.哦~）
        </p>
      </slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Empty'
})
</script>

<style lang='scss'>
.k-empty {
  width: 100%;
  height: 100%;
  position: relative;
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
        //background-color: rgba(255, 255, 255, .6);
        background-color: rgba(0, 0, 0, .4);
        transform: rotateX(60deg) rotateZ(45deg) scale(0.8) translateZ(20px);
        animation: card2Bounce 2s ease infinite;
      }
      &:nth-child(3) {
        //background-color: rgba(255, 255, 255, .3);
        background-color: rgba(0, 0, 0, .2);
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
      transform: rotateX(60deg) rotateZ(45deg) scale(0.6) translateZ(20px);
    }
    50% {
      transform: rotateX(60deg) rotateZ(45deg) scale(0.8) translateZ(50px);
    }
  }
  @keyframes card3Bounce {
    0%, 100% {
      transform: rotateX(60deg) rotateZ(45deg) scale(0.3) translateZ(50px);
    }
    50% {
      transform: rotateX(60deg) rotateZ(45deg) scale(0.5) translateZ(100px);
    }
  }
}

.k-dark .k-empty .perspective-container .card {
  &:nth-child(2) {
    //background-color: rgba(0, 0, 0, .6);
    background-color: rgba(255, 255, 255, .6);
  }
  &:nth-child(3) {
    //background-color: rgba(0, 0, 0, .6);
    background-color: rgba(255, 255, 255, .3);
  }
}
</style>

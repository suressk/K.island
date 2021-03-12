<template>
  <div class="k-wave-area">
    <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
      <defs>
        <path id="gentle-wave" d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z" />
      </defs>
      <g class="parallax">
        <use xlink:href="#gentle-wave" x="48" y="0" />
        <use xlink:href="#gentle-wave" x="48" y="3" />
        <use xlink:href="#gentle-wave" x="48" y="5" />
        <use xlink:href="#gentle-wave" x="48" y="7" />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "KWave"
}
</script>

<style scoped lang="scss">
.k-wave-area {
  width: 100%;
  position: absolute;
  bottom: -5px;
  left: 0;
  .waves {
    width: 100%;
    height: 10vh;
    use {
      animation: waveForever 25s cubic-bezier(.55,.5,.45,.5) infinite;
      &:nth-child(1){
        animation-delay: -2s;
        animation-duration: 7s;
        fill: rgba(0, 222, 255, 0.4);
      }
      &:nth-child(2){
        animation-delay: -3s;
        animation-duration: 10s;
        fill: rgba(157, 192, 250, 0.3);
      }
      &:nth-child(3){
        animation-delay: -4s;
        animation-duration: 13s;
        fill: rgba(0, 168, 255, 0.2);
      }
      &:nth-child(4){
        animation-delay: -5s;
        animation-duration: 20s;
        fill: rgba(0, 222, 255, 0.1);
      }
    }
  }
}
@keyframes waveForever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform:translate3d(85px, 0, 0);
  }
}
</style>

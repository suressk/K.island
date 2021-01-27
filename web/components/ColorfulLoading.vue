<template>
  <div class="loader flex-center">
    <div class="loading">
      <span style="--i: 1;" />
      <span style="--i: 2;" />
      <span style="--i: 3;" />
      <span style="--i: 4;" />
      <span style="--i: 5;" />
      <span style="--i: 6;" />
      <span style="--i: 7;" />
      <span style="--i: 8;" />
      <span style="--i: 9;" />
      <span style="--i: 10;" />
      <span style="--i: 11;" />
      <span style="--i: 12;" />
      <span style="--i: 13;" />
      <span style="--i: 14;" />
      <span style="--i: 15;" />
      <span style="--i: 16;" />
      <span style="--i: 17;" />
      <span style="--i: 18;" />
      <span style="--i: 19;" />
      <span style="--i: 20;" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorfulLoading'
}
</script>

<style scoped lang="scss">
.loader {
  width: 100vw;
  height: 100vh;
  background-color: #042104;
  animation: animateBg 10s linear infinite;
  .loading {
    position: relative;
    width: 150px;
    height: 150px;
    span {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transform: rotate(calc(18deg * var(--i)));
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 20px;
        height: 20px;
        background-color: #00ff0a;
        border-radius: 50%;
        box-shadow: 0 0 10px #00ff0a,
                    0 0 20px #00ff0a,
                    0 0 40px #00ff0a,
                    0 0 80px #00ff0a,
                    0 0 100px #00ff0a;
        animation: rotateAnimate 2s linear infinite;
        animation-delay: calc(0.1s * var(--i));
      }
    }
  }
}

@keyframes animateBg {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
@keyframes rotateAnimate {
  0% {
    transform: scale(1);
  }
  80%, 100% {
    transform: scale(0);
  }
}
</style>

<template>
  <div class='cube-loading d-flex'>
    <span class='k-cube' />
    <span class='k-cube' />
    <span class='k-cube' />
    <span class='k-cube' />
    <span class='k-cube' />
    <span class='k-cube' />
    <span class='k-cube' />
    <span class='k-cube' />
    <span class='k-cube' />
  </div>
</template>

<script>
export default {
  name: 'CubeLoading'
}
</script>

<style lang="scss">
.cube-loading {
  width: 30px;
  height: 30px;
  margin: 0 10px;
  flex-wrap: wrap;
  span {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background-color: var(--primary-blue);
    animation: cubeScale 1.3s infinite ease-in-out;
    &:first-child {
      animation-delay: 0.2s;
    }
    &:nth-child(2) {
      animation-delay: 0.3s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
    &:nth-child(4) {
      animation-delay: 0.1s;
    }
    &:nth-child(5) {
      animation-delay: 0.2s;
    }
    &:nth-child(6) {
      animation-delay: 0.3s;
    }
    &:nth-child(7) {
      animation-delay: 0s;
    }
    &:nth-child(8) {
      animation-delay: 0.1s;
    }
    &:nth-child(9) {
      animation-delay: 0.2s;
    }
  }
}
@keyframes cubeScale {
  0%, 70%, 100% {
    //opacity: 1;
    transform: scale(1);
  }
  35% {
    //opacity: 0;
    transform: scale(0);
  }
}
</style>

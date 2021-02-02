<template>
  <div class="load-more flex-center">
    <span class="dot" />
    <span class="dot" />
    <span class="dot" />
    <span class="dot" />
    <span class="dot" />
  </div>
</template>

<script>
export default {
  name: 'LoadMore'
}
</script>

<style lang="scss">
.load-more {
  text-align: center;
  width: 100%;
  /* position: relative; */
  /* z-index: 1; */
  padding: 20px 0;
  background-color: var(--white);
  .dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 0 5px;
    animation: beat 2s ease-in-out infinite both;
    &:first-child {
      animation-delay: 0;
      background-color: var(--cinnabar);
    }
    &:nth-child(2) {
      animation-delay: 0.2s;
      background-color: var(--warning);
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
      background-color: var(--oilGreen);
    }
    &:nth-child(4) {
      animation-delay: 0.6s;
      background-color: var(--lightCyan);
    }
    &:nth-child(5) {
      animation-delay: 0.8s;
      background-color: var(--cyanogen);
    }
  }
}
@keyframes beat {
  0% {
    transform: scale(0.5);
    opacity: 0.8;
  }
  50% {
    transform: scale(2.5);
    opacity: 0.3;
  }
  100% {
    transform: scale(0.5);
    opacity: 0.8;
  }
}
</style>

<template>
  <div class='load-more flex-center'>
    <template v-if='showLoadMore && loadStatus === 0'>
      <div class='load-more-btn' @click='emitLoadMore'>Load More</div>
    </template>
    <template v-else-if='loadStatus === -1'>
      <div class='tip trans-all-03'>没有更多了 ~</div>
    </template>
    <template v-else-if='loadStatus === 1'>
      <span class='dot' />
      <span class='dot' />
      <span class='dot' />
      <span class='dot' />
      <span class='dot' />
    </template>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LoadMore',
  props: {
    loadStatus: {
      type: Number,
      default: 0
    },
    showLoadMore: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    function emitLoadMore() {
      emit('load-more')
    }

    return {
      emitLoadMore
    }
  }
})
</script>

<style lang='scss'>
.load-more {
  text-align: center;
  width: 100%;
  height: 70px;
  padding: 20px 0;
  margin-top: 20px;
  background-color: var(--white);
  position: relative;
  z-index: 1;

  .load-more-btn {
    border: 1px solid var(--border);
    border-radius: 5px;
    padding: 6px 10px;
    color: var(--tipColor);
    cursor: pointer;
    transition: background-color .3s, color .3s, border-color .3s;

    &:hover {
      color: var(--white);
      background-color: var(--primary) !important;
      border-color: var(--primary);
    }
  }

  .dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 0 5px;
    animation: beat 2s ease-in-out infinite both;

    &::after {
      content: "";
      position: absolute;
      left: -5px;
      bottom: -15px;
      width: 20px;
      height: 8px;
      border-radius: 100%;
      filter: blur(5px);
      background-color: inherit;
    }

    &:first-child {
      animation-delay: -0.4s;
      background-color: var(--error);
    }

    &:nth-child(2) {
      animation-delay: -0.2s;
      background-color: var(--warning);
    }

    &:nth-child(3) {
      //animation-delay: 0s;
      background-color: var(--dark-success);
    }

    &:nth-child(4) {
      animation-delay: 0.2s;
      background-color: var(--lightCyan);
    }

    &:nth-child(5) {
      animation-delay: 0.4s;
      background-color: var(--primary);
    }
  }
}

@keyframes beat {
  0%, 100% {
    transform: scale(0.5);
    opacity: 0.8;
    filter: drop-shadow(0 0 10px var(--error)) invert(0%);
  }
  50% {
    transform: scale(2.5);
    opacity: 0.3;
    filter: drop-shadow(0 0 10px var(--error)) invert(100%);
  }
}
</style>

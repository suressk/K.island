<template>
  <div
    class="back-top trans-all-05 flex-center"
    :class="{ show: isBack }"
    @click="handleBackTop"
  >
    <i class="iconfont icon-toTop" />
  </div>
</template>

<script>
import { singleScroll, addListener, removeListener } from '~/utils/util'

export default {
  name: 'BackToTop',
  data () {
    return {
      rafId: null,
      scrollTop: 0,
      fnScroll: () => {}
    }
  },
  computed: {
    isBack () {
      return this.scrollTop >= 200
    }
  },
  mounted () {
    this.fnScroll = this.$throttle(this.handleScroll, 100)
    addListener(window, 'scroll', this.fnScroll)
  },
  beforeDestroy () {
    removeListener(window, 'scroll', this.fnScroll)
  },
  methods: {
    handleBackTop () {
      singleScroll('body', 'top')
    },
    handleScroll () {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    }
  }
}
</script>

<style lang="scss">
.back-top {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 12;
  opacity: 0;
  visibility: hidden;
  color: var(--darkGreen);
  .icon-toTop {
    font-size: 36px;
  }
  &:hover {
    background-color: var(--opacityBg);
  }
  &.show {
    opacity: 1;
    visibility: visible;
  }
}
</style>

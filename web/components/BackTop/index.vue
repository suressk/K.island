<template>
  <div class="back-top trans-all-05" :class="{ show: isBack }" @click="handleBackTop">
    <i class="iconfont icon-toTop" />
  </div>
</template>

<script>
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
      return this.scrollTop >= 500
    }
  },
  mounted () {
    this.fnScroll = this.$throttle(this.handleScroll, 100)
    window.addEventListener('scroll', this.fnScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.fnScroll)
  },
  methods: {
    handleBackTop () {
      const vm = this
      let topCache = 0
      this.rafId = window.requestAnimationFrame(() => {
        // 当前 scrollTop 值
        const curTop = document.documentElement.scrollTop || document.body.scrollTop
        const distance = curTop / 10 // 减速回滚 —— 每次滚动距离
        // const distance = (curTop / 10) | 0 // 取整
        // const distance = ~~(curTop / 10) // 取整
        // const distance = Math.floor(curTop / 6)
        if (topCache && topCache <= curTop) {
          window.cancelAnimationFrame(vm.rafId)
        } else {
          topCache = document.documentElement.scrollTop = document.body.scrollTop = curTop - distance
          if (distance <= 0 || curTop <= 0) {
            window.cancelAnimationFrame(vm.rafId)
            document.documentElement.scrollTop = document.body.scrollTop = 0
            return
          }
          window.requestAnimationFrame(vm.handleBackTop)
        }
      })
    },
    handleScroll () {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    }
  }
}
</script>

<style lang="scss">
.back-top {
  padding: 5px;
  border-radius: 5px;
  position: fixed;
  bottom: 20px;
  right: 30px;
  cursor: pointer;
  z-index: 12;
  opacity: 0;
  visibility: hidden;
  color: var(--darkGreen);
  .icon-toTop {
    font-size: 36px;
  }
  &:hover {
    background-color: var(--lightBg);
  }
  &.show {
    opacity: 1;
    visibility: visible;
  }
}
</style>

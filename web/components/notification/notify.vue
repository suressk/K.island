<template>
  <transition name="scaleRight">
    <div
      class="notification"
      v-show="visible"
      :style="customStyle"
      @mouseenter="stopDestroy"
      @mouseleave="startDestroy"
    >
      <div class="notify-header" :class="'notification-' + type">
        <i class="iconfont" :class="'icon-' + type" />
        <span class="notify-title" v-text="title" />
      </div>
      <i class="iconfont icon-close" @click="close" />
      <div class="notify-body" v-text="message" />
    </div>
  </transition>
</template>

<script>
import { addListener, removeListener } from '@/utils/util'

export default {
  name: 'Notification',
  data () {
    return {
      visible: false,
      type: 'info',
      title: '',
      message: '',
      timer: null,
      duration: 5000,
      offset: 0,
      closed: false
      // zIndex: 99,
    }
  },
  computed: {
    customStyle ({ offset }) {
      return `top: ${offset}px;`
      // return `z-index: ${zIndex};`
    }
  },
  methods: {
    destroyElement() {
      removeListener(this.$el, 'transitionend', this.destroyElement)
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
    close () {
      this.closed = true
      this.onClose()
    },
    startDestroy () {
      this.timer = setTimeout(() => {
        this.close()
      }, this.duration)
    },
    stopDestroy () {
      clearTimeout(this.timer)
      this.timer = null
    }
  },
  mounted () {
    this.timer = setTimeout(() => {
      this.close()
    }, this.duration)
  },
  watch: {
    closed (val) {
      // 已关闭
      if (val) {
        this.visible = false
        // transition 结束移除 $el
        addListener(this.$el, 'transitionend', this.destroyElement)
      }
    }
  }
}
</script>
<style lang="scss">
@import "assets/css/components/notify.scss";
</style>

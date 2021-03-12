<template>
  <transition name="notify">
    <div
      class="notification"
      v-show="visible"
      :style="verticalOffset"
      @mouseenter="stopDestroy"
      @mouseleave="startDestroy"
    >
      <div class="notify-header" :class="'notification-' + type">
        <i class="iconfont" :class="'icon-' + type" />
        <span class="notify-title" v-text="title" />
      </div>
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
      type: '',
      title: '',
      message: '',
      timer: null,
      duration: 4000,
      // onClose: null,
      offset: 0,
      zIndex: 99,
      closed: false
    }
  },
  computed: {
    verticalOffset () {
      // return `top: ${this.offset}px;`
      return `z-index: ${this.zIndex};`
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

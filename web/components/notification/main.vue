<template>
  <transition name="notify">
    <div class="notify notification" v-show="visible" :style="verticalOffset">
      <div class="notify-header" :class="'notification-' + type">
        <i class="iconfont" :class="'icon-' + type" />
        <span class="notify-title" v-text="title" />
      </div>
      <div class="notify-body" v-text="message" />
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Notify',
  data () {
    return {
      visible: false,
      type: 'success',
      title: 'Notify',
      message: 'success',
      timer: null,
      duration: 5000,
      onClose: null,
      offset: 0,
      closed: false
    }
  },
  computed: {
    verticalOffset () {
      return `top: ${this.offset}px;`
    }
  },
  methods: {
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      // this.$destroy(true);
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
    close () {
      this.closed = true
      this.onClose()
    }
  },
  mounted () {
    this.timer = window.setTimeout(() => {
      this.close()
    }, this.duration)
  },
  watch: {
    closed (val: boolean) {
      // 已关闭
      if (val) {
        this.visible = false
        // transition 结束移除 $el
        this.$el.addEventListener('transitionend', this.destroyElement)
      }
    }
  }
})
</script>

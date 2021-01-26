<template>
  <transition name="notify">
    <div class="notify notification" v-show="visible" :style="verticalOffset">
      <div class="notify-header">
        <i class="iconfont" :class="'icon-' + type" />
        <span class="notify-title">{{ title }}</span>
      </div>
      <div class="notify-body">
        {{ message }}
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { log } from 'util'
export default {
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
      offset: 0
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
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
  },
  mounted () {
    this.timer = setTimeout(() => {
      this.onClose()
    }, this.duration)
  }
}
</script>

<style lang="scss">
/* .notify {
  padding: 20px;
  border-radius: 10px;
} */
.notification {
  position: fixed;
  right: 10px;
}
</style>

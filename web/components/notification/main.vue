<template>
  <transition name="notify">
    <div class="notify" v-show="visible">
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
      onClose: null
    }
  },
  methods: {
    // close () {

    // }
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
</style>

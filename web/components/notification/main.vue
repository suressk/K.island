<template>
  <transition name="k-notify-fade">
    <div class="notify" v-show="visible">
      <div class="notify-header">
        <i class="iconfont" :class="'icon-notify-' + type" />
        <span class="notify-title">{{ title }}</span>
      </div>
      <div class="notify-body">
        {{ message }}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notify',
  data () {
    return {
      visible: false,
      type: 'success',
      title: 'Notify',
      message: 'success',
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <transition name="k-notify-fade">
    <div
      class="notify"
      v-show="visible"
    >

    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notify',
  data () {
    return {
      visible: false
    }
  }
}
</script>

<style scoped>

</style>

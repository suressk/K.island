<template>
  <div class="k-about">
    <KHeader />
    <div class="content">
      你好，我是 K.
    </div>

    <KFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'About',
  // @ts-ignore
  head () {
    return {
      title: "Hi!I'm K. | K.island"
    }
  }
})
</script>

<style scoped lang="scss">
@import "assets/css/pages/about.scss";
</style>

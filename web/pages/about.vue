<template>
  <div class="k-about">
    <KHeader custom-title="(≖ᴗ≖)✧" />
    <div class="content">
      你好，我是 K.
    </div>

    <KFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'About',
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

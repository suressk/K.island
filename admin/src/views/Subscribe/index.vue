<template>
  <section class="subscribe">
    <h3 class="primary-title">
      <i class="iconfont icon-flashing" />
      Subscribe
    </h3>

    <!--  manage subscription  -->
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useSubscribe from './useSubscribe'

export default defineComponent({
  name: "Subscribe",
  setup() {

    return {
      ...useSubscribe()
    }
  }
})
</script>

<style lang="scss">

</style>
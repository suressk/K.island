<template>
  <section class="k-message-board">
    <KHeader />
    <div class="content">
      留言板
    </div>

    <ThemeSwitch />
    <BackTop />

    <KFooter />
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import BackTop from '~/components/BackTop/index.vue'
import KFooter from '~/components/KFooter.vue'

export default defineComponent({
  name: 'MessageBoard',
  components: { KHeader, ThemeSwitch, BackTop, KFooter }
})
</script>

<style lang="scss">
.k-message-board {
  min-height: 100vh;
  .content {
    min-height: calc(100vh - 40px);
  }
}
</style>

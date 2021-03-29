<template>
  <section
    v-if="error.statusCode === 404 || error.statusCode === 500"
    class="k-error"
  >
    <Empty />

    <ThemeSwitch />
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Empty from '~/components/Empty.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'

export default defineComponent({
  name: 'NotFound',
  props: ['error'],
  components: { Empty, ThemeSwitch },
  head() {
    return {
      title: '嗯？好像出错辣~ | K.island'
    }
  }
})
</script>

<style lang="scss">
.k-error {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>

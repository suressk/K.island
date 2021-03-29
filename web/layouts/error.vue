<template>
  <section
    v-if="error.statusCode === 404 || error.statusCode === 500"
    class="k-dark k-error"
  >
    <Empty />
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Empty from '~/components/Empty.vue'

export default defineComponent({
  name: 'NotFound',
  props: ['error'],
  components: {
    Empty
  },
  head() {
    return {
      title: '嗯？！好像出错辣~ | K.island'
    }
  }
})
</script>

<style lang="scss">
.k-dark.k-error {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--dark-theme-header);
}
</style>

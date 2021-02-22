<template>
  <div class="k-article">
    <KHeader custom-title="(≖ᴗ≖)✧" />
    <!--  文章列表页  -->
    <section v-if="!list" class="nothing-content tip flex-center">
      空无一物 (≖ᴗ≖)✧
      <!--<canvas ref="animateCanvas" width="100%" height="100%" class="animation-canvas" />-->
      <KWave />
    </section>
    <!--  有内容  -->
    <section v-else class="content">
      <nuxt-link to="/article/12">
        detail
      </nuxt-link>
      文章列表
    </section>

    <KFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import useArticle from './useArticle'

export default defineComponent({
  name: 'Article',
  setup (props, ctx) {
    const list = computed(() => false)
    return {
      list,
      ...useArticle(ctx)
    }
  },
  head () {
    return {
      title: 'Article | K.island'
    }
  }
})
</script>

<style scoped lang="scss">
@import "assets/css/pages/article.scss";
</style>

<template>
  <section class="k-article">
    <KHeader custom-title="(≖ᴗ≖)✧" />
    <!--  文章列表页  -->
    <div v-if="!list" class="nothing-content flex-center">
      <span class="tip">空无一物 (≖ᴗ≖)✧</span>
      <!--<canvas ref="animateCanvas" width="100%" height="100%" class="animation-canvas" />-->
      <KWave />
    </div>
    <!--  有内容  -->
    <div v-else class="content">
      <nuxt-link to="/article/12">
        detail
      </nuxt-link>
      文章列表
    </div>

    <KFooter />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, SetupContext } from '@nuxtjs/composition-api'
import useArticle from './useArticle'
import KFooter from '~/components/KFooter.vue'
import KWave from '~/components/KWave/index.vue'
import KHeader from '~/components/KHeader/index.vue'

export default defineComponent({
  name: 'Article',
  components: { KHeader, KWave, KFooter },
  setup (props, ctx: SetupContext) {
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

<style lang="scss">
@import "assets/css/pages/article.scss";
</style>

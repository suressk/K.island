<template>
  <div class="k-article-page">
    <KHeader custom-title="(≖ᴗ≖)✧" />
    <!--  文章列表页  -->
    <section class="content">
      <nuxt-link to="/article/12">
        detail
      </nuxt-link>
      文章列表
    </section>

    <KFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Article',
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

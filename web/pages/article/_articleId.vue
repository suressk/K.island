<template>
  <section class="k-article-info">
    <KHeader />

    <div class="content">
      <div class="article-content">
        <h1 class="title">
          文章内容 Title
        </h1>
        <div class="stuffix d-flex">
          <span class="time tip">January 21 2021</span>
          <span class="r-hover tip views d-flex">
          <i class="iconfont icon-view" />
          1314
        </span>
          <span class="g-hover tip tag d-flex">
          <i class="iconfont icon-tag" />
          Mood
        </span>
          <span class="comments tip d-flex">
          <i class="iconfont icon-comment" />
          25
        </span>
        </div>

        <div class="info">
          在以前的Android Studio版本中，我们介绍过一个Database Inspector，它主要用来帮助开发者理解和调试数据库，Database Inspector是基于一个APP Inspector 系统开发的，它支持很多不同的Inspector类型，比如下面介绍的WorkManager Inspector。
        </div>
      </div>

      <Comment />

      <ThemeSwitch />
    </div>

    <KFooter />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import Comment from '~/components/Comment/index.vue'
import KFooter from '~/components/KFooter.vue'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import {Context} from "@nuxt/types";
// import { Context } from '@nuxt/types'
// import { mapState } from 'vuex'

export default defineComponent({
  name: 'ArticleId',
  components: { KHeader, Comment, KFooter, ThemeSwitch },
  // validate(ctx: Context) {
  //   console.log('validate: ==== ', ctx)
  //   return true
  // },
  setup(props, { store }: Context) {
    const articleInfo = computed(() => store.state.articleInfo)
    console.log(articleInfo)
  }
})
</script>

<style lang="scss">
.k-article-info {
  .content {
    width: 800px;
    margin: 0 auto;
    min-height: calc(100vh - 40px);
  }
  .stuffix {
    padding: 10px 0;
    >span {
      margin-right: 10px;
    }
  }
}
</style>

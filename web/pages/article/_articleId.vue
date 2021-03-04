<template>
  <section class="k-article-info">
    <KHeader :custom-title="articleInfo.title" />

    <div class="content">
      <div class="article-content" :class="articleClass">
        <h1 class="title">
          {{ articleInfo.title }}
        </h1>
        <div class="stuffix d-flex">
          <span class="time tip">
            {{ articleInfo.time.day }} {{articleInfo.time.month }} {{ articleInfo.time.year }}
          </span>
          <span class="r-hover tip views d-flex">
            <i class="iconfont icon-view" />
            {{ articleInfo.views }}
          </span>
          <span class="g-hover tip tag d-flex">
            <i class="iconfont icon-tag" />
            {{ articleInfo.tag }}
          </span>
          <!--<span class="comments tip d-flex">-->
          <!--  <i class="iconfont icon-comment" />-->
          <!--  {{ articleInfo.time.day }}-->
          <!--</span>-->
        </div>

<!--        <div-->
<!--          class="info"-->
<!--          :class="{-->
<!--            mood: articleInfo.tag === 'Mood',-->
<!--            code: articleInfo.tag !== 'Mood'-->
<!--          }"-->
<!--          v-html="htmlContent"-->
<!--        ></div>-->
      </div>

      <Comment />

      <ThemeSwitch />
    </div>
    <BackTop />
    <KFooter />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, SetupContext } from '@nuxtjs/composition-api'
import { useState } from '~/utils/useStore'
import { parseMarkdownFile } from '~/utils/marked'
import { failLoadNotify } from '~/utils/util'
import { M_SET_ARTICLE_DETAIL } from '~/store/mutation-types'
import { Context } from '@nuxt/types'
import Comment from '~/components/Comment/index.vue'
import KFooter from '~/components/KFooter.vue'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import BackTop from '~/components/BackTop/index.vue'

export default defineComponent({
  name: 'ArticleId',
  components: { KHeader, Comment, KFooter, ThemeSwitch, BackTop },
  // validate(ctx: Context) {
  //   console.log('validate: ==== ', ctx)
  //   return true
  // },
  // @ts-ignore
  async fetch({ params, $axios, store }: Context): Promise<void> | void {
    /**
     *  $axios, $config, app, base, env, error(),
     *  from, isDev, isHMR, isStatic, next, nuxtState,
     *  params, payload, query, redirect, route, store
     */
    const { articleId } = params
    const articleItem = store.state.articleItem
    const paramsArr = articleId.split('_') // 路径参数由 uid_id 拼接而来
    const uid = paramsArr[0],
      id = paramsArr[1]
    try {
      const res = await $axios.get('/records/detail', {
        params: { uid, id }
      })
      // 请求文章 content 成功
      if (res.success) {
        store.commit(M_SET_ARTICLE_DETAIL, { ...articleItem, ...res.data })
      } else {
        store.commit(M_SET_ARTICLE_DETAIL, { ...articleItem, content: '' })
      }
    } catch (e) {
      failLoadNotify('article content')
      store.commit(M_SET_ARTICLE_DETAIL, { ...articleItem, content: '' })
    }
  },
  // // @ts-ignore
  // async asyncData({ params, $axios }: Context): Promise<object | void> | object | void {
  //   console.log('asyncData: ==== ')
  // },
  setup(props, { root }: SetupContext) {
    console.log('setup: ===', root)
    const articleDetail = useState(root.$store.state, 'articleDetail')
    const htmlContent = ref<string>('')

    const articleClass = computed(() => {
      if (articleDetail.value.tag.toLowerCase() === 'mood') {
        return 'mood'
      }
      return 'code'
    })

    htmlContent.value = parseMarkdownFile(articleDetail.value.content)

    return {
      articleDetail,
      htmlContent,
      articleClass
    }
  }
})
</script>

<style lang="scss">
@import "assets/css/components/marked.scss";

.k-article-info {
  .content {
    width: 800px;
    margin: 0 auto;
    min-height: calc(100vh - 40px);
  }
  .stuffix {
    padding: 10px 0;
    &>span {
      margin-right: 10px;
    }
  }
}
</style>

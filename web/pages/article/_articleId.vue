<template>
  <section class="k-article-info">
    <KHeader :custom-title="articleDetail.title" />

    <div class="content">
      <div class="article-content" :class="articleClass">
        <h1 class="title">
          {{ articleDetail.title }}
        </h1>
        <div class="stuffix d-flex">
          <span class="time tip">
            {{ articleDetail.time.day }} {{articleDetail.time.month }}, {{ articleDetail.time.year }}
          </span>
          <span class="r-hover tip views d-flex">
            <i class="iconfont icon-view" />
            {{ articleDetail.views }}
          </span>
          <span class="g-hover tip tag d-flex">
            <i class="iconfont icon-tag" />
            {{ articleDetail.tag }}
          </span>
          <!--<span class="comments tip d-flex">-->
          <!--  <i class="iconfont icon-comment" />-->
          <!--  {{ articleDetail.time.day }}-->
          <!--</span>-->
        </div>

        <div
          class="info"
          :class="articleClass"
          v-html="htmlContent"
        />
      </div>

      <button class="btn-primary btn" @click="handleShowCommentForm">Add Comment</button>

      <Modal
        title="添加评论"
        :visible.sync="addCommentVisible"
        :show-footer="false"
      >
        <CommentForm @submit-comment="handleGetCommentInfo" />
      </Modal>

      <ThemeSwitch />
    </div>
    <BackTop />
    <KFooter />
  </section>
</template>

<script lang="ts">
import {defineComponent, ref} from '@nuxtjs/composition-api'
import { parseMarkdownFile } from '~/utils/marked'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import { Context } from '@nuxt/types'
import { CommentInfo } from '~/@types'
import CommentForm from '~/components/CommentForm/index.vue'
import KFooter from '~/components/KFooter.vue'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import BackTop from '~/components/BackTop/index.vue'
import Modal from '~/components/KModal/index.vue'
// import { useState } from '~/utils/useStore'
// import { M_SET_ARTICLE_DETAIL } from '~/store/mutation-types'

export default defineComponent({
  name: 'ArticleId',
  components: { KHeader, CommentForm, KFooter, ThemeSwitch, BackTop, Modal },
  // @ts-ignore
  async asyncData({ params, $axios }: Context): Promise<object | void> | object | void {
    const { articleId } = params
    const paramsArr = articleId.split('_') // 路径参数由 uid_id 拼接而来
    const uid = paramsArr[0],
      id = paramsArr[1]
    try {
      const { success, data } = await $axios.get('/record/detail', {
        params: { uid, id }
      })
      // success to get article content
      if (success) {
        return {
          articleDetail: data,
          htmlContent: parseMarkdownFile(data.content),
          articleClass: data.tag.toLowerCase() === 'mood' ? 'mood' : 'code'
        }
      } else {
        return {
          articleDetail: {
            time: {}
          },
          htmlContent: '',
          articleClass: 'mood'
        }
      }
    } catch (e) {
      // failLoadNotify('article content')
      return {
        articleDetail: {},
        htmlContent: '',
        articleClass: 'mood'
      }
    }
  },
  setup() {
    const addCommentVisible = ref<boolean>(false)
    function handleGetCommentInfo(info: CommentInfo) {
      console.log(info)
    }
    function handleShowCommentForm() {
      addCommentVisible.value = true
    }
    return {
      addCommentVisible,
      handleGetCommentInfo,
      handleShowCommentForm
    }
  },
  head() {
    return {
      // @ts-ignore
      title: `${this.articleDetail.title} | K.island`
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

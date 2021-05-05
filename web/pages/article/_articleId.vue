<template>
  <section class='k-article-info'>
    <KHeader :title='article.title' :need-scroll='true' :music='article.music' />

    <div class='content'>
      <div class='article-content' :class='typeClass'>
        <h1 class='article-title'>{{ article.title }}</h1>
        <div class='stuffix d-flex'>
          <span class='time tip'>
            {{ article.time.day }} {{ article.time.month }} {{ article.time.year }}
          </span>
          <span class='tip tag d-flex'>分类 {{ article.tag }}</span>
          <span class='tip views d-flex'>浏览 {{ article.views }}</span>
          <span class='tip liked d-flex'>喜欢 {{ article.liked }}</span>
        </div>

        <div
          class='article-info'
          :class='typeClass'
          v-html='htmlContent'
        />
      </div>

      <Comment :article='article' />

      <ThemeSwitch />
    </div>
    <BackTop />
  </section>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import { parseMarkdownFile } from '~/utils/marked'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import { Context } from '@nuxt/types'
import Comment from '~/components/Comment/index.vue'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import BackTop from '~/components/BackTop/index.vue'
import Modal from '~/components/KModal/index.vue'

export default defineComponent({
  name: 'ArticleId',
  components: { KHeader, ThemeSwitch, BackTop, Modal, Comment },
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
          article: data,
          htmlContent: parseMarkdownFile(data.content),
          typeClass: data.tag.toLowerCase() === 'mood' ? 'mood' : 'code'
        }
      } else {
        return {
          article: {
            time: {}
          },
          htmlContent: '',
          typeClass: 'mood'
        }
      }
    } catch (e) {
      return {
        article: {
          time: {}
        },
        htmlContent: '',
        typeClass: 'mood'
      }
    }
  },
  head() {
    return {
      // @ts-ignore
      title: `${this.article.title} | K.island`
    }
  }
})
</script>

<style lang='scss'>
@import "assets/css/components/marked.scss";

.k-article-info {
  .content {
    width: 800px;
    margin: 0 auto;
  }

  .article-content {
    min-height: calc(100vh - 300px);

    .article-title {
      font-size: 24px;
      font-weight: 500;
      margin-top: 30px;
      line-height: 32px;
    }

    & > .stuffix {
      margin-bottom: 20px;
      padding: 10px 0;

      & > span {
        margin-right: 15px;
      }
    }

    .mood {
      p {
        line-height: 36px;
        margin-bottom: 20px;
      }
    }
  }

  .add-comment {
    margin: 20px 0;
  }

  .comment-modal {
    .modal-content {
      padding: 20px;
    }
  }
}
</style>

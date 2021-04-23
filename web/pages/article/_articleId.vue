<template>
  <section class='k-article-info'>
    <KHeader :title='articleDetail.title' :need-scroll='true'/>

    <div class='content'>
      <div class='article-content' :class='articleClass'>
        <div class='stuffix d-flex'>
          <span class='time tip'>
            {{ articleDetail.time.day }} {{ articleDetail.time.month }} {{ articleDetail.time.year }}
          </span>
          <span class='tip tag d-flex'>分类 {{ articleDetail.tag }}</span>
          <span class='tip views d-flex'>浏览 {{ articleDetail.views }}</span>
          <span class='tip liked d-flex'>喜欢 {{ articleDetail.liked }}</span>
        </div>

        <div
          class='article-info'
          :class='articleClass'
          v-html='htmlContent'
        />
      </div>

      <Comment :comment-list='commentList' @reply='addComment' />

      <ThemeSwitch/>
    </div>
    <BackTop/>
  </section>
</template>

<script lang='ts'>
import {defineComponent} from '@nuxtjs/composition-api'
import {parseMarkdownFile} from '~/utils/marked'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import {Context} from '@nuxt/types'
import {ReplyInfo} from '~/types'
import {AuthorInfo} from '~/store/mutation-types'
import {successNotify, warnNotify, errorNotify} from '~/utils/util'
import CommentForm from '~/components/CommentForm/index.vue'
import Comment from '~/components/CommentList/index.vue'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import BackTop from '~/components/BackTop/index.vue'
import Modal from '~/components/KModal/index.vue'

export default defineComponent({
  name: 'ArticleId',
  components: {KHeader, CommentForm, ThemeSwitch, BackTop, Modal, Comment},
  // @ts-ignore
  async asyncData({params, $axios}: Context): Promise<object | void> | object | void {
    const {articleId} = params
    const paramsArr = articleId.split('_') // 路径参数由 uid_id 拼接而来
    const uid = paramsArr[0],
      id = paramsArr[1]
    try {
      const { success, data } = await $axios.get('/record/detail', {
        params: {uid, id}
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
      return {
        articleDetail: {
          time: {}
        },
        htmlContent: '',
        articleClass: 'mood'
      }
    }
  },
  data() {
    return {
      commentList: [],
      commentStatus: -1
      // isReply: false /* 评论/回复他人评论： false === 评论文章；true === 回复他人 */
    }
  },
  methods: {
    addComment(info: ReplyInfo) {
      const {name, email, comment} = info
      const toName = info.toName || AuthorInfo.name
      const toEmail = info.toEmail || AuthorInfo.qq
      const topicId = info.topicId || null
      const parentId = info.parentId || null
      const vm = this
      // 新增评论 / 回复他人评论
      try {
        // @ts-ignore
        vm.$axios.post('/comment/add', {
          toName,
          toEmail,
          topicId,
          parentId,
          comment,
          fromName: name,
          fromEmail: email,
          /* @ts-ignore */
          articleId: vm.articleDetail.id,
          /* @ts-ignore */
          articleUid: vm.articleDetail.uid,
          /* @ts-ignore */
          articleTitle: vm.articleDetail.title
        }).then((res: any) => {
          if (!res.success) {
            warnNotify(res.message)
            return
          }
          successNotify(res.message)
        }).catch((err: any) => {
          errorNotify(err.message)
        })
      } catch (err) {
        errorNotify(err.message)
      }
    },
    getComment() {
      this.$axios.get('/comment/list', {
        /* @ts-ignore */
        params: {articleId: this.articleDetail.id}
      }).then((res: any) => {
        if (res.success) {
          this.commentList = res.data
        }
      }).catch((err: any) => {
        errorNotify(err.message)
      })
    }
  },
  mounted() {
    // @ts-ignore
    this.getComment()
  },
  head() {
    return {
      // @ts-ignore
      title: `${this.articleDetail.title} | K.island`
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
    & > .stuffix {
      margin: 20px 0;
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

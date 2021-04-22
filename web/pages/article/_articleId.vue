<template>
  <section class='k-article-info'>
    <KHeader :title='articleDetail.title' :need-scroll='true'/>

    <div class='content'>
      <div class='article-content' :class='articleClass'>
        <div class='stuffix d-flex'>
          <span class='time tip'>
            {{ articleDetail.time.day }} {{ articleDetail.time.month }}, {{ articleDetail.time.year }}
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

      <div class='add-comment'>
        <button class='btn-primary btn' @click='showComment(true)'>Add Comment</button>

        <Modal
          title='评论'
          :visible.sync='addCommentVisible'
          :show-footer='false'
          class='comment-modal'
        >
          <CommentForm @submit-comment='getCommentInfo'/>
        </Modal>
      </div>

      <Comment :comment-list='commentList' />

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
import {CommentInfo} from '~/types'
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
      const recordRes = await $axios.get('/record/detail', {
        params: {uid, id}
      })
      // success to get article content
      if (recordRes.success) {
        return {
          articleDetail: recordRes.data,
          htmlContent: parseMarkdownFile(recordRes.data.content),
          articleClass: recordRes.data.tag.toLowerCase() === 'mood' ? 'mood' : 'code'
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
      addCommentVisible: false,
      commentList: []
      // isReply: false /* 评论/回复他人评论： false === 评论文章；true === 回复他人 */
    }
  },
  methods: {
    showComment(flag: Boolean) {
      this.addCommentVisible = flag
    },
    getCommentInfo(info: CommentInfo) {
      const {name, email, comment} = info
      const vm = this
      // 新增评论 / 回复他人评论
      try {
        // @ts-ignore
        vm.$axios.post('/comment/add', {
          fromName: name,
          fromEmail: email,
          toName: '小K.',
          toEmail: 'sure_k@qq.com',
          articleId: vm.articleDetail.id,
          articleUid: vm.articleDetail.uid,
          articleTitle: vm.articleDetail.title,
          topicId: null,
          parentId: null,
          comment: comment
        }).then((res: any) => {
          if (!res.success) {
            warnNotify(res.message)
            return
          }
          successNotify(res.message)
          vm.showComment(false)
        }).catch((err: any) => {
          errorNotify(err.message)
        })
      } catch (err) {
        errorNotify(err.message)
      }
    },
    // 新增评论
    addComment() {

    },
    // 回复评论 / 评论他人评论
    reply() {

    },
    getComment() {
      this.$axios.get('/comment/list', {
        params: {articleId: this.articleDetail.id}
      }).then((res: any) => {
        if (res.success) {
          this.commentList = res.data
        }
      }).catch(err => {
        errorNotify(err.message)
      })
    }
  },
  mounted() {
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

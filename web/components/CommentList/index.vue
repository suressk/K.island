<template>
  <section class='comment'>
    <div class='comment-header flex-between'>
      <span class='comment-title'>Comment List({{ commentNum }})</span>

      <button class='btn btn-primary' @click='reply(false)'>Add Comment</button>

      <Modal
        title='评论'
        :visible.sync='visible'
        :show-footer='false'
        class='comment-modal'
      >
        <CommentForm @submit-comment='getCommentInfo' :mentions-name='mentionsInfo.toName' />
      </Modal>
    </div>

    <div v-if='commentNum === 0' class='empty-comment flex-center'>
      这片小沙滩还没人踩过呢~
    </div>
    <!--  评论列表  -->
    <ul v-else class='comment-list'>
      <li
        class='comment-item'
        v-for='commentItem in commentList'
        :key='commentItem.id'
      >
        <div class='item-head d-flex'>
          <div class='comment-avatar flex-center'>
            <img
              v-if='commentItem.fromEmail === AuthorInfo.qq || commentItem.fromEmail === AuthorInfo.outlook'
              src='~~/static/images/avatar.png'
              alt='小K.'
            >
            <span v-else>{{ commentItem.fromName.substring(0, 2) }}</span>
          </div>

          <div class='comment-nickname flex-between'>
            <span class='nickname txt-overflow'>{{ commentItem.fromName }}</span>
            <div class='time'>
              <span class='comment-reply' @click='reply(true, commentItem)'>Reply</span>
              <span class='comment-time'>{{ DAYJS(commentItem.ctime).format(timeFormat) }}</span>
            </div>
          </div>
        </div>
        <p class='comment-content'>{{ commentItem.content }}</p>

        <!--    二级评论    -->
        <ul class='children-list'>
          <li
            class='comment-item'
            v-for='childItem in commentItem.children'
            :key='childItem.id'
          >
            <div class='item-head d-flex'>
              <div class='comment-avatar flex-center'>
                <img
                  v-if='childItem.fromEmail === AuthorInfo.qq || childItem.fromEmail === AuthorInfo.outlook'
                  src='~~/static/images/avatar.png'
                  alt='小K.'
                >
                <span v-else>{{ childItem.fromName.substring(0, 2) }}</span>
              </div>

              <div class='comment-nickname flex-between'>
                <span class='nickname txt-overflow'>{{ childItem.fromName }}</span>
                <div class='time'>
                  <span class='comment-reply' @click='reply(true, childItem)'>Reply</span>
                  <span class='comment-time'>{{ DAYJS(childItem.ctime).format(timeFormat) }}</span>
                </div>
              </div>
            </div>
            <p class='comment-content'>
              <span>回复</span>
              <span>{{ childItem.toName }}</span>
              <span>：</span>
              {{ childItem.content }}
            </p>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script lang='ts'>
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'
import Modal from '~/components/KModal/index.vue'
import CommentForm from '~/components/CommentForm/index.vue'
import useComment from './useComment'
import DAYJS from 'dayjs'

export default defineComponent({
  name: 'CommentList',
  components: { Modal, CommentForm },
  props: {
    commentList: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props: any, ctx: SetupContext) {
    const timeFormat = 'YYYY-MM-DD HH:mm'

    return {
      ...useComment(props, ctx),
      timeFormat,
      DAYJS
    }
  },
  computed: {
    commentNum({ commentList }: any) {
      return commentList.length
    }
  }
})
</script>

<style lang='scss'>
@import "/assets/css/components/commentList";
</style>

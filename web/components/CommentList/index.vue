<template>
  <section class='comment'>
    <div class='comment-header flex-between'>
      <span class='comment-title'>Comment List({{ commentNum }})</span>

      <button class='btn btn-primary' @click='showModal'>Add Comment</button>

      <Modal
        title='评论'
        :visible.sync='visible'
        :show-footer='false'
        class='comment-modal'
      >
        <CommentForm @submit-comment='getCommentInfo'/>
      </Modal>
    </div>

    <!--  评论列表  -->
    <ul class='comment-list'>
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
            <span class='nickname'>{{ commentItem.fromName }}</span>
            <div class='time'>
              <span class='comment-reply'>Reply</span>
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
                <div>
                  <span class='nickname'>{{ childItem.fromName }}</span>
                  @
                  <span class='nickname'>{{ childItem.toName }}</span>
                </div>
                <div class='time'>
                  <span class='comment-reply'>Reply</span>
                  <span class='comment-time'>{{ DAYJS(commentItem.ctime).format(timeFormat) }}</span>
                </div>
              </div>
            </div>
            <p class='comment-content'>{{ commentItem.content }}</p>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
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
  setup() {
    const timeFormat = 'YYYY-MM-DD HH:mm'

    return {
      ...useComment(),
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

<template>
  <section class="comment">
    <div class='comment-header flex-between'>
      <span class='comment-title'>Comment List({{ commentNum }})</span>

      <button class='btn btn-primary'>Add Comment</button>
    </div>

    <ul class='comment-list'>
      <li
        class='comment-item'
        v-for='commentItem in commentList'
        :key='commentItem.id'
      >
        <div class='item-head d-flex'>
          <div class='comment-avatar flex-center'>
            <img
              v-if='commentItem.from_email === AuthorInfo.qq || commentItem.from_email === AuthorInfo.outlook'
              src='~~/static/images/avatar.png'
              alt='小K.'
            >
            <span v-else>{{ commentItem.from_name.substring(0, 2) }}</span>
          </div>

          <div class='comment-nickname flex-between'>
            <div>
              <span class='nickname'>{{ commentItem.from_name }}</span>
              <template v-if='commentItem.to_name'>
                @ <span class='nickname'>{{ commentItem.to_name }}</span>
              </template>
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
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useComment from './useComment'
import DAYJS from 'dayjs'

export default defineComponent({
  name: 'CommentList',
  components: {},
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
    commentNum({commentList}) {
      return commentList.length
    }
  }
})
</script>

<style lang="scss">
@import "/assets/css/components/commentList";
</style>

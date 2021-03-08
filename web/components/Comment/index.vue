<template>
  <section class="comment">
   <CommentForm @submit-comment="handleGetComment" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { CommentInfo } from '~/@types'
import CommentForm from './CommentForm.vue'

export default defineComponent({
  name: 'Comment',
  components: { CommentForm },
  setup() {
    function handleGetComment(info: CommentInfo) {
      console.log('Comment info: ', info)
    }

    return {
      handleGetComment
    }
  }
})
</script>

<style lang="scss">
@import "assets/css/components/comment.scss";
</style>

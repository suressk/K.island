<template>
  <section class="comment">
   <CommentForm @submit-comment="handleGetComment" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Comment',
  setup() {
    function handleGetComment(info) {
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

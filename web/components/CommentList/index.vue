<template>
  <section class="comment-list">
    comment list
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { CommentInfo } from '~/types'

export default defineComponent({
  name: 'Comment',
  components: {},
  setup() {
    function handleGetComment(info: CommentInfo) {
      console.log('CommentList info: ', info)
    }

    return {
      handleGetComment
    }
  }
})
</script>

<style lang="scss">
@import "../../assets/css/components/commentList";
</style>

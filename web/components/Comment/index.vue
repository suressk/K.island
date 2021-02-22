<template>
  <section class="comment">
    <!--  评论表单  -->
    <div class="comment-form">
      <div class="flex-center chat-container">
        <label class="name-txt">
          <input type="text" placeholder="Enter your name" v-model="name">
        </label>
        <label class="email-txt">
          <input type="text" placeholder="Enter your email" v-model="email">
        </label>
      </div>
      <label class="content-txt">
        <textarea v-model="comment" placeholder="What you want to say..." />
      </label>
      <div class="comment-submit d-flex">
        <button class="btn">Submit</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Comment',
  setup() {
    const name = ref<string>('')
    const email = ref<string>('')
    const comment = ref<string>('')

    return {
      name,
      email,
      comment
    }
  }
})
</script>

<style lang="scss">
@import "assets/css/components/comment.scss";
</style>

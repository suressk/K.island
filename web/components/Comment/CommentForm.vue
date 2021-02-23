<template>
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
      <textarea class="scroller-light" v-model="comment" placeholder="What you want to say..." />
    </label>
    <div class="comment-submit d-flex">
      <button
        class="btn trans-all-03"
        :class="{ disabled: disabledSubmit }"
        :disabled="disabledSubmit"
        @click="handleSubmit"
      >
        SUBMIT
      </button>
      <CubeLoading v-show="tipIndex === 6" />
      <span
        v-show="tipIndex > -1"
        :class="{
          'success-tip': tipIndex === 8,
          'error-tip': tipIndex > -1 && tipIndex < 8
        }"
      >
        {{ tipIndex > -1 ? tipTxt[tipIndex] : "" }}
      </span>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useCommentForm from './useCommentForm'

export default defineComponent({
  name: 'CommentForm',
  setup(props, ctx) {
    return {
      ...useCommentForm(ctx)
    }
  }
})
</script>

<style lang="scss"></style>

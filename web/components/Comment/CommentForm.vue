<template>
  <!--  评论表单  -->
  <div class="comment-form">
    <div class="flex-center chat-container">
      <label class="name-txt">
        <i class="iconfont icon-name" />
        <input type="text" placeholder="Enter your name" v-model="name">
      </label>
      <label class="email-txt">
        <i class="iconfont icon-email" />
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
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'
import useCommentForm from './useCommentForm'
import { CommentProps } from '~/@types'
import CubeLoading from '../loadingComp/CubeLoading.vue'

export default defineComponent({
  name: 'CommentForm',
  components: { CubeLoading },
  setup(props: CommentProps, ctx: SetupContext) {
    return {
      ...useCommentForm(props, ctx)
    }
  }
})
</script>

<style lang="scss"></style>

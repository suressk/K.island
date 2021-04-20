<template>
  <!--  评论表单  -->
  <div class='comment-form'>
    <span class='mentions txt-overflow' :class='{show: mentionsName}'>@{{ mentionsName }}</span>
    <div class='d-flex chat-container'>
      <label class='name-txt'>
        <i class='iconfont icon-name' />
        <input type='text' placeholder='Your nickname' v-model='name'>
      </label>
      <label class='email-txt'>
        <i class='iconfont icon-email' />
        <input type='text' placeholder='Your email' v-model='email'>
      </label>
    </div>
    <label class='content-txt'>
      <textarea class='scroller-light' v-model='comment' placeholder='Your words...' />
    </label>
    <div class='comment-submit d-flex'>
      <span class='comment-status d-flex'>
        <CubeLoading v-show='tipIndex === 6' />
        <span
          v-show='tipIndex > -1'
          class='comment-tip'
          :class="{
            'success-tip': tipIndex === 7,
            'error-tip': tipIndex > -1 && tipIndex < 7
          }"
        >
          {{ tipIndex > -1 ? tipTxt[tipIndex] : '' }}
        </span>
      </span>
      <button
        class='btn btn-primary'
        :class='{ disabled: disabledSubmit }'
        :disabled='disabledSubmit'
        @click='handleSubmit'
      >
        SUBMIT
      </button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'
import useCommentForm from './useCommentForm'
import { CommentProps } from '~/types'
import CubeLoading from '../loadingComp/CubeLoading.vue'

// name, email, articleId, topicId, parentId, comment

export default defineComponent({
  name: 'CommentForm',
  components: { CubeLoading },
  props: {
    mentionsName: {
      type: String,
      default: ''
    }
  },
  setup(props: CommentProps, ctx: SetupContext) {
    return {
      ...useCommentForm(props, ctx)
    }
  }
})
</script>

<style lang='scss'>
@import "assets/css/components/commentForm.scss";
</style>

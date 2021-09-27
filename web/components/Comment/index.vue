<template>
  <section class="comment">
    <div class="comment-header flex-between">
      <span class="comment-title">Comment List({{ commentNum }})</span>

      <button class="btn btn-primary" @click="replyComment(false)">Add Comment</button>

      <Modal title="评论" :visible.sync="visible" :show-footer="false" class="comment-modal">
        <!--  评论表单  -->
        <div class="comment-form">
          <span
            class="mentions txt-overflow"
            :class="{ show: mentionsInfo.toName }"
          >回复：{{ mentionsInfo.toName }}</span>
          <div class="d-flex chat-container">
            <label class="name-txt">
              <i class="iconfont icon-name" />
              <input type="text" placeholder="昵称，方便区识哦~" v-model="commentInfo.name" />
            </label>
            <label class="email-txt">
              <i class="iconfont icon-email" />
              <input type="text" placeholder="邮箱，仅用于他人回复你的邮件通知" v-model="commentInfo.email" />
            </label>
          </div>

          <!-- Just fixed the warning of 'password input should be wrapped by form ' -->
          <form>
            <div v-show="showVerify" style="padding: 0 10px 10px;">
              <label>
                <input
                  type="password"
                  placeholder="verification..."
                  autocomplete="off"
                  v-model="commentInfo.verification"
                />
              </label>
            </div>
          </form>

          <label class="content-txt">
            <textarea class="scroller-light" v-model="commentInfo.comment" placeholder="想说点什么呢？" />
          </label>
          <div class="comment-submit d-flex">
            <span class="comment-status d-flex">
              <CubeLoading v-show="submitting" />
              <span v-show="tipIndex > -1" class="comment-tip" :class="tipClass">{{ tipContent }}</span>
            </span>
            <button
              class="btn btn-primary"
              :class="{ disabled: disabledSubmit }"
              :disabled="disabledSubmit"
              @click="submit"
            >SUBMIT</button>
          </div>
        </div>
      </Modal>
    </div>

    <div v-if="commentNum === 0" class="empty-comment flex-center">这片小沙滩还没人踩过呢，你来留下第一个小脚丫吗~</div>

    <template v-else>
      <!--  评论列表  -->
      <ul class="comment-list">
        <li class="comment-item" v-for="commentItem in showList" :key="commentItem.id">
          <div class="item-head d-flex">
            <div class="comment-avatar flex-center">
              <img
                v-if="commentItem.fromEmail === AuthorInfo.qq || commentItem.fromEmail === AuthorInfo.outlook"
                src="~~/static/images/avatar.png"
                alt="小K."
              />
              <span v-else>{{ commentItem.fromName.substring(0, 2) }}</span>
            </div>

            <div class="comment-nickname flex-between">
              <span class="nickname txt-overflow">{{ commentItem.fromName }}</span>
              <div class="time">
                <span class="comment-reply" @click="replyComment(true, commentItem)">Reply</span>
                <span class="comment-time">{{ formatTime(commentItem.ctime, TIME_FORMAT) }}</span>
              </div>
            </div>
          </div>
          <p class="comment-content">{{ commentItem.content }}</p>

          <!--    二级评论    -->
          <ul class="children-list">
            <li class="comment-item" v-for="childItem in commentItem.children" :key="childItem.id">
              <div class="item-head d-flex">
                <div class="comment-avatar flex-center">
                  <img
                    v-if="childItem.fromEmail === AuthorInfo.qq || childItem.fromEmail === AuthorInfo.outlook"
                    src="~~/static/images/avatar.png"
                    alt="小K."
                  />
                  <span v-else>{{ childItem.fromName.substring(0, 2) }}</span>
                </div>

                <div class="comment-nickname flex-between">
                  <span class="nickname txt-overflow">{{ childItem.fromName }}</span>
                  <div class="time">
                    <span class="comment-reply" @click="replyComment(true, childItem)">Reply</span>
                    <span class="comment-time">{{ formatTime(childItem.ctime, TIME_FORMAT) }}</span>
                  </div>
                </div>
              </div>
              <p class="comment-content">
                <span>回复</span>
                <span>{{ childItem.toName }}</span>
                <span>：</span>
                {{ childItem.content }}
              </p>
            </li>
          </ul>
        </li>
      </ul>

      <LoadMore @load-more="pagePlus" />
    </template>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import Modal from '~/components/KModal/index.vue'
import CubeLoading from '../loadingComp/CubeLoading.vue'
import LoadMore from '~/components/LoadMore.vue'
import useList from './useList'
import { formatTime } from '~/utils'

const TIME_FORMAT = 'YYYY-MM-DD HH:mm'

export default defineComponent({
  name: 'Comment',
  components: { Modal, CubeLoading, LoadMore },
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props: any) {
    return {
      ...useList(props),
      TIME_FORMAT,
      formatTime
    }
  }
  // computed: {
  //   commentNum({ commentList }: any) {
  //     return commentList.length
  //   }
  // }
})
</script>

<style lang='scss'>
@import "/assets/css/components/comment";
</style>

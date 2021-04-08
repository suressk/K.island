<template>
  <section class='k-message'>
    <KHeader />
    <div class='content'>
      <!--    v-show="showTip"    -->
      <transition name='fadeUp' mode='out-in'>
        <div class='tip-message' v-show='showTip'>
          <i class='iconfont icon-close' @click='hideTipMsg' />
          <p>😍 你可以在这里写下你想对 Ta 说的话，然后悄悄地扔个网址给 Ta ~ <span class='tip'>（你的内心OS：我直接给人家说不香吗？）</span></p>
          <p>❤️ 你也可以在这里写下你想说的励志鸡汤，伤感心情，牢骚小文，也或是当一回文人墨客<span class='tip'>（小K.都是欢迎的）</span></p>
          <p>🤨 <span class='tip'>如果你的有些言论太过敏感或是不太合适展示给大家看的内容，小 K. 看到后可能会删掉哦~ 还是记得多传播积极的东西哦</span></p>
        </div>
      </transition>

      <div class='add-message'>
        <button class='btn btn-primary' @click='showModal'>Leave a Message</button>
        <!--   添加留言 modal   -->
        <Modal
          :visible.sync='modalVisible'
          @ok='handleAddMessage'
        >
          <template v-slot:avatar>
            <img src='~~/static/images/avatar.png' alt='K. avatar'>
          </template>

          <!--  edit message form  -->
          <div class='message-form'>
            <div class='message-from-item'>
              <label>
                <input type='text' placeholder='Enter your nickname' v-model='nickName'>
              </label>
            </div>
            <div class='message-from-item'>
              <label>
                <textarea
                  class='message-content scroller'
                  placeholder='Enter the message what you wanna to leave...'
                  v-model='messageContent'
                />
              </label>
            </div>
          </div>

        </Modal>
      </div>

      <!--   留言列表   -->
      <ul class='message-list'>
        <li
          class='message-item'
          v-for='msg in msgList'
          :key='msg.uid'
        >
          <div>
            <p class='message-content'>{{ msg.content }}</p>
            <span class='time'>{{ msg.ctime }}</span>
          </div>
          <p class='message-form'>{{ msg.name }}</p>
        </li>
      </ul>

      <LoadMore :load-status='loadStatus' :show-load-more='false' />
    </div>

    <ThemeSwitch />
    <BackTop />
  </section>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import { mapState } from 'vuex'
import {
  CURRENT_PAGE,
  LOAD_MORE,
  LOAD_STATUS,
  LOADING,
  LEAVE_MSG_LIMIT,
  M_SET_CURRENT_PAGE,
  M_SET_LOAD_STATUS,
  M_RESET_LOAD_MORE,
  M_SET_TOTAL_ITEMS,
  TOTAL_ITEMS, NO_MORE
} from '~/store/mutation-types'
import {
  getStorageItem,
  setStorageItem,
  isToday,
  warnNotify,
  successNotify,
  errorNotify,
  commitMutations
} from '~/utils/util'
import { Context } from '@nuxt/types'
import { PaginationParams } from '~/types'
import scrollMixin from '~/mixin/scroller'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import BackTop from '~/components/BackTop/index.vue'
import Modal from '~/components/KModal/index.vue'
import LoadMore from '~/components/LoadMore.vue'

// import Confirm from '~/components/popConfirm'
// import { MsgListItem } from '~/types'

interface MsgLimitInfo {
  time: number
  name: string
}

export default defineComponent({
  name: 'Messages',
  mixins: [scrollMixin],
  components: { Modal, KHeader, ThemeSwitch, BackTop, LoadMore },
  async asyncData(ctx: Context) {
    try {
      // @ts-ignore
      const { success, data } = await ctx.$axios.get('/message/list', {
        params: {
          pageNo: 1,
          pageSize: 10
        }
      })
      if (success) {
        // @ts-ignore
        const { list, total } = data
        commitMutations(ctx.store, M_SET_TOTAL_ITEMS, total)
        return {
          msgList: list
        }
      } else {
        return {
          msgList: []
        }
      }
    } catch (err) {
      return {
        msgList: []
      }
    }
  },
  data() {
    return {
      showTip: true,
      modalVisible: false,
      nickName: '',
      messageContent: '',
      msgLimit: {
        time: 0,
        name: ''
      }
    }
  },
  computed: {
    ...mapState({
      totalItems: (state: any) => state[TOTAL_ITEMS],
      currentPage: (state: any) => state[CURRENT_PAGE],
      loadStatus: (state: any) => state[LOAD_STATUS]
    })
  },
  methods: {
    hideTipMsg() {
      this.showTip = false
    },
    showModal() {
      this.modalVisible = true
      this.nickName = this.msgLimit.name
    },
    hideModal() {
      this.modalVisible = false
      this.messageContent = ''
    },
    // get message list
    async getMessageList(params: PaginationParams) {
      commitMutations(this.$store, M_SET_LOAD_STATUS, LOADING) // 正在加载
      try {
        // @ts-ignore
        const { success, message, data } = await this.$axios.get('/message/list', { params })
        if (success) {
          const { list, total } = data
          commitMutations(this.$store, M_SET_CURRENT_PAGE, params.pageNo) // 当前页 +1
          commitMutations(this.$store, M_SET_TOTAL_ITEMS, total) // 总条数更新
          // @ts-ignore 还有更多留言
          if (this.msgList.length < total) {
            commitMutations(this.$store, M_SET_LOAD_STATUS, LOAD_MORE) // 还有更多 可加载
          } else {
            commitMutations(this.$store, M_SET_LOAD_STATUS, NO_MORE) // 没有更多
          }
          // @ts-ignore
          params.pageNo > 1 ? (this.msgList = [...this.msgList, ...list]) : (this.msgLimit = list)
        } else {
          warnNotify(message)
          commitMutations(this.$store, M_SET_LOAD_STATUS, LOAD_MORE) // 还有更多 可加载
        }
      } catch (err) {
        errorNotify(err.message)
        commitMutations(this.$store, M_SET_LOAD_STATUS, LOAD_MORE) // 还有更多 可加载
      }
    },
    async handleAddMessage() {
      const vm = this
      // 限定时间是今日
      if (isToday(this.msgLimit.time)) {
        warnNotify('为了避免恶意或误操作留言刷屏，小K. 限定了一天只能写 1 条留言哦，明天再来叭~')
        return
      }
      try {
        // @ts-ignore
        const { success, message } = await vm.$axios.post('/message/add', {
          name: this.nickName,
          message: this.messageContent
        })
        if (success) {
          successNotify(message)
          /**
           * 添加 msg 成功，时间更新
           * */
          vm.msgLimit.time = Date.now()
          vm.msgLimit.name = vm.nickName
          setStorageItem<MsgLimitInfo>(LEAVE_MSG_LIMIT, vm.msgLimit)
          vm.hideModal()
          vm.getMessageList({
            pageNo: 1,
            pageSize: 10
          }).then(() => {
            commitMutations(vm.$store, M_SET_CURRENT_PAGE, 1)
          })
        } else {
          warnNotify(message)
        }
      } catch (err) {
        errorNotify(err.message)
      }
    },
    /**
     * 初始化新增留言限制数
     * */
    initMsgLimit() {
      const localLimit = getStorageItem<MsgLimitInfo>(LEAVE_MSG_LIMIT)

      // 初次加载 / 非今日
      if (localLimit === null || !isToday(localLimit.time)) {
        setStorageItem<MsgLimitInfo>(LEAVE_MSG_LIMIT, { time: Date.now(), name: '' })
        return
      }
      // 曾留言 且是今日
      this.msgLimit = localLimit
    },
  },
  mounted() {
    this.initMsgLimit()
  },
  beforeDestroy() {
    commitMutations(this.$store, M_RESET_LOAD_MORE)
  },
  watch: {
    scrollerIsBottom(flag) {
      // @ts-ignore
      if (flag && (this.loadStatus === LOAD_MORE) && (this.msgList.length < this.totalItems)) {
        // 滚动到页底，加载下一页数据
        this.getMessageList({
          pageNo: this.currentPage + 1,
          pageSize: 10
        })
      }
    }
  },
  head() {
    return {
      title: '留言板 — Leave what you wanna to say | K.island'
    }
  }
})
</script>

<style lang='scss'>
@import "../assets/css/pages/message.scss";
</style>

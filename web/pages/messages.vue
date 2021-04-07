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
        <button class='btn btn-primary' @click='showAddMsgModal'>Leave a Message</button>
        <!--   添加留言 modal   -->
        <Modal
          :visible.sync='showModal'
          @ok='handleAddMessage'
        >
          <template v-slot:avatar>
            <img src='~~/static/images/avatar.png' alt='K. avatar'>
          </template>

          <!--  edit message form  -->
          <div class='message-form'>
            <div class='message-from-item'>
              <label>
                <input type='text' placeholder='Enter your nickname' v-model='name'>
              </label>
            </div>
            <div class='message-from-item'>
              <label>
                <textarea
                  class='message-content scroller'
                  placeholder='Enter the message what you wanna to leave...'
                  v-model='message'
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
  MSG_LIMIT_NUM,
  M_SET_CURRENT_PAGE,
  M_SET_LOAD_STATUS,
  M_RESET_LOAD_MORE,
  M_SET_TOTAL_ITEMS,
  TOTAL_ITEMS, NO_MORE
} from '~/store/mutation-types'
import {
  getStorageValue,
  setStorageValue,
  isToday,
  warnNotify,
  successNotify,
  errorNotify,
  commitMutations
} from '~/utils/util'
import { Context } from '@nuxt/types'
import scrollMixin from '~/mixin/scroller'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import BackTop from '~/components/BackTop/index.vue'
import Modal from '~/components/KModal/index.vue'
import LoadMore from '~/components/LoadMore.vue'

// import Confirm from '~/components/popConfirm'
// import { MsgListItem } from '~/types'

interface MsgLimitValue {
  time: number
  added: number
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
      showModal: false,
      name: '',
      message: '',
      msgLimit: {
        time: 0,
        added: 0
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
    showAddMsgModal() {
      this.showModal = true
    },
    // get message list
    async getMessageList() {
      const curTotal = this.currentPage * 10
      if (curTotal >= this.totalItems) return

      // load more messages
      const current = this.currentPage + 1
      commitMutations(this.$store, M_SET_CURRENT_PAGE, current)
      commitMutations(this.$store, M_SET_LOAD_STATUS, LOADING) // 正在加载
      try {
        // @ts-ignore
        const { success, data } = await this.$axios.get('/message/list', {
          params: {
            pageNo: current,
            pageSize: 10
          }
        })
        if (success) {
          const { list, total } = data
          // @ts-ignore
          this.msgList = [...this.msgList, list]
          // @ts-ignore
          if (this.msgList.length < total) {
            commitMutations(this.$store, M_SET_LOAD_STATUS, LOAD_MORE) // 正在加载
          } else {
            commitMutations(this.$store, M_SET_LOAD_STATUS, NO_MORE) // 正在加载
          }


        }

      } catch (err) {

      }
    },
    async handleAddMessage() {
      if (isToday(this.msgLimit.time) && this.msgLimit.added > 5) {
        warnNotify('一天只能写 5 条留言哦，明天再来叭~')
        return
      }
      try {
        // @ts-ignore
        const { success, message } = await this.$axios.post('/message/add', {
          name: this.name,
          message: this.message
        })
        if (success) {
          successNotify(message)
          /**
           * 添加 msg 成功，已留言数 +1
           * */
          setStorageValue<MsgLimitValue>(MSG_LIMIT_NUM, {
            time: this.msgLimit.time,
            added: this.msgLimit.added++
          })
        } else {
          warnNotify(message)
        }
      } catch (e) {
        errorNotify(e.message)
      }
    },
    /**
     * 初始化新增留言限制数
     * */
    initMsgLimit() {
      const localLimit = getStorageValue<MsgLimitValue>(MSG_LIMIT_NUM)

      this.msgLimit.time = Date.now()
      this.msgLimit.added = 0

      // 初次加载 / 非今日 => 已留言数置为 0
      if (localLimit === null || !isToday(localLimit.time)) {
        setStorageValue<MsgLimitValue>(MSG_LIMIT_NUM, this.msgLimit)
        return
      }
      this.msgLimit = { ...localLimit }
    }
  },
  mounted() {
    this.initMsgLimit()
  },
  beforeDestroy() {
    commitMutations(this.$store, M_RESET_LOAD_MORE)
  },
  watch: {
    scrollerIsBottom(flag) {
      console.log('scrollerIsBottom value: ', flag)
      flag && (this.loadStatus === LOAD_MORE) && this.getMessageList()
    }
  },
  head() {
    return {
      title: '留言板 — 留下你想说的话吧 | K.island'
    }
  }
})
</script>

<style lang='scss'>
@import "../assets/css/pages/message.scss";
</style>

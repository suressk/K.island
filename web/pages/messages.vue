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
        <li class='message-item'></li>
      </ul>

      <button class='btn btn-success' @click='confirm'>Confirm</button>

      <LoadMore :load-status='loadStatus' :show-load-more='false' />
    </div>

    <ThemeSwitch />
    <BackTop />
  </section>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import { CURRENT_PAGE, LOAD_MORE, LOAD_STATUS, MSG_LIMIT_NUM, TOTAL_ITEMS } from '~/store/mutation-types'
import { mapState } from 'vuex'
import { Context } from '@nuxt/types'
import { getStorageValue, setStorageValue, isToday, warnNotify, successNotify, errorNotify } from '~/utils/util'
import Confirm from '~/components/popConfirm'
import scrollMixin from '~/mixin/scroller'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import BackTop from '~/components/BackTop/index.vue'
import Modal from '~/components/KModal/index.vue'
import LoadMore from '~/components/LoadMore.vue'

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
        return {
          msgList: [...data.list],
          total: data.total
        }
      }
      return {
        msgList: [],
        total: 0
      }
    } catch (e) {
      return {
        msgList: [],
        total: 0
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
    confirm() {
      Confirm({
        type: 'warning',
        message: 'Are you sure ?',
        onOk: () => {
          // handleAddMessage()
        }
      })
    },
    // get message list
    getMessageList() {
      console.log('get message list run...')
    },
    handleAddMessage() {
      if (isToday(this.msgLimit.time) && this.msgLimit.added >= 5) {
        warnNotify('一天只能写 5 条留言哦，明天再来叭~')
        return
      }
      try {
        // @ts-ignore
        proxy.$axios.post('/message/add', {
          name: this.name,
          message: this.message
        }).then((res: any) => {
          if (res.success) {
            successNotify(res.message)
          } else {
            warnNotify(res.message)
          }
        }).catch((err: any) => {
          errorNotify(err.message)
        })
      } catch (e) {
        errorNotify(e.message)
      }
      /**
       * 添加 msg 成功，已留言数 +1
       * */
      setStorageValue<MsgLimitValue>(MSG_LIMIT_NUM, {
        time: this.msgLimit.time,
        added: this.msgLimit.added++
      })
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
  watch: {
    scrollerIsBottom(flag) {
      flag && (this.loadStatus === LOAD_MORE) && this.getMessageList()
    }
  },
  head() {
    return {
      title: '留言板 — 留下你对世间生活的感悟吧 | K.island'
    }
  }
})
</script>

<style lang='scss'>
@import "../assets/css/pages/message.scss";
</style>

<template>
  <section class='k-message'>
    <KHeader />
    <div class='content'>
      <!--    v-show="showTip"    -->
      <transition name='fadeUp' mode='out-in'>
        <div class='tip-message' v-show='showTip'>
          <i class='iconfont icon-close' @click='handleHideTipMsg' />
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
    </div>

    <ThemeSwitch />
    <BackTop />
  </section>
</template>

<script lang='ts'>
import { defineComponent, onMounted, onBeforeUnmount, ref, getCurrentInstance, reactive, watch } from '@nuxtjs/composition-api'
import { MSG_LIMIT_NUM } from '~/store/mutation-types'
import { Context } from '@nuxt/types'
import scrollMixin from '~/mixin/scroller'
import { getStorageValue, setStorageValue, isToday, warnNotify, successNotify, errorNotify } from '~/utils/util'
import Confirm from '~/components/popConfirm'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import BackTop from '~/components/BackTop/index.vue'
import Modal from '~/components/KModal/index.vue'
// import { MsgListItem } from '~/types'

interface MsgLimitValue {
  time: number
  added: number
}

export default defineComponent({
  name: 'Messages',
  mixins: [scrollMixin],
  components: { Modal, KHeader, ThemeSwitch, BackTop },
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
  setup() {
    const { proxy } = getCurrentInstance()!
    const showTip = ref<boolean>(true)
    const showModal = ref<boolean>(false)

    const name = ref<string>('')
    const message = ref<string>('')

    let msgLimit = reactive<MsgLimitValue>({
      time: 0,
      added: 0
    })

    function handleHideTipMsg() {
      showTip.value = false
    }

    function showAddMsgModal() {
      showModal.value = true
    }

    function confirm() {
      Confirm({
        type: 'warning',
        message: 'Are you sure ?',
        onOk: () => {
          // handleAddMessage()
        }
      })
    }

    // get more messages
    function getMessageList() {

    }

    const stopWatch = watch(() => proxy.scrollerIsBottom, (flag: boolean) => {
      flag && getMessageList()
    })

    // modal 确认点击（新增留言 message）
    function handleAddMessage() {
      if (isToday(msgLimit.time) && msgLimit.added >= 5) {
        warnNotify('一天只能写 5 条留言哦，明天再来叭~')
        return
      }
      try {
        // @ts-ignore
        proxy.$axios.post('/message/add', {
          name: name.value,
          message: message.value
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
      // @ts-ignore
      // console.log(proxy.$axios)
      /**
       * 添加 msg 成功，已留言数 +1
       * 时间更新？？？
       * */
      setStorageValue<MsgLimitValue>(MSG_LIMIT_NUM, {
        time: msgLimit.time,
        added: msgLimit.added++
      })
    }

    /**
     * 初始化新增留言限制数
     * */
    function initMsgLimit() {
      const localLimit = getStorageValue<MsgLimitValue>(MSG_LIMIT_NUM)

      msgLimit.time = Date.now()
      msgLimit.added = 0

      // 初次加载 / 非今日 => 已留言数置为 0
      if (localLimit === null || !isToday(localLimit.time)) {
        setStorageValue<MsgLimitValue>(MSG_LIMIT_NUM, msgLimit)
        return
      }
      msgLimit = { ...localLimit }
    }

    onMounted(() => {
      initMsgLimit()
    })

    onBeforeUnmount(() => {
      stopWatch()
    })

    return {
      showTip,
      showModal,
      name,
      message,
      handleHideTipMsg,
      showAddMsgModal,
      confirm,
      handleAddMessage
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

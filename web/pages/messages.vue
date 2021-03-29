<template>
  <section class="k-message">
    <KHeader />
    <div class="content">
      <!--    v-show="showTip"    -->
      <transition name="fadeUp" mode="out-in">
        <div class="tip-message" v-show="showTip">
          <i class="iconfont icon-close" @click="handleHideTipMsg" />
          <p>😍 你可以在这里写下你想对 Ta 说的话，然后悄悄地扔个网址给 Ta ~ <span class="tip">（你的内心OS：我直接给人家说不香吗？）</span></p>
          <p>❤️ 你也可以在这里写下你想说的励志鸡汤，伤感心情，牢骚小文，也或是当一回文人墨客<span class="tip">（小K.都是欢迎的）</span></p>
          <p>🤨 <span class="tip">如果你的有些言论太过敏感或是不太合适展示给大家看的内容，小 K. 看到后可能会删掉哦~ 还是记得多传播积极的东西哦</span></p>
        </div>
      </transition>

      <div class="add-message">
        <button class="btn btn-primary" @click="showAddMsgModal">Leave a Message</button>
        <!--   添加留言 modal   -->
        <Modal
          :visible.sync="showModal"
          @ok="handleAddMessage"
        >
          <template v-slot:avatar>
            <img src="~~/static/images/avatar.png" alt="K. avatar">
          </template>
        </Modal>
      </div>

      <!--   留言列表   -->
      <ul class="message-list">
        <li class="message-item"></li>
      </ul>

      <button class="btn btn-success" @click="confirm">Confirm</button>
    </div>

    <ThemeSwitch />
    <BackTop />
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, getCurrentInstance } from '@nuxtjs/composition-api'
import { getStorageValue, setStorageValue, isToday } from '~/utils/util'
import { MSG_LIMIT_NUM } from '~/store/mutation-types'
import Confirm from '~/components/popConfirm'
import Notify from '~/components/notification'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import BackTop from '~/components/BackTop/index.vue'
import Modal from '~/components/KModal/index.vue'

interface MsgLimitValue {
  time: number
  added: number
}

export default defineComponent({
  name: 'MessageBoard',
  components: { Modal, KHeader, ThemeSwitch, BackTop },
  setup() {
    const { proxy } = getCurrentInstance()!
    const showTip = ref<boolean>(true)
    const showModal = ref<boolean>(false)
    let msgLimit: MsgLimitValue

    function handleHideTipMsg() {
      showTip.value = false
    }

    function showAddMsgModal() {
      showModal.value = true
    }

    function confirm() {
      Confirm({
        type: 'warning',
        message: '确认吗',
        onOk: () => {
          console.log('确认按钮点击')
        }
      })
    }

    function handleAddMessage() {
      if (isToday(msgLimit.time) && msgLimit.added > 5) {
        Notify({
          type: 'warning',
          title: 'Sorry~',
          message: '您一天最多只能写 5 条留言哦，明天再来叭~'
        })
        return
      }
      // @ts-ignore
      console.log(proxy.$axios)
      /**
       * 添加 msg 成功，已留言数 +1
       * 时间更新？？？
       * */
      setStorageValue<MsgLimitValue>(MSG_LIMIT_NUM, {
        time: msgLimit.time,
        added: msgLimit.added + 1
      })
    }
    /**
     * 初始化新增留言限制数
     * */
    function initMsgLimit() {
      const localLimit = getStorageValue<MsgLimitValue>(MSG_LIMIT_NUM)

      msgLimit = {
        time: Date.now(),
        added: 0
      }
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

    return {
      showTip,
      showModal,
      handleHideTipMsg,
      showAddMsgModal,
      confirm,
      handleAddMessage
    }
  },
  head () {
    return {
      title: '留言板 — 留下你对世间生活的感悟吧 | K.island'
    }
  }
})
</script>

<style lang="scss">
@import "assets/css/pages/messageBoard.scss";
</style>

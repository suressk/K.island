<template>
  <section class="k-message-board">
    <KHeader />
    <div class="content">
      <!--    v-show="showTip"    -->
      <transition name="fadeUp" mode="out-in">
        <div class="tip-message" v-show="showTip">
          <i class="iconfont icon-close" @click="handleCloseTipMsg" />
          <p>😍 你可以在这里写下你想对 Ta 说的话，然后悄悄地扔个网址给 Ta ~ <span class="tip">（你的内心OS：我直接给人家说不香吗？）</span></p>
          <p>❤️ 你也可以在这里写下你想说的励志鸡汤，伤感心情，牢骚小文，也或是当一回文人墨客<span class="tip">（小K.都是欢迎的）</span></p>
          <p>🤨 <span class="tip">如果你的有些言论太过敏感或是不太合适展示给大家看的内容，小 K. 看到后可能会删掉哦~ 还是记得多传播积极的东西哦</span></p>
        </div>
      </transition>

      <div class="add-message">
        <button class="btn btn-primary" @click="showAddMsgModal">Add a Message</button>
        <!--   添加留言 modal   -->
        <Modal :visible.sync="showModal">

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
    <KFooter />
  </section>
</template>

<script lang="ts">
import { ref, defineComponent } from '@nuxtjs/composition-api'
import Confirm from '~/components/popConfirm'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import BackTop from '~/components/BackTop/index.vue'
import KFooter from '~/components/KFooter.vue'
import Modal from '~/components/KModal/index.vue'

export default defineComponent({
  name: 'MessageBoard',
  components: { Modal, KHeader, ThemeSwitch, BackTop, KFooter },
  setup() {
    const showTip = ref<boolean>(true)
    const showModal = ref<boolean>(false)

    function handleCloseTipMsg() {
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

    return {
      showTip,
      showModal,
      handleCloseTipMsg,
      showAddMsgModal,
      confirm
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

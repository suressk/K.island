<template>
  <section class="k-message-board">
    <KHeader />
    <div class="content">
      <div class="tip-message" v-show="showTip">
        <i class="iconfont icon-close" @click="handleCloseTipMessage" />
        <p>😍 你可以在这里写下你想对 Ta 说的话，然后悄悄地扔个网址给 Ta ~ <span class="tip">（你的内心OS：我直接给人家说不香吗？）</span></p>
        <p>❤️ 你也可以在这里写下你想说的励志鸡汤，伤感心情，牢骚小文，也或是当一回文人墨客<span class="tip">（小K.都是欢迎的）</span></p>
        <p>🤨 <span class="tip">如果你的有些言论太过敏感或是不太合适展示给大家看的内容，小 K. 看到后可能会删掉哦~ 还是记得多传播积极的东西哦</span></p>
      </div>

      <!--   留言列表   -->
      <ul class="message-list">
        <li class="message-item"></li>
      </ul>

      <Modal :visible.sync="showModal">
        <CommentForm />
      </Modal>

      <button class="btn btn-primary" @click="showModalEvent">show</button>

    </div>

    <ThemeSwitch />
    <BackTop />
    <KFooter />
  </section>
</template>

<script lang="ts">
import { ref, defineComponent } from '@nuxtjs/composition-api'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import BackTop from '~/components/BackTop/index.vue'
import KFooter from '~/components/KFooter.vue'
import Modal from '~/components/KModal/index.vue'
import CommentForm from '~/components/CommentForm/index.vue'

export default defineComponent({
  name: 'MessageBoard',
  components: { Modal, KHeader, ThemeSwitch, BackTop, KFooter, CommentForm },
  setup() {
    const showTip = ref<boolean>(true)
    const showModal = ref<boolean>(false)

    function handleCloseTipMessage() {
      showTip.value = false
    }

    function showModalEvent() {
      showModal.value = true
    }

    return {
      showTip,
      showModal,
      handleCloseTipMessage,
      showModalEvent
    }
  }
})
</script>

<style lang="scss">
@import "assets/css/pages/messageBoard.scss";
</style>

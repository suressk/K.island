<template>
  <section class="k-message">
    <KHeader />
    <div class="content">
      <!--    v-show="showTip"    -->
      <transition name="fadeUp" mode="out-in">
        <div class="tip-message" v-show="showTip">
          <i class="iconfont icon-close" @click="toggleTip(false)" />
          <p>
            😍 你可以在这里写下你想对 Ta 说的话，然后悄悄地扔个网址给 Ta ~
            <span class="tip">（你的内心OS：我直接给人家说不香吗？）</span>
          </p>
          <p>
            ❤️ 你也可以在这里写下你想说的励志鸡汤，伤感心情，牢骚小文，也或是当一回文人墨客
            <span class="tip">（小K.都是欢迎的）</span>
          </p>
          <p>
            🤨
            <span class="tip">如果你的有些言论太过敏感或是不太合适展示给大家看的内容，小 K. 看到后可能会删掉哦~ 还是记得多传播积极的东西哦</span>
          </p>
        </div>
      </transition>

      <div class="add-message">
        <button
          class="btn btn-success"
          @click="toggleTip(true)"
          :disabled="showTip"
        >Show Tip Message</button>
        <button class="btn btn-primary" @click="showModal">Leave a Message</button>
      </div>

      <!--   添加留言 modal   -->
      <Modal :visible.sync="modalVisible" @ok="leaveMessage">
        <template v-slot:avatar>
          <img src="~~/static/images/avatar.png" alt="K. avatar" />
        </template>

        <!--  edit message form  -->
        <div class="message-form">
          <div class="message-from-item">
            <label>
              <input type="text" placeholder="Enter your nickname" v-model="nickName" />
            </label>
          </div>
          <div class="message-from-item">
            <label>
              <textarea
                class="message-content scroller"
                placeholder="Enter the message what you wanna to leave..."
                v-model="messageContent"
              />
            </label>
          </div>
        </div>
      </Modal>
      <!--   留言列表   -->
      <ul class="message-list">
        <li class="tip-message message-item" v-for="msg in msgList" :key="msg.uid">
          <p class="message-content">{{ msg.content }}</p>
          <p class="message-form">
            <span class="time">{{ formatTime(msg.ctime, DATE_FORMAT) }}</span>
            <span>{{ msg.name }}</span>
          </p>
        </li>
      </ul>

      <LoadMore :show-load-more="false" />
    </div>

    <ThemeSwitch />
    <BackTop />
  </section>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import { formatTime } from '~/utils'
import scrollMixin from '~/mixin/scroller'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import BackTop from '~/components/BackTop/index.vue'
import Modal from '~/components/KModal/index.vue'
import LoadMore from '~/components/LoadMore.vue'
import useMessages from '~/pageHooks/useMessages'

interface MsgLimitInfo {
  time: number
  name: string
}

export default defineComponent({
  name: 'Messages',
  mixins: [scrollMixin],
  components: { Modal, KHeader, ThemeSwitch, BackTop, LoadMore },
  setup() {
    return {
      formatTime,
      ...useMessages()
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

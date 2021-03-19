<template>
  <transition name="fade">
    <div class="mask fixed" :style="{ zIndex }" v-show="visible">
      <div
        class="k-confirm absolute-center"
        :style="{ zIndex: zIndex + 1 }"
      >
        <div class="confirm-content flex-col-start">
          <span :class="type">
            <i class="iconfont" :class="'icon-' + type" />
          </span>
          <p class="confirm-msg" v-text="message"></p>
        </div>
        <div class="confirm-footer">
          <button class="btn" @click="cancel">{{ cancelTxt }}</button>
          <button class="btn btn-primary" @click="confirm">{{ okTxt }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { addListener, removeListener } from '@/utils/util'

export default {
  name: 'PopConfirm',
  data() {
    return {
      visible: false,
      type: 'info',
      message: '',
      okTxt: 'Confirm',
      cancelTxt: 'Cancel',
      zIndex: 60,
      closed: false
    }
  },
  // computed: {
  //   // customStyle ({ zIndex }) {
  //   //   return `z-index: ${zIndex+1};`
  //   // }
  // },
  methods: {
    cancel() {
      this.onCancel && this.onCancel()
      this.close()
      // this.$emit('onCancel')
    },
    close() {
      this.closed = true
      this.$nextTick(() => {
        this.onClose()
      })
    },
    destroyElement() {
      removeListener(this.$el, 'transitionend', this.destroyElement)
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    },
    confirm() {
      this.close()
      this.onOk && this.onOk()
      // this.$emit('onOk')
    }
  },
  watch: {
    closed (val) {
      if (val) {
        this.visible = false
        addListener(this.$el, 'transitionend', this.destroyElement)
        document && (document.body.style.overflowY = '')
      } else {
        document && (document.body.style.overflowY = 'hidden')
      }
    }
  }
}
</script>

<style lang="scss">
.k-confirm {
  min-width: 300px;
  max-width: 90%;
  min-height: 100px;
  max-height: 90%;
  overflow: auto;
  border-radius: 5px;
  background-color: var(--white);
  padding: 20px;
  animation: bounceIn .5s ease-in-out forwards;
  .confirm-content {
    .iconfont {
      font-size: 2rem;
      cursor: default;
    }
    .confirm-msg {
      padding: 10px 0;
      width: 100%;
    }
  }
  .confirm-footer {
    text-align: right;
  }
}
</style>

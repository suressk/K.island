<template>
  <transition name="fade">
    <div class="k-modal" v-show="visible">
      <div class="mask fixed" @click="updateVisible"></div>

      <div class="modal-content fixed-center">
        <div class="modal-header flex-between">
          <span class="modal-title">{{ title }}</span>
          <i class="iconfont icon-close" @click="updateVisible" />
        </div>

        <div class="modal-body scroller-light">
          <slot></slot>
        </div>

        <div v-if="showFooter" class="modal-footer flex-end">
          <button class="btn" @click="updateVisible">{{ cancelText }}</button>
          <button class="btn btn-primary" @click="emitOk">{{ okText }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import useModal from './useModal'

export default defineComponent({
  name: 'KModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: 'Confirm'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    return {
      ...useModal(props)
    }
  }
})
</script>

<style lang="scss">
.k-modal {
  position: fixed;
  z-index: 49;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .mask {
    z-index: 50;
  }
  .modal-content {
    min-width: 40vw;
    min-height: 40vh;
    max-width: 90vw;
    max-height: 90vh;
    z-index: 51;
    background-color: var(--white);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    .modal-header {
      margin-bottom: 20px;
      height: 30px;
    }
    .modal-body {
      flex: 1;
      max-height: calc(100% - 90px);
      overflow: auto;
    }
    .modal-footer {
      height: 40px;
      .btn:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
}
</style>

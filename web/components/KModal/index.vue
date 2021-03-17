<template>
  <transition name="fade">
    <div class="k-modal" v-show="visible">
      <div class="mask fixed" @click="updateVisible"></div>

      <div class="modal-content fixed-center">
        <div class="modal-header flex-between">
          <span class="modal-title">{{ title }}</span>
          <i class="iconfont icon-close" @click="updateVisible" />
        </div>

        <div class="modal-body">
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
  setup() {
    return {
      ...useModal()
    }
  }
})
</script>

<style lang="scss">
.k-modal {
  opacity: 1;
  transition: all .5s;
  position: fixed;
  z-index: 49;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
    //transform: scale(0.5);
  }
  .mask {
    width: 100vw;
    height: 100vh;
    z-index: 50;
    background-color: var(--mask);
  }
  .modal-content {
    min-width: 40vw;
    min-height: 40vh;
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

<template>
  <!-- 仅针对当前项目需求进行简单封装使用 -->
  <div class="custom-overlay" v-show="visible" @click.self="handleEmitCancel">
    <div class="custom-modal flex-col-between" :style="modalStyle">
      <!--  header  -->
      <div class="custom-modal-header flex-between">
        <!-- <slot name="header"> -->
        <span class="custom-modal-title">{{ title }}</span>
        <i class="custom-modal-headerBtn el-icon-close" @click.self="handleEmitCancel" />
        <!-- </slot> -->
      </div>
      <!--  main 主体区  -->
      <div class="custom-modal-body scroller-light">
        <slot></slot>
      </div>
      <!--  footer  -->
      <div v-if="showFooter" class="custom-modal-footer flex-end">
        <!-- <slot name="footer"> -->
        <button class="custom-modal-btn custom-modal-cancelBtn" @click.self="handleEmitCancel">{{ cancelText }}</button>
        <button class="custom-modal-btn custom-modal-confirmBtn" @click.self="handleEmitOk">{{ confirmText }}</button>
        <!-- </slot> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { parseWidth, parseHeight } from './modal'
import { SetupContext } from '@vue/runtime-core'

export default {
  name: 'Modal',
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '提示'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '50%'
    },
    height: {
      type: String,
      default: '50%'
    }
  },
  /* eslint-disable */
  // @ts-ignore
  setup (props, ctx: SetupContext) {
    // 取消按钮点击事件
    function handleEmitCancel (e: Event) {
      // e.preventDefault()
      // e.stopPropagation()
      ctx.emit('cancel')
    }
    // 确认按钮点击事件
    function handleEmitOk () {
      ctx.emit('ok')
    }

    const modalStyle = computed(() => {
      // 约定 width 属性就处理类似 '80%' 和 '500' 的情况
      const w: string = parseWidth(props.width)
      const h: string = parseHeight(props.height)
      return {
        width: w,
        height: h
      }
    })

    return {
      modalStyle,
      handleEmitCancel,
      handleEmitOk
    }
  }
}
</script>

<style lang="scss">
.custom-overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0, 0.3);
  z-index: 2020;
}
.custom-modal {
  position: fixed;
  left: 50%;
  top: 50%;
  background-color: #fff;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  z-index: 9999;
  min-width: 50vw;
  min-height: 50vh;
  align-items: inherit;
  // header 区
  .custom-modal-header {
    padding: 20px 20px 10px;
    .custom-modal-title {
      line-height: 24px;
      font-size: 18px;
      color: #303133;
    }
    .custom-modal-headerBtn {
      cursor: pointer;
      font-size: 16px;
      transition: .3s;
      &:hover {
        color: #00ccff;
      }
    }
  }
  // 主体区域
  .custom-modal-body {
    padding: 20px;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
  // footer 区
  .custom-modal-footer {
    padding: 20px;
    .custom-modal-btn {
      margin-left: 20px;
      outline: none;
      border: none;
      padding: 8px 20px;
      font-size: 16px;
      background-color: #00ccff;
      color: #fff;
      text-align: center;
      cursor: pointer;
      border-radius: 5px;
      transition: .3s;
      &:hover {
        background-color: #00eeff;
      }
      //&:not(:last-child) {
      //  margin-right: 20px;
      //}
    }
  }
}
</style>

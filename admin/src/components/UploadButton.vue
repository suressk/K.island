<template>
  <button class="upload-file btn" :class="'btn-' + customType" @click="handleClick">
    <slot>Upload</slot>
    <input
      type="file"
      class="select-file-input"
      :accept="accept"
      ref="fileInpRef"
      @change="emitChooseFile"
    >
  </button>
</template>

<script lang="ts">
import { defineComponent, nextTick, getCurrentInstance, ComponentInternalInstance } from 'vue'

export default defineComponent({
  name: "UploadButton",
  props: {
    customType: {
      type: String,
      default: ''
    },
    accept: String,
  },
  setup(props, { emit }) {
    const { proxy }: ComponentInternalInstance = getCurrentInstance()!
    function handleClick() {
      const inpRef = proxy?.$refs.fileInpRef as HTMLInputElement
      inpRef.click()
    }

    // Event type ??? InputEvent ?
    function emitChooseFile(e: any) {
      e.preventDefault()
      emit('change', e.target.files) // 选中的文件
      nextTick(() => {
        e.target.value = ''
      })
    }
    return {
      handleClick,
      emitChooseFile
    }
  }
})
</script>

<style lang="scss">
.upload-file {
  padding: 5px 20px;
  .select-file-input {
    display: none!important;
  }

}
</style>

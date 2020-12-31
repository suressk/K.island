<template>
  <el-button class="k-upload-btn" v-bind="$attrs">
    <slot>Upload</slot>
    <input type="file" :accept="accept" @change="handleFileChange($event)" >
  </el-button>
</template>

<script>
import { getCurrentInstance, nextTick } from 'vue'
import { ElButton } from 'element-plus'

export default {
  name: 'UploadFile',
  props: {
    accept: {
      type: String,
      default: ''
    },
    limit: {
      type: Number
    }
  },
  components: { ElButton },
  setup () {
    const { ctx } = getCurrentInstance()
    function handleFileChange (e) {
      ctx.$emit('change', e.target.files)
      nextTick(() => {
        e.target.value = ''
      })
    }
    return { handleFileChange }
  }
}
</script>

<style lang="scss">
.k-upload-btn {
  position: relative;
  input {
    position: absolute;
    cursor: pointer;
    width: 100%;
    height: 100%;
    opacity: 0;
    left: 0;
    top: 0;
  }
}
</style>

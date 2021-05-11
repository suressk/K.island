<template>
  <button
    class="upload-file btn"
    :class="btnType"
    @click="handleClick"
  >
    <slot>Upload</slot>
    <input
      type="file"
      class="select-file-input"
      :accept="accept"
      ref="fileInpRef"
      @change="fileChange"
    >
  </button>
</template>

<script>
import {defineComponent} from 'vue'
import {warningNotify} from '../utils/util'

export default defineComponent({
  name: "UploadButton",
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    accept: String,
    uploadFilename: {
      type: String,
      default: 'filename'
    }
  },
  data() {
    return {
      inpRef: null
    }
  },
  computed: {
    btnType({type}) {
      return `btn-${type}`
    }
  },
  methods: {
    handleClick() {
      this.inpRef && this.inpRef.click()
    },
    fileChange(e) {
      try {
        const file = this.getFile()
        if (file === null) return
        this.$emit('change', file)
        // this.emitFormData(file)
        // this.preview(file)
        this.$nextTick(() => {
          e.target.value = ''
        })
      } catch (error) {
        console.debug('choose file error: ', error)
      }
    },
    preview(file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        console.log(e)
        // const imgUrl = e.result
        // element.insertAdjacentHTML
      }
    },
    emitFormData(file) {
      const fd = new FormData()
      fd.append([this.uploadFilename], file.name)
      fd.append('file', file)
      this.$emit('change', fd)
    },
    getFile() {
      if (this.inpRef && this.inpRef.files.length === 0) {
        warningNotify("Haven't choose a file!")
        return null
      }
      return this.inpRef.files[0]
    }
  },
  mounted() {
    this.inpRef = this.$refs.fileInpRef
  }
})
</script>

<style lang="scss">
.upload-file {
  padding: 5px 20px;

  .select-file-input {
    display: none !important;
  }

}
</style>

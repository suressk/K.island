<template>
  <!-- 新增博客文章 -->
  <section class="soul-record">
    <el-form :inline="true" class="base-info d-flex">
      <el-form-item label="标题:">
        <el-input type="text" v-model="title" size="small" clearable />
      </el-form-item>
      <el-form-item label="标签:">
        <el-input type="text" v-model="tag" size="small" clearable />
      </el-form-item>
      <el-form-item>
        <upload-file-button
          icon="el-icon-s-promotion"
          type="primary"
          size="small"
          :limit="1"
          @change="handleInsertFile"
        >
          导入文章
        </upload-file-button>
      </el-form-item>
      <el-form-item label="时间:">
        <el-date-picker v-model="time" size="small" clearable />
      </el-form-item>

      <el-button type="primary" size="small">Edit</el-button>
    </el-form>
    <div class="content">

    </div>
  </section>
</template>

<script>
import { ElForm, ElFormItem, ElButton, ElInput, ElDatePicker } from 'element-plus'
import { toRefs, onMounted } from 'vue'
import { recordInfo, handleInsertFile } from './soulRecord'
import UploadFileButton from '@/components/UploadFileButton'

export default {
  name: 'EditBlog',
  components: {
    ElForm,
    ElFormItem,
    ElButton,
    ElInput,
    ElDatePicker,
    UploadFileButton
  },
  setup () {
    onMounted(() => {
      document.title = '心情 / 杂记 - K.island'
    })
    return {
      ...toRefs(recordInfo),
      handleInsertFile
    }
  }
}
</script>

<style scoped>

</style>

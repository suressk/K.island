<template>
  <!-- 新增随笔文章 -->
  <edit-article @upload-article="handleAddRecord" />
</template>

<script lang="ts">
import { onMounted } from 'vue'
import EditArticle from '@/components/EditRecord/index.vue'
import { handleAddRecord } from './addRecord'

export default {
  name: 'AddRecord',
  components: {
    EditArticle
  },
  setup () {
    onMounted(() => {
      document.title = '"杂货"整理铺 - K.island'
      // previewContent.value = parseMarkdownFile(contentTxt.value)
    })
    return {
      handleAddRecord
    }
  }
}
</script>

<style lang="scss">
.add-record {
  height: 100%;
}
</style>

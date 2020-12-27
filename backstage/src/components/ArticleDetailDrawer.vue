<template>
  <!-- 文章详情 -->
  <div class="detail-content">
    <div class="d-flex">
      <span class="info-title">标题：</span>
      <span class="article-title">{{ articleInfo.title }}</span>
    </div>
    <div class="d-flex">
      <span class="info-title">标签：</span>
      <el-tag type="primary">{{ articleInfo.tag }}</el-tag>
    </div>
    <div class="d-flex">
      <span class="info-title">时间：</span>
      <el-tag type="primary">{{ articleInfo.ctime }}</el-tag>
    </div>
    <div class="d-flex">
      <span class="info-title">简介：</span>
      <span class="article-introduce">{{ articleInfo.introduce }}</span>
    </div>
    <div class="d-flex">
      <span class="info-title">封面：</span>
      <img class="article-cover" :src="articleInfo.cover" alt="封面图">
    </div>
    <!--  markdown 语法解析的文章详情  -->
    <span class="info-title">文章详情：</span>
    <div class="preview-content markdown scroller-light" v-html="previewContent" />
  </div>
</template>

<script lang="ts">
import { ElTag } from 'element-plus'
import { computed } from 'vue'
import { parseMarkdownFile } from '@/utils/marked'
import { PropsType } from './types/articleDetail'

export default {
  name: 'articleInfoDrawer',
  components: { ElTag },
  props: {
    articleInfo: {
      type: Object,
      default: () => ({
        title: '',
        tag: '',
        ctime: '',
        introduce: '',
        cover: '',
        content: ''
      })
    }
  },
  setup (props: PropsType) {
    // marked.js 解析
    const previewContent = computed(() => parseMarkdownFile(props.articleInfo.content))
    return {
      previewContent
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/css/components/articleDetail.scss";
</style>

<template>
  <!-- 文章详情 -->
  <div class="detail-content">
    <div class="d-flex">
      <span class="info-title">标题：</span>
      <span class="article-title">{{ articleDetail.title }}</span>
    </div>
    <div class="d-flex">
      <span class="info-title">标签：</span>
      <el-tag type="primary">{{ articleDetail.tag }}</el-tag>
    </div>
    <div class="d-flex">
      <span class="info-title">时间：</span>
      <el-tag type="primary">{{ articleDetail.ctime }}</el-tag>
    </div>
    <div class="d-flex">
      <span class="info-title">简介：</span>
      <span class="article-introduce">{{ articleDetail.introduce }}</span>
    </div>
    <div class="d-flex">
      <span class="info-title">封面：</span>
      <img class="article-cover" :src="articleDetail.cover" alt="封面图">
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
  name: 'ArticleDetailDrawer',
  components: { ElTag },
  props: {
    articleDetail: {
      type: Object,
      default: () => ({
        title: '醒不来的梦',
        tag: '梦回',
        ctime: '2020/10/08',
        introduce: '你是我触碰不到的风，醒不来的梦；寻不到的天堂，医不好的痛；点不着的香烟，松不开的手；忘不了的某某某...',
        cover: 'https://tse2-mm.cn.bing.net/th/id/OIP.2qQECtS2brOCBsrxHhmJ_wHaE8?pid=Api&rs=1',
        content: '# MarkDown\n\n```js\nimport { ref } from "vue"\n```'
      })
    }
  },
  setup (props: PropsType) {
    // marked.js 解析
    const previewContent = computed(() => parseMarkdownFile(props.articleDetail.content))
    return {
      previewContent
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/css/components/articleDetail.scss";
</style>

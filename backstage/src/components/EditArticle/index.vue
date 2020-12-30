<template>
  <div class="edit-record">
    <!-- 头部控件 -->
    <el-form :inline="true" class="base-info d-flex">
      <el-form-item label="标题:">
        <el-input type="text" v-model="title" size="small" clearable />
      </el-form-item>

      <el-form-item label="标签:">
        <el-input class="tag-inp" type="text" v-model="tag" size="small" clearable />
      </el-form-item>

      <el-form-item label="时间:">
        <!--    ctime => Date, String, Array 均可，number 也可解析   -->
        <el-date-picker class="date-picker" v-model="ctime" size="small" clearable />
      </el-form-item>

      <el-form-item>
        <upload-file-button
          icon="el-icon-s-promotion"
          type="primary"
          size="small"
          @change="handleInsertContent"
        >
          导入文章
        </upload-file-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-upload" size="small" @click="handleEmitArticle" />
      </el-form-item>
    </el-form>
    <!--  编辑区  -->
    <el-row class="edit-area" style="margin: 0 -10px" :gutter="24">
      <el-col :span="10" class="txt-content-col">
        <div class="edit-toolbar d-flex">
          <span class="tool-item trans-all-05 insert-img" title="插入图片">
            <input type="file" @change="handleInsertContentImage($event)">
            <i class="iconfont icon-image" />
          </span>
        </div>
        <textarea
          v-tab-indent
          class="article-content el-textarea__inner scroller-light"
          v-model="content"
          aria-label=""
        />
        <i
          class="el-icon-close trans-all-05"
          v-show="content"
          @click="handleClearContent"
        />
      </el-col>
      <el-col :span="10">
        <div v-html="previewContent" class="preview-content markdown scroller-light" />
      </el-col>
      <el-col :span="4">
        <el-tag type="primary" style="margin-bottom: 10px">Introduce：</el-tag>
        <textarea
          ref="contentRef"
          class="introduce-txt el-textarea__inner scroller-light"
          v-model="introduce"
          aria-label=""
        />
        <div class="preview-container">
          <upload-file-button
            accept="image/*"
            type="primary"
            size="small"
            icon="el-icon-picture"
            @change="handleUploadCover"
          >封面图片</upload-file-button>
          <div
            class="preview-image"
            :class="{
              'translate-fade-in': cover
            }"
            v-show="cover"
          >
            <img :src="cover" alt="封面图预览">
            <i class="el-icon-delete-solid trans-all-05" @click="handleDeleteCoverImg" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { toRefs, onMounted, getCurrentInstance, watchEffect, onBeforeUnmount } from 'vue'
import UploadFileButton from '@/components/UploadFileButton.vue'
import tabIndent from '@/directives/tabIndent'
import { parseMarkdownFile } from '@/utils/marked'
import { PropsType } from '../types/articleDetail'
import {
  ElForm,
  ElFormItem,
  ElButton,
  ElInput,
  ElDatePicker,
  ElRow,
  ElCol,
  ElTag
} from 'element-plus'
import {
  recordInfo,
  previewContent,
  handleInsertContent,
  handleClearContent,
  handleUploadCover,
  handleDeleteCoverImg,
  isImage
} from './editArticle'

export default {
  name: 'EditArticle',
  directives: {
    tabIndent
  },
  components: {
    ElForm,
    ElFormItem,
    ElButton,
    ElInput,
    ElDatePicker,
    ElRow,
    ElCol,
    ElTag,
    UploadFileButton
  },
  props: {
    articleInfo: {
      type: Object
    },
    ready: {
      type: Boolean,
      default: false
    }
  },
  setup (props: PropsType) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    let vm: any
    let ctx: any
    onMounted(() => {
      vm = getCurrentInstance()
      ctx = vm.ctx
      // 初始化置空
      recordInfo.title = ''
      recordInfo.tag = ''
      recordInfo.introduce = ''
      recordInfo.ctime = ''
      recordInfo.cover = ''
      recordInfo.content = ''
      previewContent.value = parseMarkdownFile(recordInfo.content)
    })

    // 文章信息扔向父组件
    function handleEmitArticle () {
      ctx.$emit('upload-article', { ...recordInfo })
    }

    // 文章内部插入图片
    function handleInsertContentImage (e: any) {
      const files = e.target.files
      const el = vm.refs.contentRef
      if (files.length) {
        const file = files[0]
        // 不是图片类型
        if (!isImage(file)) {
          return
        }
        // 上传图片
        const startPoint = el.selectionStart || recordInfo.content.length
        const endPoint = el.selectionEnd || recordInfo.content.length
        const imgStr = `\n![${file.name}](https://tse2-mm.cn.bing.net/th/id/OIP.2qQECtS2brOCBsrxHhmJ_wHaE8?pid=Api&rs=1)`
        recordInfo.content = recordInfo.content.substring(0, startPoint) +
          imgStr +
          recordInfo.content.substring(endPoint)
      }
      // `![file.name](${res.imgUrl})`
      ctx.$nextTick(() => {
        e.target.value = ''
      })
    }

    // 从 props 初始化
    function initRecord () {
      recordInfo.title = props.articleInfo.title
      recordInfo.tag = props.articleInfo.tag
      recordInfo.introduce = props.articleInfo.introduce
      recordInfo.ctime = props.articleInfo.ctime
      recordInfo.cover = props.articleInfo.cover
      recordInfo.content = props.articleInfo.content
      previewContent.value = parseMarkdownFile(recordInfo.content)
    }

    const stopWatch = watchEffect(() => {
      if (props.ready && props.articleInfo) {
        initRecord()
        ctx.$nextTick(() => {
          ctx.$emit('update:ready')
        })
      }
    })

    onBeforeUnmount(() => {
      // 结束监听
      stopWatch()
    })

    return {
      ...toRefs(recordInfo),
      previewContent,
      handleInsertContent,
      handleEmitArticle,
      handleClearContent,
      handleInsertContentImage,
      handleUploadCover,
      handleDeleteCoverImg
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/css/components/editRecord.scss";
</style>

<template>
  <!-- 新增随笔文章 -->
  <section class="soul-record">
    <el-form :inline="true" class="base-info d-flex">
      <el-form-item label="标题:">
        <el-input type="text" v-model="title" size="small" clearable />
      </el-form-item>

      <el-form-item label="标签:">
        <el-input class="tag-inp" type="text" v-model="tag" size="small" clearable />
      </el-form-item>

      <el-form-item label="时间:">
        <el-date-picker class="date-picker" v-model="time" size="small" clearable />
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
        <el-button type="primary" icon="el-icon-upload" size="small" @click="handleUploadArticle" />
      </el-form-item>
    </el-form>
    <!--  编辑区  -->
    <el-row class="edit-area" style="margin: 0 -10px" :gutter="24">
      <el-col :span="10" class="txt-content-col">
        <div class="edit-toolbar d-flex">
          <span class="tool-item trans-all-05" title="插入图片">
            <i class="iconfont icon-image" />
          </span>
        </div>
        <textarea
          v-tab-indent
          class="article-content el-textarea__inner scroller-light"
          v-model="contentTxt"
          aria-label=""
        />
        <i
          class="el-icon-close trans-all-05"
          v-show="contentTxt"
          @click="handleClearContent"
        />
      </el-col>
      <el-col :span="10">
        <div v-html="previewContent" class="preview-content markdown scroller-light" />
      </el-col>
      <el-col :span="4">
        <el-tag type="primary" style="margin-bottom: 10px">Introduce：</el-tag>
        <textarea
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
          <div class="preview-image" v-show="previewCoverUrl">
            <img :src="previewCoverUrl" alt="封面图预览">
            <i class="el-icon-delete-solid trans-all-05" @click="handleDeleteCoverImg" />
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script lang="ts">
import { toRefs, onMounted } from 'vue'
import UploadFileButton from '@/components/UploadFileButton.vue'
import tabIndent from '@/directives/tabIndent'
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
  contentTxt,
  previewContent,
  previewCoverUrl,
  handleInsertContent,
  handleUploadArticle,
  handleClearContent,
  parseMarkdownFile,
  handleUploadCover,
  handleDeleteCoverImg
} from './soulRecord'

export default {
  name: 'EditBlog',
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
  setup () {
    onMounted(() => {
      document.title = '"杂货"整理铺 - K.island'
      parseMarkdownFile()
    })
    return {
      ...toRefs(recordInfo),
      contentTxt,
      previewContent,
      previewCoverUrl,
      handleInsertContent,
      handleUploadArticle,
      handleClearContent,
      handleUploadCover,
      handleDeleteCoverImg
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/css/marked.scss";

.soul-record {
  height: 100%;
  .base-info {
    white-space: nowrap;
  }
  .tag-inp,
  .date-picker {
    width: 150px;
  }
  .edit-area {
    height: calc(100% - 62px);
    .el-col {
      height: 100%;
    }
    .txt-content-col {
      position: relative;
      // 编辑区顶部菜单栏
      .edit-toolbar {
        height: 30px;
        padding: 5px 10px;
        color: $baseColor;
        background-color: #323232;
        .tool-item {
          cursor: pointer;
          &:hover {
            color: $lightCyan;
          }
        }
      }
      .article-content {
        font-family: Consolas, Arial, Helvetica, sans-serif;
        height: calc(100% - 30px)!important;
        max-height: 100%;
        min-height: 50%;
        border-radius: 0 0 5px 5px;
      }
      .el-icon-close {
        position: absolute;
        right: 6px;
        top: 24px;
        font-size: 1rem;
        padding: 0.5rem;
        color: $borderColor;
        cursor: pointer;
        &:hover {
          color: #232425;
        }
      }
    }
    .preview-content {
      height: 100%;
      padding: 5px 15px;
      border: 1px solid $borderColor;
      background-color: rgba(3, 46, 61, 0.9);
      overflow: auto;
      border-radius: 5px;
    }
    // introduce
    .introduce-txt {
      display: block;
      width: 100%;
      min-height: 30%;
      max-height: 30%;
      overflow: scroll;
    }
    .preview-container {
      button {
        margin: 10px 0;
      }
      .preview-image {
        position: relative;
        color: $borderColor;
        &::after {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background-color: rgba(0, 0, 0, 0.3);
          opacity: 0;
          transition: all 0.5s;
        }
        &:hover {
          color: $lightCyan;
        }
        &:hover i,
        &:hover::after {
          opacity: 1;
        }
        img {
          width: 100%;
        }
        i {
          opacity: 0;
          position: absolute;
          z-index: 10;
          cursor: pointer;
          font-size: 40px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>

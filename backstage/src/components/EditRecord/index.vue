<template>
  <div class="edit-record scroller-light">
    <h3 class="tip-title">
      字里行间，或能感受些许岁月的沧桑
    </h3>
    <!-- 头部控件 -->
    <el-form class="base-info" :rules="rules">
      <el-form-item>
        <el-input
          type="text"
          v-model="title"
          placeholder="标题"
          clearable
        />
      </el-form-item>

      <el-form-item>
        <el-select v-model="tag" placeholder="文章分类标签" clearable>
          <el-option
            v-for="item in tagOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input type="text" v-model="music" placeholder="音乐链接" clearable />
      </el-form-item>

      <el-form-item>
        <el-input type="text" v-model="musicName" placeholder="音乐名" clearable />
      </el-form-item>

      <el-form-item>
        <el-input
          type="text"
          v-model="introduce"
          placeholder="文章摘要"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <div class="preview-container">
          <upload-file-button
            accept="image/*"
            type="primary"
            icon="el-icon-picture"
            @change="handleUploadCover"
          >
            封面图片
          </upload-file-button>
          <div
            class="preview-image flex-center"
            :class="{ 'translate-fade-in': cover }"
            v-show="cover"
          >
            <img :src="cover" alt="封面图预览">
            <i class="el-icon-delete-solid trans-all-05" @click="handleDeleteCoverImg" />
          </div>
        </div>
      </el-form-item>

      <el-form-item>
        <upload-file-button
          icon="el-icon-s-promotion"
          type="primary"
          @change="handleInsertContent"
        >
          导入文章
        </upload-file-button>
      </el-form-item>
    </el-form>
    <!--  编辑区  -->
    <el-row class="edit-area" style="margin: 0 -10px" :gutter="24">
      <el-col :span="12" class="txt-content-col">
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
      <el-col :span="12">
        <div v-html="previewContent" class="preview-content markdown scroller-light" />
      </el-col>
    </el-row>

    <el-form-item>
      <el-button type="primary" icon="el-icon-upload" size="small" @click="handleEmitRecord" />
    </el-form-item>
  </div>
</template>

<script lang="ts">
import UploadFileButton from '@/components/custom/UploadFileButton.vue'
import tabIndent from '@/directives/tabIndent'
import { PropsType } from '@/@types'
import { SetupContext } from '@vue/runtime-core'
import {
  ElForm, ElFormItem, ElButton, ElInput,
  ElRow, ElCol, ElSelect, ElOption
} from 'element-plus'
import useEdit from './editRecord'
// import { deleteImage } from '@/api/api'
// import { Notify } from '@/utils/util'

export default {
  name: 'EditRecord',
  directives: { tabIndent },
  components: {
    ElForm,
    ElFormItem,
    ElButton,
    ElInput,
    ElRow,
    ElCol,
    ElSelect,
    ElOption,
    UploadFileButton
  },
  props: {
    articleInfo: {
      type: Object
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props: PropsType, ctx: SetupContext) {
    // function handleDelete () {
    //   deleteImage({
    //     filename: 'cd6ea064-6366-4d3f-b293-fec8f8118d01.webp',
    //     path: '/images/illustration'
    //   }).then(res => {
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    //     // @ts-ignore
    //     Notify('success', 'SUCCESS', res.message)
    //   })
    // }
    // handleDelete
    return {
      ...useEdit(props, ctx)
    }
  }
}
</script>
<style lang="scss">
@import "~@/assets/css/components/editRecord.scss";
</style>

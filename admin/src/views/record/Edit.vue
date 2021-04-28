<template>
  <div class="edit-record scroller-light">
    <h3 class="primary-title">字里行间，发现创作的乐趣</h3>

    <div class="form-container">
      <a-form
        ref="formRef"
        :model="recordInfo"
        :rules="rules"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 8 }"
        autocomplete="off"
      >
        <a-form-item name="title" label="文章标题">
          <a-input
            type="text"
            placeholder="Title"
            v-model:value="recordInfo.title"
            allowClear
          />
        </a-form-item>

        <a-form-item label="文章分类">
          <a-select
            placeholder="Tag"
            v-model:value="recordInfo.tag"
            style="width: 200px;"
          >
            <a-select-option
              v-for="tagOption in tagOptions"
              :key="tagOption"
              :value="tagOption"
            >
              {{ tagOption }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item name="introduce" label="文章摘要">
          <a-textarea
            class="scroller-light"
            placeholder="Introduce"
            v-model:value="recordInfo.introduce"
            :autoSize="{ minRows: 4, maxRows: 4 }"
            allowClear
          />
        </a-form-item>

        <a-form-item name="music" label="背景音乐">
          <a-input
            type="text"
            placeholder="Background Music"
            v-model:value="recordInfo.music"
            allowClear
          />
        </a-form-item>

        <a-form-item name="cover" label="文章封面">
          <a-input
            type="text"
            placeholder="Cover"
            v-model:value="recordInfo.cover"
            allowClear
            :disabled="uploadCoverSwitch"
          />
        </a-form-item>

        <a-form-item label="切换图源">
          <a-switch
            checked-children="LOAD"
            un-checked-children="LINK"
            v-model:checked="uploadCoverSwitch"
          />
          <upload-button
            v-if="uploadCoverSwitch"
            type="primary"
            class="upload-cover-btn"
            accept="image/*"
            @change="handleUploadCover"
          >
            Upload Cover
          </upload-button>
        </a-form-item>

      </a-form>

      <!--   封面图预览   -->
      <div v-if="recordInfo.cover" class="preview-cover right-in flex-center">
        <img :src="recordInfo.cover" alt="Preview image">
        <i class="iconfont icon-delete absolute-center" @click.self="handleDeleteCover"/>
      </div>

      <!--   编辑文章内容   -->
      <v-md-editor v-model="recordInfo.content" class="editor"/>

      <div class="submit-container">
        <a-button type="primary" :loading="uploading" @click="submit">
          <template #icon>
            <SendOutlined/>
          </template>
          SUBMIT
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {errorNotify, parseLocationSearch, successNotify, warningNotify, getCoverRelativePath} from '../../utils/util'
import {addRecord, deleteCover, getRecordDetail, uploadCover, updateRecord} from '../../api/api'
import {ValidateErrorEntity} from 'ant-design-vue/es/form/interface'
import {ArticleIds, RecordInfo, RecordItem, ResponseData} from '../../types'
import UploadButton from '../../components/UploadButton.vue'
import {Input, Select, Form, Button, Modal, Switch} from 'ant-design-vue'
import {SendOutlined} from '@ant-design/icons-vue'
import {rules, isImage} from './useEdit'

const tagOptions = ['Mood', 'JS', 'StudyNote', 'FrontEnd', 'BackEnd']

export default defineComponent({
  name: "EditRecord",
  components: {
    UploadButton,
    'a-input': Input,
    'a-textarea': Input.TextArea,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-modal': Modal,
    'a-button': Button,
    'a-switch': Switch,
    SendOutlined
  },
  data() {
    return {
      recordInfo: {
        title: '',
        tag: 'Mood',
        introduce: '',
        cover: '',
        music: '',
        content: ''
      },
      tagOptions,
      uploading: false,
      isUpdate: false,
      uploadCoverSwitch: false,
      updateInfo: {
        id: -1,
        uid: ''
      },
      rules
    }
  },
  methods: {
    handleUploadCover(file: File | Event) {
      if (!(file instanceof File)) return

      if (!isImage(file)) {
        warningNotify('You should choose an image file')
        return
      }
      // @ts-ignore
      this.$refs.formRef.clearValidate() // 移除表单的校验结果
      // 创建上传图片的数据对象
      new Promise(resolve => {
        const formData = new FormData()
        formData.append('cover', file)
        formData.append('filename', file.name)
        // @ts-ignore
        uploadCover(formData).then((res: ResponseData<{ cover: string }>) => {
          if (res.success) {
            resolve(res.data.cover)
          } else {
            warningNotify(res.message)
          }
        }).catch(err => {
          errorNotify(err.message)
        })
      }).then(cover => {
        if (typeof cover === 'string') {
          this.recordInfo.cover = cover
        }
      })
    },
    handleDeleteCover() {
      const relativePath = getCoverRelativePath(this.recordInfo.cover)
      if (!relativePath) {
        warningNotify("This picture doesn't exist on your server, just clear the link text")
        return
      }
      deleteCover({ relativePath })
        .then((res: any) => {
          if (!res.success) {
            warningNotify(res.message)
            return
          }
          // 删除成功
          successNotify(res.message)
          this.recordInfo.cover = '' // 清空封面图
        }).catch(err => {
          errorNotify(err.message)
        })
    },
    getRecordInfo(params: ArticleIds) {
      getRecordDetail(params).then((res: any) => {
        if (!res.success) {
          warningNotify(res.message)
          return
        }
        this.assignRecord(res.data)
      }).catch(err => {
        errorNotify(err.message)
      })
    },
    assignRecord(info: RecordItem) {
      this.recordInfo = {
        title: info.title,
        tag: info.tag,
        introduce: info.introduce,
        cover: info.cover,
        music: info.music as string,
        content: info.content as string
      }
      this.updateInfo = {
        id: info.id,
        uid: info.uid
      }
    },
    clearContent() {
      this.recordInfo.content = ''
      // this.recordInfo = {
      //   title: '',
      //   tag: 'Mood',
      //   introduce: '',
      //   cover: '',
      //   music: '',
      //   content: ''
      // }
      // this.updateInfo = {
      //   id: -1,
      //   uid: ''
      // }
    },
    // 底部按钮触发表单验证 => 新增 / 更新文章
    submit() {
      // @ts-ignore
      this.$refs.formRef.validate()
        .then(() => {
          if (this.isUpdate) {
            this.updateRecordInfo()
          } else {
            this.addRecordInfo()
          }
        })
        .catch((error: ValidateErrorEntity<RecordInfo>) => {
          warningNotify(error.errorFields[0].errors[0])
        })
    },
    // 新增文章
    addRecordInfo() {
      addRecord({
        ...this.recordInfo
      }).then((res: any) => {
        if (res.success) {
          successNotify(res.message)
          this.clearContent()
          // @ts-ignore
          this.$refs.formRef.resetFields() // 重置表单内容及验证结果
        } else {
          warningNotify(res.message)
        }
      }).catch(err => {
        errorNotify(err.message)
      })
    },
    // 更新文章
    updateRecordInfo() {
      updateRecord({
        ...this.recordInfo,
        ...this.updateInfo
      }).then((res: any) => {
        if (res.success) {
          successNotify(res.message)
        } else {
          warningNotify(res.message)
        }
      }).catch(err => {
        errorNotify(err.message)
      })
    }
  },
  mounted() {
    const params = parseLocationSearch()
    this.isUpdate = !!(params.id && params.uid)
    this.isUpdate && this.getRecordInfo(params)
    // if (Object.keys(params).length > 0) {
    //   this.isUpdate = true
    //   this.getRecordInfo(params)
    // } else {
    //   this.isUpdate = false
    // }
  }
})
</script>

<style lang="scss">
.edit-record {
  width: 100%;
  height: 100%;

  .form-container {
    padding: 30px 0;
    position: relative;

    .upload-cover-btn {
      position: absolute;
      left: 100px;
      top: -6px;
      height: 35px;
      line-height: 25px;
    }

    .preview-cover {
      position: absolute;
      left: 50%;
      top: 40px;
      border: 1px solid var(--border);
      border-radius: 5px;
      width: 45%;
      height: 400px;
      overflow: hidden;

      &::after {
        content: "";
        position: absolute;
        transition: .3s;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }

      &:hover {
        &::after {
          background-color: var(--opacity-cyan-3);
        }

        .icon-delete {
          opacity: 1;
        }
      }

      img {
        width: 100%;
      }

      .icon-delete {
        font-size: 2rem;
        color: var(--tipColor);
        z-index: 10;
        opacity: 0;
      }
    }

    /* 文章内容编辑器 */
    .editor {
      height: 600px;
      border: 1px solid var(--border);
    }

    .submit-container {
      margin-top: 20px;
    }
  }
}
</style>

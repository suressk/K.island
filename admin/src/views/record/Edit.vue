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
            placeholder="Music"
            v-model:value="recordInfo.music"
            allowClear
          />
        </a-form-item>

        <a-form-item name="musicName" label="音乐名称">
          <a-input
            type="text"
            placeholder="MusicName"
            v-model:value="recordInfo.musicName"
            allowClear
          />
        </a-form-item>

        <a-form-item name="cover" label="文章配图">
          <a-input
            type="text"
            placeholder="cover"
            v-model:value="recordInfo.cover"
            allowClear
            :disabled="uploadCoverSwitch"
          />
          <a-switch
            checked-children="上传"
            un-checked-children="链接"
            v-model:checked="uploadCoverSwitch"
          />

          <a-upload
            v-if="uploadCoverSwitch"
            :customRequest="handleUploadCover"
            list-type="picture-card"
            v-model:file-list="fileList"
            @preview="handlePreview"
          >
            <div v-if="fileList.length < 1">
              <picture-outlined />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="cancelPreview">
            <img alt="preview" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-form-item>



      </a-form>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useEditRecord from './useEditRecord'
import { Input, Select, Form, Upload, Modal, Switch } from 'ant-design-vue'
import { PictureOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: "EditRecord",
  components: {
    'a-input' :Input,
    'a-textarea': Input.TextArea,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-upload': Upload,
    'a-modal': Modal,
    'a-switch': Switch,
    PictureOutlined
  },
  setup() {
    return {
      ...useEditRecord()
    }
  }
})
</script>

<style lang="scss">
.edit-record {
  width: 100%;
  height: 100%;
  .form-container {
    margin: 30px auto 10px;
    .anticon-picture {
      font-size: 2rem;
    }
  }
}
</style>

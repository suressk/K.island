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
            placeholder="Background Music"
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

        <a-form-item name="cover" label="文章封面">
          <a-input
            type="text"
            placeholder="Cover"
            v-model:value="recordInfo.cover"
            allowClear
            :disabled="uploadCoverSwitch"
          />
        </a-form-item>

        <a-form-item label="SWITCHING">
          <a-switch
            checked-children="UPLOAD"
            un-checked-children="LINK"
            v-model:checked="uploadCoverSwitch"
          />
          <upload-button
            v-if="uploadCoverSwitch"
            custom-type="primary"
            class="upload-cover-btn"
            accept="image/*"
            @change="handleUploadCover"
          />
        </a-form-item>


      </a-form>

      <div v-if="recordInfo.cover" class="preview-cover right-in flex-center">
        <img :src="recordInfo.cover" alt="Preview image">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useEdit from './useEdit'
import UploadButton from '../../components/UploadButton.vue'
import { Input, Select, Form, Upload, Modal, Switch } from 'ant-design-vue'

export default defineComponent({
  name: "EditRecord",
  components: {
    UploadButton,
    'a-input' :Input,
    'a-textarea': Input.TextArea,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-upload': Upload,
    'a-modal': Modal,
    'a-switch': Switch
  },
  setup() {
    return {
      ...useEdit()
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
      left: 45%;
      top: 53%;
      border: 1px solid var(--border);
      border-radius: 5px;
      width: 340px;
      height: 220px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
}
</style>

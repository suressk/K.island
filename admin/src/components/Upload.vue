<template>
  <!-- 单文件上传组件 -->
  <div>
    <input type="file" id="file" hidden @change="fileChange" :accept="accept">
    <div v-if="upMode=='url'" style="width: 100%;display:inline-flex;">
      <el-input :value="path" disabled></el-input>
      <el-button size="small" type="primary" @click="btnChange">{{ autoUpload ? label : '选择文件' }}</el-button>
      <el-button v-if="!autoUpload && loadButton" size="small" type="success" @click="uploadClick">{{ label }}
      </el-button>
    </div>
    <div v-else-if="upMode=='head'" class="upmode-head">
      <div class="el-upload el-upload--picture-card" @click="btnChange">
        <i v-if="path==''" class="el-icon-plus"></i>
        <img v-else :src="path">
      </div>
      <el-button v-if="!autoUpload && loadButton" size="small" type="success" @click="uploadClick">{{ label }}
      </el-button>
    </div>
    <div v-else-if="upMode=='variable'" class="el-upload-dragger" @click="btnChange">
      <div v-if="path==''">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text"><em>{{ label }}</em></div>
      </div>
      <img v-else :src="path">
    </div>

  </div>
</template>

<script>
import glob from '@/utils/global.js'

export default {
  model: {
    prop: 'path',
    event: 'onsuccess'
  },
  props: {
    label: {type: String, default: '上传'},//按钮文字
    accept: {String, default: 'image/jpeg,image/png,image/x-icon'},//预选文件类型
    autoUpload: {type: Boolean, default: true},//是否自动上传
    loadButton: {type: Boolean, default: true},//手动上传时是否生成上传按钮
    path: String,//回显地址
    action: {type: String, default: '/api/upload/img'},//传入action可以调用不同接口适应不同文件类型上传
    upMode: {type: String, default: 'url'},//上传控件模式url,head,variable
  },
  methods: {
    btnChange() {
      var file = document.getElementById('file');
      file.click();
    },
    fileChange(e) {
      try {
        const fu = this.getFile();
        if (fu == null) return;
        if (!this.beforeUpload(fu)) return;
        if (this.autoUpload) {
          this.submit(fu);
        } else {
          if (this.upMode == 'url') return;
          //本地预览
          var reader = new FileReader();
          reader.readAsDataURL(fu);
          reader.onload = function (e) {
            var src = this.result;
            var str = '<img src="' + src + '">';
            var target = this.upMode == 'head' ? '.el-upload--picture-card' : '.el-upload-dragger';
            var nim = document.querySelector(target);
            if (nim) {
              nim.innerHTML = '';
              nim.insertAdjacentHTML("beforeEnd", str)
            }
          };
        }

      } catch (error) {
        console.debug('choice file err:', error);
      }
    },
    beforeUpload(f) {
      const maxSzie = glob.Config.UploadSize;
      if (f.size / 1024 / 1024 > maxSzie) {
        this.$message.error('上传文件大小不能超过' + maxSzie + 'M.');
        return false;
      }
      var types = glob.Config.UploadType;
      for (let i = 0; i < types.length; i++) {
        if (types[i] === f.type) return true;
      }
      this.$message.error('上传文件格式不允许!');
      return false;
    },
    uploadClick(e) {
      this.submit();
    },
    submit(file) {
      try {
        if (!file) file = this.getFile();
        if (file == null) return;
        var isUpload = true;
        this.$emit('onbefore', file);
        if (!isUpload) return;
        const url = process.env.Store_API + this.action;
        var fd = new window.FormData();
        // 配置post请求的参数。参数名fileType，值为category（看后端的具体要求）
        fd.append('fileType', 'category');
        fd.append('file', file);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.send(fd);
        xhr.onload = () => {
          if (xhr.status === 200) {
            var res = JSON.parse(xhr.responseText);
            if (res.code == 1) {
              var imgurl = glob.StaticStoreHost + res.data;
              this.$emit('onsuccess', imgurl);
            } else {
              this.$message(res.message);
            }
          }
        }
      } catch (error) {
        console.debug('upload file err:', error);
      }
    },
    getFile() {
      var file = document.getElementById('file');
      if (file.files.length == 0) {
        this.$message('没有选择文件');
        return null;
      }
      return file.files[0];
    },
  },

}
</script>

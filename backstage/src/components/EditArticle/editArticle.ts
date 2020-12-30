import { reactive, ref, watch } from 'vue'
import { Notify } from '@/utils/util'
import { marked } from '@/utils/marked'
// import { postCompressImage } from '@/api/api'
// import dayjs from 'dayjs'

/* eslint-disable */
// @ts-ignore
interface RecordInfo {
  title: string;
  tag: string;
  introduce: string;
  ctime: null | string | object | number;
  cover: string;
  content: string;
}

// 其他记录信息
export const recordInfo = reactive<RecordInfo>({
  title: '',
  tag: '',
  introduce: '',
  ctime: null,
  cover: '',
  content: ''
})
// 编辑文章内容主体
// export const contentTxt = ref<string>('# MarkDown\n\n```js\nimport { ref } from "vue"\n```')
// 预览 markdown HTML 内容
export const previewContent = ref<string>('')

// 预览封面图 url
// export const previewCoverUrl = ref<string>('')

function createFileReader (): FileReader {
  return new FileReader()
}

// @typescript-eslint/no-explicit-any
function readFileAsTxt (file: File): Promise<any> {
  const fileReader = createFileReader()
  return new Promise((resolve, reject) => {
    if (typeof fileReader === 'undefined') {
      reject('此浏览器不支持 FileReader API')
    } else {
      // 1. 文件读取为文本数据
      fileReader.readAsText(file)
      fileReader.onload = e => {
        // @ts-ignore
        resolve(e.target.result)
      }
      fileReader.onerror = () => {
        // 取消文件读取
        fileReader.abort()
        // @ts-ignore
        reject(fileReader.error.message)
      }
      /*
       * 2. 文件读取为二进制数据
        fileReader.readAsArrayBuffer(file)
        fileReader.onload = e => {
          const bufferUint8Array = new Uint8Array(e.target.result)
          resolve(new TextDecoder('utf-8').decode(bufferUint8Array))
        }
      */
    }
  })
}

/**
 * 从文件导入文章内容
 * @param {*} files: FileList 文件列表
 * */
export function handleInsertContent (files: FileList) {
  let file: File
  if (files.length) {
    file = files[0]
    readFileAsTxt(file).then(txt => {
      recordInfo.content = txt
    }, err => {
      Notify('warning', 'WARNING', err)
    })
  }
}

/**
 * 上传封面图
 * */
export function handleUploadCover (files: FileList) {
  if (files.length) {
    const file: File = files[0]
    // 非图片类型
    if (!file.type.match(/image/g)) {
      Notify('warning', '警告', '上传的封面图片文件格式不太对哦~')
      return
    }
    new Promise(resolve => {
      // 1. 创建 blob 图片 url
      resolve(window.URL.createObjectURL(file))
      /**
       * 2. 读取文件为 base64 编码
       const fr = createFileReader()
       fr.readAsDataURL(file)
       fr.onload = e => {
          resolve(e.target.result)
        }
       */
    }).then(urlStr => {
      // console.log(urlStr)
      if (typeof urlStr === 'string') {
        // previewCoverUrl.value = urlStr
        recordInfo.cover = urlStr
      }
    })
    // 创建上传图片的数据对象
    const formData = new FormData()
    formData.append('imageFile', file)
    formData.append('filename', file.name)
    // 封面图片上传 method
    //
    // 尝试调用智图压缩 API => 跨域（失败）
    // formData.append('fileSelect', file)
    // formData.append('name', file.name)
    // formData.append('compress', '10')
    // formData.append('oriSize', '1981.0')
    // formData.append('type', file.type)
    // formData.append('pngLess', '1')
    // formData.append('isOa', '0')
    // formData.append('typeChange', '1')
    // postCompressImage(formData).then(res => {
    //   console.log(res)
    // })
  }
}

/**
 * 上传文章
 * */
// export function handleUploadArticle () {
//   ctx.$emit('upload-article', {
//     ...recordInfo,
//     content: contentTxt
//   })
//   console.log('upload', recordInfo)
//   // if (recordInfo.time !== null) {
//   //   // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//   //   // @ts-ignore
//   //   // console.log(recordInfo.time.valueOf()) // 得到时间戳
//   // }
// }

/**
 * 清除文章内容
 * */
export function handleClearContent () {
  recordInfo.content = ''
}

/**
 * 删除封面图
 * */
export function handleDeleteCoverImg () {
  recordInfo.cover = ''
}

let preViewTimer: NodeJS.Timeout

/**
 * 内容变更解析 markdown
 * */
watch(() => recordInfo.content, content => {
  if (preViewTimer) {
    clearTimeout(preViewTimer)
  }
  preViewTimer = setTimeout(() => {
    previewContent.value = marked(content)
  }, 200)
})

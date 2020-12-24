import { reactive, ref, watch } from 'vue'
import { Notify } from '@/utils/util'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import marked from 'marked'
import highlightJs from 'highlight.js'
// import dayjs from 'dayjs'

type RecordInfo = {
  title: string;
  tag: string;
  introduce: string;
  time: null | string | object;
}

// 其他记录信息
export const recordInfo = reactive<RecordInfo>({
  title: '',
  tag: '',
  introduce: '',
  time: null
})
// 编辑文章内容主体
export const contentTxt = ref<string>('# MarkDown\n\n```js\nimport { ref } from "vue"\n```')
// 预览 markdown HTML 内容
export const previewContent = ref<string>('')

// 预览封面图 url
export const previewCoverUrl = ref<string>('')

function readFile (file: File): Promise<any> {
  const fileReader = new FileReader()
  if (typeof fileReader === 'undefined') {
    // eslint-disable-next-line prefer-promise-reject-errors
    return new Promise((resolve, reject) => reject('浏览器不支持 FileReader'))
  }
  return new Promise(resolve => {
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = e => {
      // 要使用读取的内容，所以将读取内容转化成 Uint8Array
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const bufferUint8Array = new Uint8Array(e.target.result)
      // 二进制缓存区内容转化成中文
      resolve(new TextDecoder('utf-8').decode(bufferUint8Array))
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
    readFile(file).then(res => {
      contentTxt.value = res
    }, err => {
      Notify('warning', 'WARNING', err)
    })
  }
}

/**
 * 上传封面图
 * */
export function handleUploadCover (files: FileList) {
  if (!files.length) {
    Notify('warning', '警告', '图片貌似没有上传成功呢~')
    return
  }
  const file: File = files[0]
  // 非图片类型
  if (!file.type.match(/image/g)) {
    Notify('warning', '警告', '上传的封面图片文件格式不太对哦~')
    return
  }
  const formData = new FormData()
  formData.append('imageFile', file)
  formData.append('filename', file.name)
}

/**
 * 上传文章
 * */
export function handleUploadArticle () {
  console.log('upload', recordInfo)
  // if (recordInfo.time !== null) {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //   // @ts-ignore
  //   // console.log(recordInfo.time.valueOf()) // 得到时间戳
  // }
}

/**
 * 清除文章内容
 * */
export function handleClearContent () {
  contentTxt.value = ''
}

/**
 * 解析 Markdown 文件配置及语法高亮
 * */
export function parseMarkdownFile () {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight (code: string, language: string) {
      const validLanguage = highlightJs.getLanguage(language)
        ? language
        : 'plaintext'
      return highlightJs.highlight(validLanguage, code).value // 根据对应语法高亮
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  })
  previewContent.value = marked(contentTxt.value) // 解析 .md 文件为 HTML
}

/**
 * 删除封面图
 * */
export function handleDeleteCoverImg () {
  previewCoverUrl.value = ''
}

let preViewTimer: NodeJS.Timeout

/**
 * 内容变更解析 markdown
 * */
watch(contentTxt, content => {
  if (preViewTimer !== null) {
    clearTimeout(preViewTimer)
  }
  preViewTimer = setTimeout(() => {
    previewContent.value = marked(content)
  }, 200)
})

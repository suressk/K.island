import { reactive, ref, toRefs, watch, onMounted, getCurrentInstance, nextTick } from 'vue'
import { Notify } from '@/utils/util'
import { marked, parseMarkdownFile } from '@/utils/marked'
import { RecordInfo } from './editTypes'
import { PropsType } from '@/components/types/articleDetail'
import { SetupContext } from '@vue/runtime-core'

// import dayjs from 'dayjs'

/* eslint-disable */
function createFileReader (): FileReader {
  return new FileReader()
}

/**
 * 读取文件为文本信息
 * */
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

// 判断是否是图片类型
function isImage (file: File): boolean {
  if (!file.type.match(/image/g)) {
    Notify('warning', '警告', '上传的封面图片文件格式不太对哦~')
    return false
  }
  return true
}

export default function useEdit (props: PropsType, ctx: SetupContext) {
  // props 传递的文章详情是否请求成功
  const ready = ref<boolean>(false)
  // 文章所有信息
  const recordInfo = reactive<RecordInfo>({
    title: '',
    tag: '',
    introduce: '',
    ctime: '',
    cover: '',
    content: ''
  })
  // 预览 markdown HTML 内容
  const previewContent = ref<string>('')
  let preViewTimer: NodeJS.Timeout | null = null
  const vm: any = getCurrentInstance()

  onMounted((): void => {
    // 初始化置空
    clearRecord()
  })
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

  watch(() => props.modelValue, val => {
    if (val) {
      initRecord(props)
      nextTick(() => {
        ctx.emit('update:modelValue')
      })
    }
  })
  // 从 props 初始化
  function initRecord ({ articleInfo }: PropsType) {
    recordInfo.title = articleInfo.title
    recordInfo.tag = articleInfo.tag
    recordInfo.introduce = articleInfo.introduce
    recordInfo.ctime = articleInfo.ctime
    recordInfo.cover = articleInfo.cover
    recordInfo.content = articleInfo.content
    previewContent.value = parseMarkdownFile(recordInfo.content)
  }

  /**
   * 清除文章所有相关信息
   * */
  function clearRecord () {
    recordInfo.title = ''
    recordInfo.tag = ''
    recordInfo.introduce = ''
    recordInfo.ctime = ''
    recordInfo.cover = ''
    recordInfo.content = ''
    previewContent.value = parseMarkdownFile(recordInfo.content)
  }

  /**
   * 清除文章主体内容
   * */
  function handleClearContent () {
    recordInfo.content = ''
  }

  /**
   * 删除封面图
   * */
  function handleDeleteCoverImg () {
    recordInfo.cover = ''
  }

  /**
   * 从文件导入文章内容
   * @param {*} files: FileList 文件列表
   * */
  function handleInsertContent (files: FileList) {
    if (files.length) {
      const file: File = files[0]
      if (!file.type.includes('md') || !file.type.includes('js')) {
        Notify('warning', 'WARNING', '请导入 .md 文件或 .js 文件')
        return
      }
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
  function handleUploadCover (files: FileList) {
    if (files.length) {
      const file: File = files[0]
      if (!isImage(file)) {
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
    }
  }

  /**
   * 文章内部插入图片
   * */
  function handleInsertContentImage (e: any) {
    const files = e.target.files
    const el = vm.refs.contentRef
    if (files.length) {
      const file = files[0]
      // 不是图片类型
      if (!isImage(file)) {
        return
      }
      // el.focus()
      // 上传图片
      const startPoint = el.selectionStart || recordInfo.content.length
      const endPoint = el.selectionEnd || recordInfo.content.length
      const imgStr = `\n![${file.name}](https://tse2-mm.cn.bing.net/th/id/OIP.2qQECtS2brOCBsrxHhmJ_wHaE8?pid=Api&rs=1)\n`
      recordInfo.content = recordInfo.content.substring(0, startPoint) +
        imgStr +
        recordInfo.content.substring(endPoint)
    }
    // `![file.name](${res.imgUrl})`
    nextTick((): void => {
      e.target.value = ''
    })
  }

  /**
   * 文章信息扔向父组件
   * */
  function handleEmitRecord () {
    ctx.emit('upload-article', {
      ...recordInfo,
      ctime: new Date(recordInfo.ctime).getTime()
    })
  }

  return {
    ...toRefs(recordInfo),
    previewContent,
    ready,
    clearRecord,
    handleInsertContent,
    handleUploadCover,
    handleClearContent,
    handleDeleteCoverImg,
    handleEmitRecord,
    handleInsertContentImage
  }
}

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

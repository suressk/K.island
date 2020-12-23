import { reactive } from 'vue'
import { Notify } from '@/utils/util'

export type RecordInfo = {
  title: string;
  tag: string;
  introduce: string;
  content: string;
  time: undefined | string | object;
}

export const recordInfo = reactive<RecordInfo>({
  title: '',
  tag: '',
  introduce: '',
  content: '',
  time: undefined
})

export function handleInsertFile (files: FileList) {
  let file: File
  if (files.length) {
    file = files[files.length - 1]
    const fileReader = new FileReader()
    Notify('warning', 'WARNING', '浏览器不支持文件读取！')
    if (typeof fileReader === 'undefined') {
      Notify('warning', 'WARNING', '浏览器不支持文件读取！')
      return
    }
    fileReader.readAsArrayBuffer(file.raw) // any file
    fileReader.onload = e => {
      // 要使用读取的内容，所以将读取内容转化成 Uint8Array
      const bufferInts = new Uint8Array(e.target.result)
      // 二进制缓存区内容转化成中文
      recordInfo.content = new TextDecoder('utf-8').decode(bufferInts)
      console.log('===============', recordInfo.content)
    }
  }
}

import { ref } from 'vue'
import { Notify } from '@/utils/util'

interface RecordsItem {
  title: string;
  id: string;
  introduce: string;
  tag: string;
  cover: string;
  ctime: string | number;
}

export const records = ref<RecordsItem[]>([
  {
    title: '寻觅不到的风',
    id: 'uuid0001',
    introduce: '忘不了的某某某',
    ctime: '2020/10/08',
    tag: 'mood',
    cover: 'https://tse2-mm.cn.bing.net/th/id/OIP.2qQECtS2brOCBsrxHhmJ_wHaE8?pid=Api&rs=1'
  },
  {
    title: '踏江河',
    id: 'uuid0002',
    introduce: '长枪刺破云霞，放下一身牵挂',
    ctime: '2020/10/08',
    tag: 'mood',
    cover: ''
  }
])
export const articleDetail = ref({
  title: '醒不来的梦',
  tag: '梦回',
  introduce: '你是我触碰不到的风，醒不来的梦；寻不到的天堂，医不好的痛；点不着的香烟，松不开的手；忘不了的某某某...',
  cover: 'https://tse2-mm.cn.bing.net/th/id/OIP.2qQECtS2brOCBsrxHhmJ_wHaE8?pid=Api&rs=1',
  content: '',
  previewContent: undefined
})
export const drawerTitle = ref<string>('')
export const detailVisible = ref<boolean>(false)
export const editVisible = ref<boolean>(false)

export function handleSelectionChange (selection: RecordsItem[]) {
  console.log(selection)
}

export function handlePageChange (curPage: number) {
  console.log(curPage)
}

export function handleShowDetail (selectionRow: RecordsItem) {
  drawerTitle.value = '详情'
  detailVisible.value = true
  console.log(selectionRow)
}

export function handleShowEdit (selectionRow: RecordsItem) {
  drawerTitle.value = '编辑'
  editVisible.value = true
  console.log(selectionRow)
}

export function handleDeleteArticle (selectionRow: RecordsItem) {
  console.log(selectionRow)
  Notify('error', 'DELETE', `Delete 《${selectionRow.title}》`)
}

export function handleSaveArticle () {
  Notify('success', 'SUCCESS', '保存文章')
}

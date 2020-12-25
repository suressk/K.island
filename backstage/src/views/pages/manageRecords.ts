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
export const drawerTitle = ref<string>('')
export const drawerVisible = ref<boolean>(false)

export function handleSelectionChange (selection: RecordsItem[]) {
  console.log(selection)
}

export function handlePageChange (curPage: number) {
  console.log(curPage)
}

function showDrawer () {
  drawerVisible.value = true
}

export function handleShowDetail (selectionRow: RecordsItem) {
  drawerTitle.value = '详情'
  showDrawer()
  console.log('handleShowDetail')
  console.log(selectionRow)
}

export function handleShowEdit (selectionRow: RecordsItem) {
  drawerTitle.value = '编辑'
  showDrawer()
  console.log('handleEdit')
  console.log(selectionRow)
}

export function handleDelete (selectionRow: RecordsItem) {
  console.log('handleDelete')
  console.log(selectionRow)
  Notify('error', 'DELETE', `Delete 《${selectionRow.title}》`)
}

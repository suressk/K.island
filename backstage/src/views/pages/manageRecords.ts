import { reactive, ref } from 'vue'
import { Notify } from '@/utils/util'
import { PropsType } from '@/components/types/articleDetail'

interface RecordsItem {
  id?: string;
  title: string;
  introduce: string;
  tag: string;
  cover: string;
  ctime: string;
  content?: string;
}

export const records = ref<RecordsItem[]>([
  {
    title: '醒不来的梦',
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
// 文章详情
export const articleDetail = reactive({
  title: '',
  tag: '',
  introduce: '',
  cover: '',
  content: '',
  ctime: ''
})

export const drawerTitle = ref<string>('')
export const detailVisible = ref<boolean>(false)
export const editVisible = ref<boolean>(false)
export const detailReady = ref<boolean>(false)

function assignArticle (info: RecordsItem) {
  const { title, tag, introduce, cover, ctime, content } = info
  articleDetail.title = title
  articleDetail.tag = tag
  articleDetail.introduce = introduce
  articleDetail.cover = cover
  articleDetail.ctime = ctime
  if (content !== undefined) {
    articleDetail.content = content
  }
}

// 页码切换
export function handlePageChange (curPage: number) {
  console.log(curPage)
}

// 详情按钮点击事件
export function handleShowDetail (selectionRow: RecordsItem) {
  drawerTitle.value = '详情'
  detailVisible.value = true
  console.log(selectionRow)
}

// 编辑按钮点击事件
export function handleShowEdit (selectionRow: RecordsItem) {
  drawerTitle.value = '编辑'
  editVisible.value = true
  Notify('success', 'SUCCESS', '请求成功！')
  assignArticle({
    title: '醒不来的梦',
    tag: 'TypeScript',
    introduce: '你是我触碰不到的风，醒不来的梦；寻不到的天堂，医不好的痛；点不着的香烟，松不开的手；忘不了的某某某...',
    cover: 'https://tse2-mm.cn.bing.net/th/id/OIP.2qQECtS2brOCBsrxHhmJ_wHaE8?pid=Api&rs=1',
    content: '# MarkDown Detail',
    ctime: '2020/10/08'
  })
  // debugger
  detailReady.value = true
  console.log(selectionRow)
}

// 删除按钮点击事件
export function handleDeleteArticle (selectionRow: RecordsItem) {
  console.log(selectionRow)
  Notify('error', 'DELETE', `Delete 《${selectionRow.title}》`)
}

// 更改文章保存
export function handleSaveArticle (info: PropsType) {
  Notify('success', 'SUCCESS', '保存文章')
  console.log(info)
}

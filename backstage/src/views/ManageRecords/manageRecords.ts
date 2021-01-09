import { reactive, ref, nextTick } from 'vue'
import { Notify } from '@/utils/util'
import { PropsType } from '@/@types'

interface RecordsItem {
  id?: string;
  title: string;
  introduce: string;
  tag: string;
  cover: string;
  ctime: string;
}

interface RecordInfo extends RecordsItem {
  content: string;
}

export default function useManage () {
  const records = ref<RecordsItem[]>([
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
  const articleDetail = reactive({
    title: '',
    tag: '',
    introduce: '',
    cover: '',
    content: '',
    ctime: ''
  })
  const detailVisible = ref<boolean>(false)
  const editVisible = ref<boolean>(false)
  const detailReady = ref<boolean>(false)

  function assignArticle (info: RecordInfo) {
    const { title, tag, introduce, cover, ctime, content } = info
    articleDetail.title = title
    articleDetail.tag = tag
    articleDetail.introduce = introduce
    articleDetail.cover = cover
    articleDetail.ctime = ctime
    articleDetail.content = content
  }

  /**
   * 页码切换
   * */
  function handlePageChange (curPage: number) {
    console.log(curPage)
  }

  /**
   * 详情按钮点击事件
   * */
  function handleShowDetail (selectionRow: RecordsItem) {
    detailVisible.value = true
    console.log(selectionRow)
  }

  /**
   * 编辑按钮点击事件
   * */
  function handleShowEdit (selectionRow: RecordsItem) {
    editVisible.value = true
    Notify('success', 'SUCCESS', '请求成功！')
    nextTick(() => {
      assignArticle({
        title: '醒不来的梦',
        tag: 'TypeScript',
        introduce: '你是我触碰不到的风，醒不来的梦；寻不到的天堂，医不好的痛；点不着的香烟，松不开的手；忘不了的某某某...',
        cover: 'https://tse2-mm.cn.bing.net/th/id/OIP.2qQECtS2brOCBsrxHhmJ_wHaE8?pid=Api&rs=1',
        content: '# MarkDown Detail',
        ctime: '2020/10/08'
      })
    }).then(() => {
      detailReady.value = true
    })
    console.log(selectionRow)
  }

  /**
   * 删除文章
   * */
  function handleDeleteRecord (selectionRow: RecordsItem) {
    console.log(selectionRow)
    Notify('error', 'DELETE', `Delete 《${selectionRow.title}》`)
  }

  /**
   * 修改文章
   * */
  function handleSaveRecord (info: PropsType) {
    Notify('success', 'SUCCESS', '保存文章')
    console.log(info)
  }
  return {
    records,
    articleDetail,
    detailVisible,
    editVisible,
    detailReady,
    handlePageChange,
    handleShowDetail,
    handleShowEdit,
    handleDeleteRecord,
    handleSaveRecord
  }
}

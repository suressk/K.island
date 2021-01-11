import { reactive, ref, nextTick, onMounted } from 'vue'
import { Notify } from '@/utils/util'
import { GetListParams, PropsType, RecordInfo, RecordItem } from '@/@types'
import { getRecordList } from '@/api/api'

// interface RecordsItem {
//   id?: string;
//   title: string;
//   introduce: string;
//   tag: string;
//   cover: string;
//   ctime: string;
// }
//
// interface RecordInfo extends RecordsItem {
//   content: string;
// }

/* 查询文章列表 */
function loadRecords (params: GetListParams) {
  getRecordList(params).then(res => {
    /* eslint-disable */
    // @ts-ignore
    if (res.success) {
      // @ts-ignore
      Notify('success', 'SUCCESS', res.message)
      console.log(res)
    } else {
      // @ts-ignore
      Notify('warning', 'WARNING', res.message)
    }
  }).catch(err => {
    Notify('error', 'ERROR', err.message)
  })
}

export default function useManage () {
  const records = ref<RecordInfo[]>([])
  const articleDetail: RecordItem = reactive({
    title: '',
    tag: '',
    introduce: '',
    cover: '',
    content: '',
    ctime: 0
  })
  const detailVisible = ref<boolean>(false)
  const editVisible = ref<boolean>(false)
  const detailReady = ref<boolean>(false)

  function assignArticle (info: RecordItem) {
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
    loadRecords({
      pageNo: curPage,
      pageSize: 10
    })
    console.log(curPage)
  }

  onMounted(() => {
    loadRecords({
      pageNo: 1,
      pageSize: 10
    })
  })

  /**
   * 详情按钮点击事件
   * */
  function handleShowDetail (selectionRow: RecordItem) {
    detailVisible.value = true
    console.log(selectionRow)
  }

  /**
   * 编辑按钮点击事件
   * */
  function handleShowEdit (selectionRow: RecordItem) {
    editVisible.value = true
    Notify('success', 'SUCCESS', '请求成功！')
    nextTick(() => {
      // assignArticle()
    }).then(() => {
      detailReady.value = true
    })
    console.log(selectionRow)
  }

  /**
   * 删除文章
   * */
  function handleDeleteRecord (selectionRow: RecordItem) {
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

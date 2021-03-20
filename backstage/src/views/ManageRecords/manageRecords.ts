import { reactive, ref, nextTick, onMounted } from 'vue'
import { Notify, plainArticleList } from '@/utils/util'
import { RecordIds, GetListParams, PropsType, RecordInfo, RecordItemInfo } from '@/@types'
import { getRecordList, getRecordDetail, deleteRecord } from '@/api/api'
import dayjs from 'dayjs'

const timeFormat = 'YYYY-MM-DD HH:mm:ss'

export default function useManage () {
  const records = ref<RecordInfo[]>([])
  const total = ref<number>(0)
  const searchTitle = ref<string>('')
  const articleDetail: RecordItemInfo = reactive({
    id: -1,
    uid: '',
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

  // 文章详情信息赋值
  function assignArticle (info: RecordItemInfo): void | undefined {
    const { id, uid, title, tag, introduce, cover, ctime } = info
    // 内容存在，且当前点击的与前一次点击的是同一行
    if (articleDetail.content && articleDetail.uid === uid && articleDetail.id === id) {
      return
    }
    articleDetail.title = title
    articleDetail.tag = tag
    articleDetail.introduce = introduce
    articleDetail.cover = cover
    articleDetail.ctime = ctime
  }

  /* 查询文章列表 */
  function loadRecords (params: GetListParams) {
    getRecordList(params).then(res => {
      /* eslint-disable */
      // @ts-ignore
      if (res.success) {
        // @ts-ignore
        records.value = plainArticleList(res.data.list)
        total.value = res.data.total
      } else {
        // @ts-ignore
        Notify('warning', 'WARNING', res.message)
      }
    }).catch(err => {
      Notify('error', 'ERROR', err.message)
    })
  }

  /* 查询文章内容详情 */
  function loadRecordDetail (params: RecordIds) {
    getRecordDetail(params).then(res => {
      // @ts-ignore
      if (res.success) {
        articleDetail.content = res.data.content // 文章详情
      } else {
        // @ts-ignore
        Notify('warning', 'WARNING', res.message)
      }
    }).catch(err => {
      Notify('error', 'ERROR', err.message)
    })
  }

  function deleteRecordInfo ({ id, uid }: RecordIds) {
    deleteRecord({ id, uid }).then(res => {
      // @ts-ignore
      if (res.success) {

      }
    })
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
  function handleShowDetail (selectionRow: RecordItemInfo) {
    detailVisible.value = true
    const { id, uid, title, cover, ctime, introduce, tag } = selectionRow
    loadRecordDetail({ id, uid })
    assignArticle({ id, uid, title, cover, ctime, introduce, tag })
  }

  /**
   * 编辑按钮点击事件
   * */
  function handleShowEdit (selectionRow: RecordItemInfo) {
    editVisible.value = true
    nextTick(() => {
      const { id, uid, title, cover, ctime, introduce, tag } = selectionRow
      loadRecordDetail({ id, uid })
      assignArticle({ id, uid, title, cover, ctime, introduce, tag })
    }).then(() => {
      detailReady.value = true
    })
  }

  /**
   * 删除文章
   * */
  function handleDeleteRecord (selectionRow: RecordItemInfo) {
    const { id, uid } = selectionRow
    deleteRecordInfo({ id, uid })
    Notify('error', 'DELETE', `Delete 《${selectionRow.title}》`)
  }

  /**
   * 修改文章
   * */
  function handleSaveRecord (info: PropsType) {
    Notify('success', 'SUCCESS', '保存文章')
    console.log(info)
  }

  /**
   * true  => show
   * false => hide
   * */
  function handleUpdateRecordShow (showValue: boolean) {
    console.log(showValue)
  }

  return {
    searchTitle,
    records,
    total,
    articleDetail,
    detailVisible,
    editVisible,
    detailReady,
    timeFormat,
    handlePageChange,
    handleShowDetail,
    handleShowEdit,
    handleDeleteRecord,
    handleSaveRecord,
    dayjs,
    handleUpdateRecordShow
  }
}

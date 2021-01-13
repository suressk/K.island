import { reactive, ref, nextTick, onMounted } from 'vue'
import { Notify } from '@/utils/util'
import { RecordIds, GetListParams, PropsType, RecordInfo, RecordItem } from '@/@types'
import { getRecordList, getRecordDetail } from '@/api/api'
import dayjs from 'dayjs'

const timeFormat = 'YYYY-MM-DD HH:mm:ss'

// eslint-disable-next-line @typescript-eslint/class-name-casing
interface RecordBaseInfo {
  title: string;
  tag: string;
  introduce: string;
  cover: string;
  ctime: number;
  id?: number;
  uid?: string;
  content?: string;
}

interface AssignInfo extends RecordBaseInfo {
  id: number;
  uid: string;
}

export default function useManage () {
  const records = ref<RecordInfo[]>([])
  const total = ref<number>(0)
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

  function assignArticle (info: RecordBaseInfo) {
    const { title, tag, introduce, cover, ctime } = info
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
        records.value = res.data.list
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
        // @ts-ignore
        Notify('success', 'SUCCESS', res.message)
        articleDetail.content = res.data.content // 文章详情
      } else {
        // @ts-ignore
        Notify('warning', 'WARNING', res.message)
      }
    }).catch(err => {
      Notify('error', 'ERROR', err.message)
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
  function handleShowDetail (selectionRow: AssignInfo) {
    detailVisible.value = true
    const { id, uid, title, cover, ctime, introduce, tag } = selectionRow
    assignArticle({ title, cover, ctime, introduce, tag })
    loadRecordDetail({
      id,
      uid
    })
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
    dayjs
  }
}

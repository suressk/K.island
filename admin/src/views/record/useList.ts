import {ref, reactive, Ref, UnwrapRef, onMounted} from 'vue'
import {
    Pagination,
    QueryArticleListParams,
    RecordItem,
    ResponseData,
    RecordListResponseData,
    YearDataList
} from '../../types'
import {useRouter} from 'vue-router'
import {deleteRecord, getRecordList, updateRecord} from '../../api/api'
import {errorNotify, successNotify, warningNotify, mapRecordTime, getCoverRelativePath} from '../../utils/util'

const columns = [
    {
        title: 'No.',
        dataIndex: 'id',
        slots: {customRender: 'id'}
    },
    {
        title: 'Article Title',
        dataIndex: 'title'
    },
    {
        title: 'Introduce',
        dataIndex: 'introduce'
    },
    {
        title: 'Tag',
        dataIndex: 'tag',
        slots: {customRender: 'tag'}
    },
    {
        title: 'Cover',
        dataIndex: 'cover',
        slots: {customRender: 'cover'}
    },
    {
        title: 'Views',
        dataIndex: 'views'
    },
    {
        title: 'Liked',
        dataIndex: 'liked'
    },
    {
        title: 'Show',
        dataIndex: 'is_delete',
        slots: {customRender: 'is_delete'},
        width: 150
    },
    {
        title: 'Create Time',
        dataIndex: 'createTime',
        slots: {customRender: 'createTime'}
    },
    {
        title: 'Update Time',
        dataIndex: 'updateTime',
        slots: {customRender: 'updateTime'}
    },
    {
        title: 'Action',
        dataIndex: 'action',
        slots: {customRender: 'action'}
    }
]

/**
 * 文章列表
 * */
export default function useList() {
    const router = useRouter()
    const loading = ref<boolean>(false)
    const articleTitle = ref<string>('')
    const pagination = reactive({
        current: 1,
        total: 0,
        pageSize: 10,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "50"],
        showSizeChanger: true
    })
    const articleList: Ref<RecordItem[]> = ref([])
    const editableData: UnwrapRef<Record<string, RecordItem>> = reactive({})

    /**
     * 表格文章显隐 switch 可编辑
     * */
    function mapEditable(list: RecordItem[]) {
        list.forEach(item => {
            editableData[item.id] = {
                ...item,
                show: item.is_delete === 0
            }
        })
    }

    onMounted(() => {
        getRecords({
            pageNo: pagination.current,
            pageSize: pagination.pageSize
        })
    })

    /**
     * 切换文章显隐
     * */
    function switchChange(record: RecordItem, show: boolean) {
        // console.log(show) // true => 显示； false => 隐藏
        const {id, uid} = record
        const matchItem = articleList.value.filter(item => id === item.id)[0]
        updateRecord({
            id,
            uid,
            is_delete: show ? 0 : 1
            // @ts-ignore
        }).then((res: ResponseData<object>) => {
            if (res.success) {
                successNotify(res.message)
                editableData[id].show = show
                Object.assign(matchItem, editableData[id]);
            } else {
                warningNotify(res.message)
                editableData[id].show = !show
            }
        }).catch(err => {
            errorNotify(err.message)
            editableData[id].show = !show
        })
    }

    /**
     * 页码切换
     * */
    function handlePageChange(curPagination: Pagination) {
        const current = curPagination!.current!
        const pageSize = curPagination!.pageSize!
        pagination.current = current
        pagination.pageSize = pageSize

        getRecords({
            pageNo: current,
            pageSize
        })
    }

    /**
     * 查询按钮点击查询（title 模糊查询）
     * */
    function handleQueryRecords() {
        getRecords({
            pageNo: pagination.current,
            pageSize: pagination.pageSize,
            title: articleTitle.value
        })
    }

    /**
     * 查询文章列表
     * */
    function getRecords(params: QueryArticleListParams) {
        loading.value = true
        getRecordList(params)
            // @ts-ignore
            .then((res: RecordListResponseData<YearDataList<RecordItem>>) => {
                if (res.success) {
                    articleList.value = mapRecordTime(res.data.list)
                    mapEditable(articleList.value)
                    pagination.total = res.data.total
                } else {
                    articleList.value.length > 0 && (articleList.value = [])
                    warningNotify(res.message)
                }
                loading.value = false
            })
            .catch(err => {
                errorNotify(err.message)
                articleList.value.length > 0 && (articleList.value = [])
                loading.value = false
                // articleList.value = data
                // mapEditable(data)
            })
    }

    /**
     * 前往文章编辑页面（更新文章） icon-edit
     * */
    function toEditRecord(item: RecordItem) {
        const {id, uid} = item
        router.push({
            path: '/edit',
            query: {id, uid}
        })
    }

    /**
     * 删除文章 icon-delete
     * */
    function handleDeleteRecord(item: RecordItem) {
        const {id, uid, cover} = item
        const relativePath = getCoverRelativePath(cover)
        // @ts-ignore
        deleteRecord({ id, uid, relativePath }).then((res: ResponseData<object>) => {
            if (res.success) {
                successNotify(res.message)
                getRecords({
                    pageNo: pagination.current,
                    pageSize: pagination.pageSize
                })
            } else {
                warningNotify(res.message)
            }
        }).catch(err => {
            errorNotify(err.message)
        })
    }

    return {
        articleTitle,
        loading,
        columns,
        articleList,
        pagination,
        editableData,
        handlePageChange,
        toEditRecord,
        handleDeleteRecord,
        switchChange,
        handleQueryRecords
    }
}

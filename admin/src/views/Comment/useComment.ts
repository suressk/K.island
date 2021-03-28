import {reactive, ref, Ref, onMounted} from 'vue'
import {
    CommentItem,
    PageQueryParams,
    Pagination,
    ResponseData,
    ListRes,
    DeleteCommentsParams
} from '../../types'
import {getCommentList, deleteComments} from '../../api/api'
import {errorNotify, warningNotify, mapFormatCtimeList, successNotify} from '../../utils/util'
import { ColumnProps } from 'ant-design-vue/es/table/interface'
type Key = ColumnProps['key']

const columns = [
    {
        title: 'No.',
        dataIndex: 'id',
        slots: {customRender: 'id'}
    },
    {
        title: 'Name',
        dataIndex: 'name'
    },
    {
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Article Title',
        dataIndex: 'title'
    },
    {
        title: 'Comment',
        dataIndex: 'comment',
        width: '30%'
    },
    {
        title: 'Create Time',
        dataIndex: 'createTime',
        slots: {customRender: 'createTime'}
    },
    {
        title: 'Action',
        dataIndex: 'action',
        slots: {customRender: 'action'}
    }
]

const list = [
    {
        id: 1001,
        name: 'ssk',
        email: 'sure_k@qq.com',
        title: '要么孤独，要么平庸',
        comment: '希望世界美好如初',
        ctime: Date.now()
    },
    {
        id: 1002,
        name: 'sure',
        email: 'sure_k@qq.com',
        title: '致橡树',
        comment: `Hope that all the good things will come soon! Hope that all the good things will come soon! Hope that all the good things will come soon! Hope that all the good things will come soon! Hope that all the good things will come soon! `,
        ctime: Date.now()
    }
]

/**
 * 评论管理
 * */
export default function useComment() {

    const loading = ref<boolean>(false)
    const pagination = reactive({
        current: 1,
        total: 0,
        pageSize: 10,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "50"],
        showSizeChanger: true
    })
    const commentList: Ref<CommentItem[]> = ref([])

    const checkedKeys = ref<Key[]>([])

    const rowSelection = {
        onChange: (selectedRowKeys: Key[], selectedRows: CommentItem[]) => {
            checkedKeys.value = selectedRowKeys
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // 判定不可选中的项
        getCheckboxProps: (record: CommentItem) => ({
            disabled: record.name === 'ssk',
            name: record.name,
        })
    }
    onMounted(() => {
        commentList.value = mapFormatCtimeList(list)
    })

    function handlePageChange(curPagination: Pagination) {
        const current = curPagination!.current!
        const pageSize = curPagination!.pageSize!
        pagination.current = current
        pagination.pageSize = pageSize

        getComments({
            pageNo: current,
            pageSize
        })
    }

    function getComments (params: PageQueryParams) {
        getCommentList(params)
            // @ts-ignore
            .then((res: ResponseData<ListRes<CommentItem[]>>) => {
                if (res.success) {
                    commentList.value = res.data.list
                    pagination.total = res.data.total
                } else {
                    warningNotify(res.message)
                }
                loading.value = false
            }).catch(err => {
                loading.value = false
                errorNotify(err.message)
            }
        )
    }

    // 删除评论
    const delMultipleComments = (params: DeleteCommentsParams) => {
        deleteComments(params)
            // @ts-ignore
            .then((res: ResponseData<any>) => {
                if (res.success) {
                    successNotify(res.message)
                    getComments({
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

    // 删除单条评论
    function handleDeleteOneComment (info: CommentItem) {
        delMultipleComments({ ids: [info.id] })
    }

    // 删除多条
    function handleDeleteMultipleComments () {
        deleteComments({ ids: [] })
    }

    return {
        loading,
        columns,
        pagination,
        commentList,
        rowSelection,
        handlePageChange,
        handleDeleteOneComment
    }
}

import {reactive, ref, Ref, onMounted, computed} from 'vue'
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
        dataIndex: 'content',
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
        content: '希望世界美好如初',
        ctime: Date.now()
    },
    {
        id: 1002,
        name: 'sure',
        email: 'sure_k@qq.com',
        title: '致橡树',
        content: `Hope that all the good things will come soon!`,
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
    const selectedRowKeys = ref<Key[]>([])
    const canDelete = computed(() => (selectedRowKeys.value.length > 0))
    const replyVisible = ref<boolean>(false)

    onMounted(() => {
        commentList.value = mapFormatCtimeList(list)
    })


    function onSelectChange(selectedKeys: Key[]) {
        selectedRowKeys.value = selectedKeys
    }

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
                loading.value = false
                if (!res.success) {
                    warningNotify(res.message)
                    return
                }
                commentList.value = res.data.list
                pagination.total = res.data.total
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
                if (!res.success) {
                    warningNotify(res.message)
                    return
                }
                successNotify(res.message)
                getComments({
                    pageNo: pagination.current,
                    pageSize: pagination.pageSize
                })
            }).catch(err => {
                errorNotify(err.message)
            })
    }

    // 删除评论 按钮点击事件
    function handleDeleteComments (info: CommentItem | null) {
        if (info === null) {
            // @ts-ignore
            delMultipleComments({ ids: [...selectedRowKeys.value] })
        } else {
            delMultipleComments({ ids: [info.id] })
        }
    }

    function handleOpenReply(info: CommentItem) {
        console.log(info)
        replyVisible.value = true
    }

    return {
        loading,
        columns,
        pagination,
        commentList,
        canDelete,
        replyVisible,
        selectedRowKeys,
        onSelectChange,
        handlePageChange,
        handleDeleteComments,
        handleOpenReply
    }
}

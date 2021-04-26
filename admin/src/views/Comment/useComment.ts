import {reactive, ref, computed, Ref, onMounted} from 'vue'
import {getCommentList, deleteComments} from '../../api/api'
import {errorNotify, warningNotify, mapCommentList, successNotify} from '../../utils/util'
import {useStore} from 'vuex'
import {ColumnProps} from 'ant-design-vue/es/table/interface'
import {M_SET_UNREAD} from '../../store/mutation-types'
import {
    CommentItem,
    PageQueryParams,
    Pagination,
    ResponseData,
    CommentListRes,
    DeleteCommentsParams
} from '../../types'

type Key = ColumnProps['key']

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
        title: 'Comment',
        dataIndex: 'content',
        width: '30%'
    },
    {
        title: 'From',
        dataIndex: 'from'
    },
    {
        title: 'To',
        dataIndex: 'to'
    },
    {
        title: 'Create Time',
        dataIndex: 'createTime',
        slots: {customRender: 'createTime'}
    },
    {
        title: 'IsRead',
        dataIndex: 'isRead',
        slots: {customRender: 'isRead'}
    },
    {
        title: 'Action',
        dataIndex: 'action',
        slots: {customRender: 'action'}
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
    const canBeRead = computed(() => (selectedRowKeys.value.length > 0))
    const replyVisible = ref<boolean>(false)

    const store = useStore()

    // TODO ==================== 选中还有警告
    function onSelectChange(selectedKeys: Key[]) {
        const diffKey = selectedKeys.filter(key => !selectedRowKeys.value.includes(key))[0]

        const item = commentList.value.find(item => item.id === diffKey) as CommentItem

        if (item.isRead === 1) return
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

    function getComments(params: PageQueryParams) {
        getCommentList(params)
            /* @ts-ignore */
            .then((res: ResponseData<CommentListRes>) => {
                loading.value = false
                if (!res.success) {
                    warningNotify(res.message)
                    return
                }
                const {list, total, unread} = res.data
                commentList.value = mapCommentList(list)
                pagination.total = total
                store.commit(M_SET_UNREAD, unread)
            }).catch(err => {
                loading.value = false
                errorNotify(err.message)
            }
        )
    }

    // 行选中禁用
    // const rowSelection = {
    //     onChange: (selectedKeys: Key[]) => {
    //         console.log(selectedKeys)
    //         selectedRowKeys.value = [...selectedKeys]
    //     },
    //     getCheckboxProps: (record: CommentItem) => ({
    //         disabled: record.isRead === 1, // Column configuration not to be checked
    //         title: record.title
    //     })
    // }

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
    function handleDeleteComments(info: CommentItem | null) {
        if (info === null) {
            // @ts-ignore
            delMultipleComments({ids: [...selectedRowKeys.value]})
        } else {
            delMultipleComments({ids: [info.id]})
        }
    }

    function handleOpenReply(info: CommentItem) {
        console.log(info)
        replyVisible.value = true
    }

    const tableRowClick = (record: CommentItem) => {
        return {
            onClick: () => {
                const {id, isRead} = record
                const index = selectedRowKeys.value.findIndex(item => item === id)
                if (isRead === 1) return // 已读则忽略
                // console.log(index)
                if (index > -1) {
                    selectedRowKeys.value.splice(index, 1)
                } else {
                    selectedRowKeys.value.push(id)
                }
            }
        }
    }

    onMounted(() => {
        // commentList.value = mapFormatCtimeList(list)
        getComments({
            pageNo: pagination.current,
            pageSize: pagination.pageSize
        })
    })

    return {
        loading,
        columns,
        pagination,
        commentList,
        canBeRead,
        replyVisible,
        selectedRowKeys,
        onSelectChange,
        handlePageChange,
        handleDeleteComments,
        handleOpenReply,
        tableRowClick
    }
}

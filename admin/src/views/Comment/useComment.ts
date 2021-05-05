import {reactive, ref, computed, Ref, onMounted} from 'vue'
import {getCommentList, deleteComments, readComments, replyComment} from '../../api/api'
import {successNotify, errorNotify, warningNotify, mapCommentList} from '../../utils/util'
import {useStore} from 'vuex'
import {M_SET_UNREAD} from '../../store/mutation-types'
import {
    CommentItem,
    PageQueryParams,
    Pagination
} from '../../types'
import {ColumnProps} from 'ant-design-vue/es/table/interface'

// ResponseData,
// CommentListRes

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
        title: 'Comment Content',
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
        title: 'Comment Time',
        dataIndex: 'createTime',
        slots: {customRender: 'createTime'}
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
        showSizeChanger: true,
        showTotal: (total: number | string) => `${total} Items`
    })
    const commentList: Ref<CommentItem[]> = ref([])
    const selectedRowKeys = ref<Key[]>([])
    const canBeRead = computed(() => (selectedRowKeys.value.length > 0))
    const replyVisible = ref<boolean>(false)

    // @ts-ignore
    const replyTargetInfo: Ref<CommentItem> = ref({})
    const replyContent = ref<string>('')

    const store = useStore()

    // TODO ==================== 选中还有警告
    // function onSelectChange(selectedKeys: Key[]) {
    //     const diffKey = selectedKeys.filter(key => !selectedRowKeys.value.includes(key))[0]
    //
    //     const item = commentList.value.find(item => item.id === diffKey) as CommentItem
    //
    //     if (item.isRead === 1) {
    //         infoNotify('This comment is not for you or has been read!')
    //         return
    //     }
    //     selectedRowKeys.value = selectedKeys
    // }

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

    // 获取所有评论列表
    function getComments(params: PageQueryParams) {
        loading.value = true
        clearSelectedKeys()
        /* res: ResponseData<CommentListRes> */
        getCommentList(params)
            .then((res: any) => {
                loading.value = false
                if (!res.success) {
                    warningNotify(res.message)
                    return
                }
                const {list, total, unread} = res.data
                commentList.value = mapCommentList(list)
                pagination.total = total
                store.commit(M_SET_UNREAD, unread)
            })
            .catch(err => {
                loading.value = false
                errorNotify(err.message)
            }
        )
    }

    // 行选中禁用
    const rowSelection = {
        onChange: (selectedKeys: Key[]) => {
            selectedRowKeys.value = [...selectedKeys]
        },
        getCheckboxProps: (record: CommentItem) => ({
            disabled: record.isRead === 1 // Column configuration not to be checked
        })
    }

    // // 删除多条评论
    // const delMultipleComments = (params: DeleteCommentsParams) => {
    //     deleteComments(params)
    //         // @ts-ignore
    //         .then((res: ResponseData<any>) => {
    //             if (!res.success) {
    //                 warningNotify(res.message)
    //                 return
    //             }
    //             successNotify(res.message)
    //             getComments({
    //                 pageNo: pagination.current,
    //                 pageSize: pagination.pageSize
    //             })
    //         }).catch(err => {
    //         errorNotify(err.message)
    //     })
    // }

    // 删除评论 按钮点击事件
    function handleDeleteComments(info: CommentItem) {
        const { id, parentId } = info
        deleteComments({ id, parentId })
            .then((res: any) => {
                if (!res.success) {
                    warningNotify(res.message)
                    return
                }
                successNotify(res.message)
                getComments({
                    pageNo: pagination.current,
                    pageSize: pagination.pageSize
                })
            })
            .catch(err => {
                errorNotify(err.message)
            })
    }

    // 清空选中的 key
    const clearSelectedKeys = () => {
        selectedRowKeys.value = []
    }

    // 对我的评论 标记为已读
    function handleRead() {
        readComments({
            ids: [...selectedRowKeys.value] as number[]
        }).then((res: any) => {
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

    // TODO ====> Reply comment
    const showReplyModal = (show: boolean) => {
        replyVisible.value = show
        !show && !replyContent.value.trim() && (replyContent.value = '')
    }

    // 回复评论
    const reply = () => {
        const {
            id,
            topicId,
            parentId,
            fromName,
            fromEmail,
            isRead,
            title,
            articleId,
            articleUid
        } = replyTargetInfo.value as CommentItem

        replyComment({
            id,
            topicId,
            isRead,
            articleId,
            articleUid,
            parentId: parentId !== null ? parentId : id,
            toName: fromName,
            toEmail: fromEmail,
            comment: replyContent.value.trim(),
            articleTitle: title
        }).then((res: any) => {
            if (!res.success) {
                warningNotify(res.message)
                return
            }
            showReplyModal(false)
            successNotify(res.message)
            getComments({
                pageNo: pagination.current,
                pageSize: pagination.pageSize
            })
        }).catch(err => {
            errorNotify(err.message)
        })
    }

    /** info:
        content: "回复自己功能测试"
        createTime: "2021-04-25 14:08"
        ctime: 1619330915853
        from: "小K.\r\n【sure_k@qq.com】"
        fromEmail: "sure_k@qq.com"
        fromName: "小K."
        id: 9
        isRead: 0
        parentId: 2
        articleId: 1008
        articleUid: 'xx'
        title: "Markdown语法示例"
        to: "小K.\r\n【sure_k@qq.com】"
        toEmail: "sure_k@qq.com"
        toName: "小K."
        topicId: "160239d9-151e-4be9-8d53-b7235f90b367"
        uid: "d70b6fa0-097d-4cbf-9dcb-4b605d0caefb"
    * */
    function openReply(info: CommentItem) {
        replyTargetInfo.value = info
        showReplyModal(true)
    }
    // TODO ====> Reply comment

    // 表格行点击选中
    // const tableRowClick = (record: CommentItem) => {
    //     return {
    //         onClick: () => {
    //             const {id, isRead} = record
    //             // 已读则忽略
    //             if (isRead === 1) {
    //                 infoNotify('This comment is not for you or has been read!')
    //                 return
    //             }
    //             const index = selectedRowKeys.value.findIndex(item => item === id)
    //
    //             if (index > -1) {
    //                 selectedRowKeys.value.splice(index, 1)
    //             } else {
    //                 selectedRowKeys.value.push(id)
    //             }
    //         }
    //     }
    // }

    onMounted(() => {
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
        rowSelection,
        replyTargetInfo,
        replyContent,
        handlePageChange,
        handleDeleteComments,
        openReply,
        reply,
        showReplyModal,
        handleRead
    }
}

import { reactive, ref, Ref, onMounted, computed } from 'vue'
import { MsgListItem, Pagination, PageQueryParams } from '../../types'
import { deleteMessages, getMessageList } from '../../api/api'
import { errorNotify, warningNotify, mapFormatCtimeList, successNotify } from '../../utils'
import { ColumnProps } from 'ant-design-vue/es/table/interface'
import usePagination from '../../hooks/usePagination'

type Key = ColumnProps['key']

const columns = [
    {
        title: 'No.',
        dataIndex: 'id',
        slots: { customRender: 'id' }
    },
    {
        title: 'Name',
        dataIndex: 'name'
    },
    {
        title: 'Message',
        dataIndex: 'content',
        width: '50%'
    },
    {
        title: 'Create Time',
        dataIndex: 'createTime',
        slots: { customRender: 'createTime' }
    },
    {
        title: 'Action',
        dataIndex: 'action',
        slots: { customRender: 'action' }
    }
]

/**
 * 留言信息管理
 * */
export default function useMessage() {

    const loading = ref<boolean>(false)
    const pagination = usePagination()
    const msgList: Ref<MsgListItem[]> = ref([])
    const canDelete = computed<boolean>(() => selectedRowKeys.value.length > 0)

    const selectedRowKeys = ref<Key[]>([])

    function onSelectChange(selectedKeys: Key[]) {
        selectedRowKeys.value = selectedKeys
    }

    onMounted(() => {
        getMsgList({
            pageNo: 1,
            pageSize: 10
        })
    })

    function handlePageChange(curPagination: Pagination) {
        const current = curPagination!.current!
        const pageSize = curPagination!.pageSize!
        pagination.current = current
        pagination.pageSize = pageSize

        getMsgList({
            pageNo: current,
            pageSize
        })
    }

    // 单条删除
    function handleDeleteMsg(info: MsgListItem | null) {
        const ids: Key[] = []
        if (info === null) {
            ids.push(...selectedRowKeys.value)
        } else {
            ids.push(info.id)
        }
        // @ts-ignore
        deleteMessages({ ids })
            .then((res: any) => {
                if (!res.success) {
                    warningNotify(res.message)
                    return
                }
                successNotify(res.message)
                getMsgList({
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

    // 查询留言信息列表
    function getMsgList(params: PageQueryParams) {
        loading.value = true
        clearSelectedKeys()
        getMessageList(params)
            .then((res: any) => {
                if (res.success) {
                    msgList.value = mapFormatCtimeList(res.data.list)
                    pagination.total = res.data.total
                } else {
                    warningNotify(res.message)
                }
                loading.value = false
            })
            .catch(err => {
                loading.value = false
                errorNotify(err.message)
            }
            )
    }

    return {
        loading,
        columns,
        pagination,
        msgList,
        selectedRowKeys,
        canDelete,
        onSelectChange,
        handlePageChange,
        handleDeleteMsg
    }
}

import {reactive, ref, Ref, onMounted, unref, computed} from 'vue'
import {MsgListItem, Pagination, PageQueryParams, ResponseData} from '../../types'
import {deleteMessages, getMessageList} from '../../api/api'
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
        title: 'Message',
        dataIndex: 'content',
        width: '45%'
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
        content: '希望世界美好如初',
        ctime: Date.now()
    },
    {
        id: 1002,
        name: 'sure',
        content: `Hope that all the good things will come soon! Hope that all the good things will come soon! Hope that all the good things will come soon! Hope that all the good things will come soon! Hope that all the good things will come soon! `,
        ctime: Date.now()
    }
]

/**
 * 留言信息管理
 * */
export default function useMessage() {

    const loading = ref<boolean>(false)
    const pagination = reactive({
        current: 1,
        total: 0,
        pageSize: 10,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "50"],
        showSizeChanger: true
    })
    const msgList: Ref<MsgListItem[]> = ref([])

    const checkedKeys = ref<Key[]>([])

    const rowSelection = {
        onChange: (selectedRowKeys: Key[], selectedRows: MsgListItem[]) => {
            checkedKeys.value = selectedRowKeys
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // 判定不可选中的项
        getCheckboxProps: (record: MsgListItem) => ({
            disabled: record.name === 'ssk',
            name: record.name,
        })
    }

    onMounted(() => {
        getMsgList({
            pageNo: 1,
            pageSize: 10
        })
        // msgList.value = mapFormatCtimeList(list)
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
    function handleDeleteMsg(info: MsgListItem) {
        const { id } = info
        deleteMessages({
            ids: [id]
        }).then((res: any) => {
            if (res.success) {
                successNotify(res.message)
            } else {
                warningNotify(res.message)
            }
        }).catch(err => {
            errorNotify(err.message)
        })
    }

    // 查询留言信息列表
    function getMsgList(params: PageQueryParams) {
        loading.value = true
        getMessageList(params)
            // @ts-ignore
            .then((res: ResponseData<any>) => {
                if (res.success) {
                    msgList.value = mapFormatCtimeList(res.data.list)
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

    return {
        loading,
        columns,
        pagination,
        msgList,
        rowSelection,
        handlePageChange,
        handleDeleteMsg
    }
}

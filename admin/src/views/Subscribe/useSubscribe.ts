/**
 * manage subscribe info
 * */
import {reactive, ref, computed, Ref, onMounted} from 'vue'
import {getSubscribeList, deleteSubscribes} from '../../api/api'
import {errorNotify, warningNotify, mapFormatCtimeList, successNotify, Confirm} from '../../utils/util'
import {SubscribeItem, QuerySubscribeParams, Pagination, DeleteSubscribeParams} from '../../types'
import {ColumnProps} from 'ant-design-vue/es/table/interface'

type Key = ColumnProps['key']

const columns = [
    {
        title: 'No.',
        dataIndex: 'id',
        slots: {customRender: 'id'}
    },
    {
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Nickname',
        dataIndex: 'name'
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

export default function useSubscribe() {
    const email = ref<string>('') // 模糊查询 email
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
    const subscribeList: Ref<SubscribeItem[]> = ref([])

    const selectedRowKeys = ref<Key[]>([])

    const deleteDisabled = computed(() => (selectedRowKeys.value.length === 0))

    function onSelectChange(selectedKeys: Key[]) {
        selectedRowKeys.value = selectedKeys
    }
    // 查询按钮点击 => 查询订阅列表
    function handleQueryList() {
        getSubscribes({
            pageNo: pagination.current,
            pageSize: pagination.pageSize,
            email: email.value
        })
    }

    function handlePageChange(curPagination: Pagination) {
        const current = curPagination!.current!
        const pageSize = curPagination!.pageSize!
        pagination.current = current
        pagination.pageSize = pageSize

        getSubscribes({
            pageNo: current,
            pageSize,
            email: email.value
        })
    }

    function getSubscribes(params: QuerySubscribeParams) {
        loading.value = true
        selectedRowKeys.value = []
        getSubscribeList(params)
            .then((res: any) => {
                loading.value = false
                if (!res.success) {
                    warningNotify(res.message)
                    return
                }
                subscribeList.value = mapFormatCtimeList<SubscribeItem>(res.data.list)
                pagination.total = res.data.total
            })
            .catch(err => {
                loading.value = false
                errorNotify(err.message)
            })
    }

    function handleDeleteSubscribes(info: SubscribeItem | null) {
        // 多条删除
        if (info === null) {
            Confirm({
                content: 'Are you sure to delete these subscriptions?',
                onOk: () => {
                    deleteSubscriptions({
                        ids: [...selectedRowKeys.value] as number[]
                    })
                },
                onCancel: () => undefined
            })
            return
        }
        const {id} = info
        deleteSubscriptions({ ids: [id] })
    }

    const deleteSubscriptions = (params: DeleteSubscribeParams) => {
        deleteSubscribes(params)
            .then((res: any) => {
                if (!res.success) {
                    warningNotify(res.message)
                    return
                }
                successNotify(res.message)
                getSubscribes({
                    pageNo: pagination.current,
                    pageSize: pagination.pageSize,
                    email: email.value
                })
            })
            .catch(err => {
                errorNotify(err.message)
            })
    }

    onMounted(() => {
        getSubscribes({
            pageNo: pagination.current,
            pageSize: pagination.pageSize
        })
    })

    return {
        email,
        deleteDisabled,
        loading,
        columns,
        pagination,
        selectedRowKeys,
        subscribeList,
        handleQueryList,
        onSelectChange,
        handlePageChange,
        handleDeleteSubscribes
    }
}
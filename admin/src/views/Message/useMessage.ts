import {reactive, ref, Ref, onMounted} from 'vue'
import {MsgListItem, Pagination, PageQueryParams, ResponseData} from '../../types'
import {getMessageList} from '../../api/api'
import {errorNotify, warningNotify} from "../../utils/util";

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
        dataIndex: 'message',
        width: '45%'
    },
    {
        title: 'Create Time',
        dataIndex: 'ctime',
        slots: {customRender: 'ctime'}
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
        message: '希望世界美好如初',
        ctime: Date.now()
    },
    {
        id: 1002,
        name: 'sure',
        message: `Hope that all the good things will come soon! Hope that all the good things will come soon! Hope that all the good things will come soon! Hope that all the good things will come soon! Hope that all the good things will come soon! `,
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

    onMounted(() => {
        // getMsgList({
        //     pageNo: 1,
        //     pageSize: 10
        // })
        msgList.value = list
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

    function handleDeleteMsg(info: MsgListItem) {
        console.log(info)
    }

    // 查询留言信息列表
    function getMsgList(params: PageQueryParams) {
        loading.value = true
        getMessageList(params)
            // @ts-ignore
            .then((res: ResponseData<any>) => {
                if (res.success) {
                    msgList.value = res.data.list
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
        handlePageChange,
        handleDeleteMsg
    }
}

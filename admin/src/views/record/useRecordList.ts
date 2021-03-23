import { ref, reactive, Ref, UnwrapRef } from 'vue'
import { Pagination, RecordItem } from '../../types'
import { useRouter } from 'vue-router'

const columns = [
    {
        title: 'No.',
        dataIndex: 'id',
        slots: { customRender: 'id' }
    },
    {
        title: 'Create Time',
        dataIndex: 'ctime'
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
        dataIndex: 'tag'
    },
    {
        title: 'Cover',
        dataIndex: 'cover',
        slots: { customRender: 'cover' }
    },
    {
        title: 'Show',
        dataIndex: 'show',
        slots: { customRender: 'show' }
    },
    {
        title: 'Action',
        dataIndex: 'action',
        slots: { customRender: 'action' }
    }
]

/**
 * 文章列表
 * */
export default function useRecordList() {
    const router = useRouter()
    const loading = ref<boolean>(false)

    const pagination = reactive({
        current: 1,
        total: 0,
        pageSize: 10,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "50"],
        showSizeChanger: true
    })

    const articleList: Ref<RecordItem[]> = ref([
        {
            id: 1001,
            uid: 'asdasd',
            title: 'title',
            ctime: 10,
            utime: 1,
            introduce: 'introduce',
            tag: 'JS',
            cover: 'http://localhost:9527/images/cover/941c6c10-9538-44ed-9b56-3bc487529d7e.jpg',
            show: false,
            views: 1,
            is_delete: 1
        }
    ])

    const switchShow: UnwrapRef<Record<string, RecordItem>> = reactive({})

    function handlePageChange (curPagination: Pagination) {
        // const { current, pageSize } = curPagination
        const current = curPagination!.current!,
            pageSize = curPagination!.pageSize!
        // pagination.current = current
        console.log(current, pageSize)
    }

    // 编辑（更新）文章
    function toEditRecord (item: RecordItem) {
        const { id, uid } = item
        router.push({
            path: '/edit',
            query: { id, uid }
        })
    }

    function handleDeleteRecord (item: RecordItem) {
        const { id, uid } = item
        console.log(id, uid)
    }

    return {
        loading,
        columns,
        articleList,
        pagination,
        handlePageChange,
        switchShow,
        toEditRecord,
        handleDeleteRecord
    }
}

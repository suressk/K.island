import { ref, reactive } from 'vue'
import { Pagination } from '../../types'

const columns = [
    {
        title: 'No.',
        dataIndex: 'id',
        scopedSlots: { customRender: 'id' }
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
        scopedSlots: { customRender: 'cover' }
    },
    {
        title: 'Show',
        dataIndex: 'show',
        scopedSlots: { customRender: 'show' }
    },
    {
        title: 'Action',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
    }
]
const articleList: any[] = [
    {
        id: 1001,
        title: 'title',
        ctime: 10,
        introduce: 'introduce',
        tag: 'JS',
        cover: 'http://localhost:9527/images/cover/941c6c10-9538-44ed-9b56-3bc487529d7e.jpg',
        show: true
    }
]

/**
 * 文章列表
 * */
export default function useRecordList() {
    const loading = ref<boolean>(false)

    const pagination = reactive({
        current: 1,
        total: 0,
        pageSize: 10,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "50"],
        showSizeChanger: true
    })

    function handlePageChange (curPagination: Pagination) {
        // const { current, pageSize } = curPagination
        const current = curPagination!.current!,
            pageSize = curPagination!.pageSize!
        // pagination.current = current
        console.log(current, pageSize)
    }

    return {
        loading,
        columns,
        pagination,
        handlePageChange,
        articleList
    }
}

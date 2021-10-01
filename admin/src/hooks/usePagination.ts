
import { reactive } from "vue"
import { Pagination } from "../types"

/**
 * 分页 hook
 * */
const getPagination = (): Pagination => {

  const pagination = reactive({
    current: 1,
    total: 0,
    pageSize: 10,
    showQuickJumper: true,
    pageSizeOptions: ["10", "20", "30", "50"],
    showSizeChanger: true,
    showTotal: (total: number | string) => `${total} Items`
  })

  return pagination
}

export default getPagination
/**
 * 通用类型
 * */
// 单条记录 id 参数
export interface IdOption {
    id: number
    uid: string
}

// 删除参数 id => 数组
export interface IdList {
    id: number[]
}

// 分页查询参数
export interface PageQueryParams {
    pageNo: number
    pageSize: number
}

// 登录参数信息
export interface AuthorInfo {
    username: string
    password: string
}
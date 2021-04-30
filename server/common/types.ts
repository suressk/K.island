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
    ids: number[]
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

export interface CorsOption {
    origin: boolean
}

/* record service */
export {
    GetRecordListParams,
    RecordItem,
    AddRecordParams,
    UpdateRecordParams
} from './recordTypes'

/* subscribe service */
export {
    SendEmailType,
    VerifyCodeParams,
    CreateSubscribeEmailInfo,
    AuthSubscribeInfo
} from './subscribeTypes'

export type DeleteSubscribeParams = IdList

// 查询订阅列表参数
// TODO 新增 email 字段作为模糊查询条件，免去多页翻页查找要移除订阅的 email
export interface GetSubscribeListParams extends PageQueryParams {
    email?: string
}

/* message service */
export {AddMessageParams} from './messageTypes'
// 分页查询【留言】列表
export type QueryMessageParams = PageQueryParams

/* comment service */
export {AddCommentParams} from './commentTypes'

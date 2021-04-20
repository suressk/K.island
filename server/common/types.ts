import {PageQueryParams} from './commonTypes'

export {AuthorInfo, IdOption, IdList, PageQueryParams} from './commonTypes'

export {GetRecordListParams, RecordItem, AddRecordParams, UpdateRecordParams} from './recordTypes'

export {
    SendEmailType,
    GetSubscribeListParams,
    DeleteSubscribeParams,
    VerifyCodeParams,
    CreateSubscribeEmailInfo,
    AuthSubscribeInfo
} from './subscribeTypes'

export {AddMessageParams} from './messageTypes'

// 分页查询【留言】列表
export type QueryMessageParams = PageQueryParams

export interface CorsOption {
    origin: boolean
}

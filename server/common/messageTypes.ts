// 分页查询留言信息（不提供添加过滤条件查询）
export {PageQueryParams as QueryMessageParams} from './commonTypes'

// 新增留言参数
export interface AddMessageParams {
    name: string
    message: string
}
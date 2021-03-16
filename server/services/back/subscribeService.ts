import { connectQuery } from '../../dao/DBUtil'
import { QuerySubscribeListOptions, DeleteSubscribeOptions } from '../../common/types'
import Query from "mysql2/typings/mysql/lib/protocol/sequences/Query";

/**
 * 分页查询订阅列表
 * */
export function querySubscribeList (
    options: QuerySubscribeListOptions,
    success: (result: any) => void,
    error: (err: Query.QueryError) => void
) {
    const sqlStr = 'SELECT * from `subscribe` ORDER BY ctime DESC LIMIT ?, ?'
    const { pageNo, pageSize } = options
    connectQuery(sqlStr, [pageNo, pageSize], success, error)
}

/**
 * 新增订阅
 * */
// export function addSubscribe (
//     options: QuerySubscribeListOptions,
//     success: (result: any) => void,
//     error: (err: Query.QueryError) => void
// ) {
//     const sqlStr = 'INSERT INTO subscribe () VALUES ()'
//     const { pageNo, pageSize } = options
//     connectQuery(sqlStr, [pageNo, pageSize], success, error)
// }

/**
 * 删除订阅信息
 * */
export function deleteSubscribe (
    options: DeleteSubscribeOptions,
    success: (result: any) => void,
    error: (err: Query.QueryError) => void
) {
    const sqlStr = 'DELETE * from `subscribe` WHERE id = ? AND email = ?'
    const { id, email } = options
    connectQuery(sqlStr, [id, email], success, error)
}

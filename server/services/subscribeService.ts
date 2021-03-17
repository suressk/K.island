import { connectQuery } from '../dao/DBUtil'
import { DeleteSubscribeOptions, QuerySubscribeListOptions } from '../common/types'
import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query'

interface QuerySubscribeOptions {
    email: string;
    name: string;
}

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
 * 查询订阅信息
 * */
export function querySubscribeInfo (
    options: QuerySubscribeOptions,
    success: (res: any) => void,
    error: (err: any) => void
) {
    const { email } = options
    const sqlStr = 'SELECT * FROM `subscribe` WHERE email = ?'
    connectQuery(sqlStr, [email], success, error)
}

/**
 * 新增订阅邮箱信息
 * */
export function addSubscribeInfo (
    options: QuerySubscribeOptions,
    success: (res: any) => void,
    error: (err: any) => void
) {
    const { email, name } = options
    const date = Date.now()
    const sqlStr = 'INSERT INTO `subscribe` (email, name, ctime) values (?, ?, ?)'
    connectQuery(sqlStr, [email, name, date], success, error)
}

/**
 * 删除订阅信息
 * */
export function deleteSubscribe (
    options: DeleteSubscribeOptions,
    success: (result: any) => void,
    error: (err: Query.QueryError) => void
) {
    const sqlStr = 'DELETE FROM `subscribe` WHERE id = ? AND email = ?'
    const { id, email } = options
    connectQuery(sqlStr, [id, email], success, error)
}

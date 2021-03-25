import {connectQuery, createConnection} from '../dao/DBUtil'
import {
    DeleteSubscribeOptions,
    QuerySubscribeListOptions,
    VerifySubscribeOptions
} from '../common/types'
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
    const queryListStr = 'SELECT * from `subscribe` ORDER BY ctime DESC LIMIT ?, ?'
    const queryTotalStr = 'SELECT COUNT(id) as total from `subscribe`'
    const { pageNo, pageSize } = options
    const connection = createConnection()
    connection.connect()
    const listPro = new Promise((resolve, reject) => {
        connection.query(
            queryListStr,
            [pageNo, pageSize],
            (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            }
        )
    })
    const totalPro = new Promise((resolve, reject) => {
        connection.query(
            queryTotalStr,
            [],
            (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            }
        )
    })

    Promise.all([listPro, totalPro]).then(([list, totalRes]) => {
        success({
            list,
            // @ts-ignore
            total: totalRes[0].total
        })
        connection.end()
    }).catch(err => {
        error(err)
        connection.end()
    })
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
    const sqlStr = 'SELECT id, email, name, ctime FROM `subscribe` WHERE email = ?'
    connectQuery(sqlStr, [email], success, error)
}

/**
 * 查询邮箱验证信息
 * [{ id: '', ... }]
 * */
export function verifyEmailCode (
    options: VerifySubscribeOptions,
    success: (res: any) => void,
    error: (err: any) => void
) {
    const { id, email, code } = options
    const sqlStr = 'SELECT `id`, `email`, `code` FROM `verify_subscribe_info` WHERE `id` = ? AND `email` = ?'
    const connection = createConnection()
    connection.connect()
    connection.query(sqlStr, [id, email], (err, result) => {
        // 成功查询到验证信息
        if (!err) {
            // @ts-ignore
            const item = result[0]
            if (item) {
                if (item.code === code) {
                    success('success')
                } else {
                    error({
                        message: 'Verification code error'
                    })
                }
            } else {
                error({
                    message: `No match to the email: ${email}`
                })
            }
        } else {
            error(err)
        }
    })
    connection.end()
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

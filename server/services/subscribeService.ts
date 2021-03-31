import {connectQuery, connectQueryPro, createConnection} from '../dao/DBUtil'
import { v4 as uuid } from 'uuid'
import {
    DeleteSubscribeOptions,
    QuerySubscribeListOptions,
    VerifySubscribeOptions
} from '../common/types'

interface QuerySubscribeOptions {
    email: string;
    name: string;
}

/**
 * 分页查询订阅列表
 * */
export function querySubscribeList (options: QuerySubscribeListOptions) {
    const queryListStr = 'SELECT id, uid, name, email, name, ctime from `tbl_subscribe` ORDER BY ctime DESC LIMIT ?, ?;'
    const queryTotalStr = 'SELECT COUNT(id) as total from `tbl_subscribe`;'
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

    return new Promise((resolve, reject) => {
        Promise.all([listPro, totalPro]).then(([list, totalRes]) => {
            resolve({
                list,
                // @ts-ignore
                total: totalRes.length ? totalRes[0].total : 0
            })
            connection.end()
        }).catch(err => {
            reject(err)
            connection.end()
        })
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
    const sqlStr = 'SELECT id, uid, email, name, ctime FROM `tbl_subscribe` WHERE email = ?'
    connectQuery(sqlStr, [email], success, error)
}

/**
 * 查询邮箱验证信息
 * [{ id: '', ... }]
 * */
export function verifyEmailCode (options: VerifySubscribeOptions) {
    const { id, email, code } = options
    const sqlStr = 'SELECT id, email, code FROM `tbl_verify_subscribe` WHERE id = ? AND email = ?'
    const connection = createConnection()
    connection.connect()
    return new Promise((resolve, reject) => {
        connection.query(
            sqlStr,
            [id, email],
            (err, result) => {
                // 成功查询到验证信息
                if (!err) {
                    // @ts-ignore
                    const item = result[0]
                    if (item) {
                        if (item.code === code) {
                            resolve('success')
                        } else {
                            reject({
                                message: 'Verification code error'
                            })
                        }
                    } else {
                        reject({
                            message: `Email not matched : ${email}`
                        })
                    }
                } else {
                    reject(err)
                }
            }
        )
        connection.end()
    })
}

/**
 * 新增订阅邮箱信息
 * */
export function addSubscribeInfo (options: QuerySubscribeOptions) {
    const { email, name } = options
    const date = Date.now()
    const uid = uuid()
    const sqlStr = 'INSERT INTO `tbl_subscribe` (uid, email, name, ctime) values (?, ?, ?, ?);'
    return new Promise((resolve, reject) => {
        connectQueryPro(sqlStr, [uid, email, name, date])
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 删除订阅信息
 * */
export function deleteSubscribe (options: DeleteSubscribeOptions) {
    const sqlStr = 'DELETE FROM `tbl_subscribe` WHERE id = ? AND email = ?'
    const { id, email } = options
    return new Promise((resolve, reject) => {
        connectQueryPro(sqlStr, [id, email])
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

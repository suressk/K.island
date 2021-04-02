import { connectQueryPro, createConnection } from '../dao/DBUtil'
import {
    DeleteSubscribeOptions,
    QuerySubscribeListOptions,
    VerifySubscribeOptions
} from '../common/types'
import { v4 as uuid } from 'uuid'
import { getTableDeleteSqlStr } from '../utils/util'

interface QuerySubscribeOptions {
    email: string
    name?: string
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
export function querySubscribeInfo (options: QuerySubscribeOptions) {
    const { email } = options
    const sqlStr = 'SELECT id, uid, email, name, ctime FROM `tbl_subscribe` WHERE email = ?;'
    return new Promise((resolve, reject) => {
        connectQueryPro(sqlStr, [email])
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

interface VerifyInfo {
    email: string
    code?: string
}

interface AddVerifyInfo extends VerifyInfo {
    code: string
}

/**
 * 存储邮箱待验证的验证码信息（未过期则更新验证码）
 * */
export function addVerifyCodeInfo (options: AddVerifyInfo) {
    const { email, code } = options
    const ctime = Date.now()
    const uid = uuid()
    const expiredTime = ctime + 3600 * 1000 // 1 小时有效期
    // 插入新验证码信息的 sql 语句
    let sqlStr = 'INSERT INTO `tbl_verify_subscribe` (uid, email, verify_code, ctime, expired_time) VALUES (?, ?, ?, ?, ?);'
    let params = [uid, email, code, ctime, expiredTime]

    /**
     *  TODO === 用于保证验证码信息表 email - code 组合的唯一性（否则会出现多对 email - code 组合的情况）
     *  TODO 但这里有多次连库及查删改操作 => 后面再考虑优化吧
     *  */

    new Promise((resolve, reject) => {
        // 1. 检查是否存在验证码
        getVerifyInfo({ email })
            .then((list: any) => {
                if (list.length > 0) {
                    resolve(list[0].id)
                } else {
                    reject()
                }
            })
            .catch(err => {
                reject(err)
            })
    }).then((id: any) => {
        // 2. 存在，则更新验证码
        sqlStr = 'UPDATE `tbl_verify_subscribe` SET verify_code = ?, expired_time = ? WHERE id = ?;'
        params = [code, expiredTime, id]
    })

    // 3. 插入 / 更新 验证码信息（更新验证信息成功或失败后再删除过期验证信息）
    return new Promise((resolve, reject) => {
        connectQueryPro(sqlStr, params)
            .then(result => {
                // 4. 删除过期验证信息
                deleteExpiredVerifyInfo()
                resolve(result)
            })
            .catch(error => {
                // 4. 删除过期验证信息
                deleteExpiredVerifyInfo()
                reject(error)
            })
    })
}

/**
 * 查询验证表是否存在验证码信息
 * */
export function getVerifyInfo (options: VerifyInfo) {
    const { email } = options
    const sqlStr = 'SELECT id FROM `tbl_verify_subscribe` WHERE email = ?;'
    return new Promise((resolve, reject) => {
        connectQueryPro(sqlStr, [email])
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

/**
 * 删除过期验证信息
 * 'DELETE FROM `tbl_verify_subscribe` WHERE id IN (SELECT id FROM `tbl_verify_subscribe` WHERE expired_time < ?);'
 * 不能同时作用于同一张表的 sql 语句
 * TODO 猜测原因：可能是由于 delete 语句会先于后面 select 语句执行导致表数据更新异常的问题
 * */
export function deleteExpiredVerifyInfo () {
    const now = Date.now()
    const sqlStr = 'SELECT id FROM `tbl_verify_subscribe` WHERE expired_time < ?;'

    const queryPro = new Promise((resolve, reject) => {
        connectQueryPro(sqlStr, [now])
            .then(ids => {
                resolve(ids)
            })
            .catch(err => {
                reject(err)
            })
    })

    queryPro.then((ids: any) => {
        if (ids && ids.length) {
            const deleteSqlStr = getTableDeleteSqlStr(ids, '`tbl_verify_subscribe`', 'id')
            connectQueryPro(deleteSqlStr, ids)
                .then(() => undefined)
        }
    })
}

/**
 * 查询邮箱验证信息
 * [{ id: '', ... }]
 * */
export function verifyEmailCode (options: VerifySubscribeOptions) {
    const { email, code } = options
    const sqlStr = 'SELECT email, code FROM `tbl_verify_subscribe` WHERE email = ?;'
    const connection = createConnection()
    connection.connect()
    return new Promise((resolve, reject) => {
        connection.query(
            sqlStr,
            [email],
            (err, result: any[]) => {
                // 成功查询到验证信息
                if (!err) {
                    const item = result[0]
                    if (item) {
                        if (item.code === code) {
                            resolve('验证成功！恭喜您成功订阅小 K. 的小栈，有消息将会第一时间通知您哟，若要取消订阅，请联系小K.')
                        } else {
                            reject({
                                message: '验证码错误！是不是输错验证码辣？'
                            })
                        }
                    } else {
                        reject({
                            message: `没有匹配到您的邮箱呢: "${email}"，仔细检查一下？`
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
    const sqlStr = 'INSERT INTO `tbl_subscribe` (uid, email, name, ctime) VALUES (?, ?, ?, ?);'
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
    const sqlStr = 'DELETE FROM `tbl_subscribe` WHERE id = ? AND email = ?;'
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

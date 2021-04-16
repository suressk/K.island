import {poolQuery, promisePoolQuery} from '../dao/DBUtil'
import {getTableDeleteSqlStr} from '../utils/util'
import {DeleteSubscribeOptions, QuerySubscribeListOptions, CheckVerificationCodeOptions} from '../common/types'
import {v4 as uuid} from 'uuid'

interface QuerySubscribeOptions {
    email: string
    name?: string
}

interface VerifyInfo {
    email: string
    code?: string
}

interface AddVerifyInfo extends VerifyInfo {
    code: string
    uid: string
}

/**
 * 分页查询订阅列表
 * */
export async function querySubscribeList(options: QuerySubscribeListOptions) {
    const listStr = 'SELECT id, uid, name, email, name, ctime from `tbl_subscribe` ORDER BY ctime DESC LIMIT ?, ?;'
    const totalStr = 'SELECT COUNT(id) as total from `tbl_subscribe`;'
    const {pageNo, pageSize} = options
    const listParams = [(pageNo - 1) * pageSize, pageSize]
    try {
        const [list] = await promisePoolQuery(listStr, listParams)
        const [totalRes] = await promisePoolQuery(totalStr, [])
        // @ts-ignore
        return {list, total: (totalRes.length ? totalRes[0].total : 0)}
    } catch (err) {
        return err
    }
}

/**
 * 查询已订阅邮箱
 * */
export async function queryAllSubscribe() {
    const sqlStr = 'SELECT email FROM `tbl_subscribe`'
    try {
        const [list] = await promisePoolQuery(sqlStr, [])
        return list
    } catch (err) {
        return err
    }
}

/**
 * 查询一条订阅信息
 * */
export function querySubscribeInfo(options: QuerySubscribeOptions) {
    const {email} = options
    const sqlStr = 'SELECT id, uid, email, name, ctime FROM `tbl_subscribe` WHERE email = ?;'
    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, [email])
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 存储邮箱待验证的验证码信息（未过期则更新验证码）
 * */
export async function addVerifyCodeInfo(options: AddVerifyInfo) {
    const {uid, email, code} = options
    const ctime = Date.now()
    const expiredTime = ctime + 3600 * 1000 // 1 小时有效期
    // 插入新验证码信息
    let sqlStr = 'INSERT INTO `tbl_verify_subscribe` (uid, email, verify_code, ctime, expired_time) VALUES (?, ?, ?, ?, ?);'
    let params = [uid, email, code, ctime, expiredTime]

    /**
     *  TODO === 用于保证验证码信息表 email - code 组合的唯一性（否则会出现多对 email - code 组合的情况）
     *  TODO 但这里有多次连库及查删改操作 => 后面再考虑优化吧
     *  */

    new Promise((resolve, reject) => {
        // 1. 检查是否存在验证码
        getVerifyInfo({email})
            .then((list: any) => {
                if (list.length > 0) {
                    const {id} = list[0]
                    // 2. 存在，则更新验证码
                    sqlStr = 'UPDATE `tbl_verify_subscribe` SET verify_code = ?, expired_time = ? WHERE id = ?;'
                    params = [code, expiredTime, id]

                    return {}
                } else {
                    return {}
                }
            }, err => err)
            .then(() => {
                // 3. 插入 / 更新验证码
                poolQuery(sqlStr, params)
                    .then(result => resolve(result))
                    .catch(error => reject(error))
            })

    }).then(async (result) => {

        // 4. 删除过期验证信息
        await deleteExpiredVerifyInfo().then(() => {
            console.log('delete success...')
        }).catch(err => {
            console.log(err)
        })
        return result
    })
}

/**
 * 删除过期验证信息
 * 'DELETE FROM `tbl_verify_subscribe` WHERE id IN (SELECT id FROM `tbl_verify_subscribe` WHERE expired_time < ?);'
 * 不能同时作用于同一张表的 sql 语句
 * TODO 猜测原因：可能是由于 delete 语句会先于后面 select 语句执行导致表数据更新异常的问题
 * */
export function deleteExpiredVerifyInfo() {
    const now = Date.now()
    const sqlStr = 'SELECT id FROM `tbl_verify_subscribe` WHERE expired_time < ?;'

    return new Promise((resolve, reject) => {
        // 查询过期验证码 id[]
        poolQuery(sqlStr, [now])
            .then(ids => ids, err => err)
            .then((ids: any) => {
                if (!ids || !ids.length) reject('no expired code')

                const deleteSqlStr = getTableDeleteSqlStr(ids, '`tbl_verify_subscribe`', 'id')
                // 删除过期验证码信息
                poolQuery(deleteSqlStr, ids)
                    .then(() => {
                        resolve('Successfully deleted')
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
    })
}

/**
 * 查询验证表是否存在验证码信息
 * */
export function getVerifyInfo(options: VerifyInfo) {
    const {email} = options
    const sqlStr = 'SELECT id, uid, email, verify_code, expired_time FROM `tbl_verify_subscribe` WHERE email = ?;'
    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, [email])
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

/**
 * 校验邮箱 —— 验证码
 * */
export function checkVerificationCode(options: CheckVerificationCodeOptions) {
    const {email, code} = options
    const now = Date.now()
    return new Promise((resolve, reject) => {
        // 查询此邮箱是否已订阅
        querySubscribeInfo({email})
            .then((list: any) => {
                return (list.length > 0)
            }, err => err)
            .then(existed => {
                if (existed) {
                    reject({
                        status: 200,
                        message: '你的邮箱已订阅小栈，不用重复订阅操作哦~',
                        error: {}
                    })
                } else {
                    // 邮箱和验证码 => 默认有值； 查询验证码信息
                    getVerifyInfo({email})
                        .then((result: any) => {
                            if (!result || result.length === 0) {
                                reject({
                                    status: 200,
                                    message: `抱歉！没能成功匹配到您的邮箱（${email}）及验证信息，确定发起过订阅吗？`,
                                    error: {}
                                })
                            } else {
                                const item = result[0]
                                // 验证码过期（1小时有效）
                                if (now > item.expired_time) {
                                    reject({
                                        status: 200,
                                        message: '验证码已经过期辣！请回到订阅页面重新发起订阅哦~',
                                        error: {}
                                    })
                                } else if (item.verify_code === code) {
                                    // 验证通过
                                    resolve({message: 'success'})
                                } else {
                                    reject({
                                        status: 200,
                                        message: '验证码错误！是不是输错验证码辣？',
                                        error: {}
                                    })
                                }
                            }
                        })
                        .catch(err => {
                            reject({
                                status: 500,
                                message: 'Server Internal Error',
                                error: err
                            })
                        })
                }
            })
    })
}

/**
 * 新增订阅邮箱信息
 * */
export function addSubscribeInfo(options: QuerySubscribeOptions) {
    const {email, name} = options
    const date = Date.now()
    const uid = uuid()
    const sqlStr = 'INSERT INTO `tbl_subscribe` (uid, email, name, ctime) VALUES (?, ?, ?, ?);'
    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, [uid, email, name, date])
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
export function deleteSubscribe(options: DeleteSubscribeOptions) {
    const sqlStr = 'DELETE FROM `tbl_subscribe` WHERE id = ? AND email = ?;'
    const {id, email} = options
    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, [id, email])
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

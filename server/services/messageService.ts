import {poolQuery, promisePoolQuery} from '../dao/DBUtil'
import { MessageListOptions } from '../common/types'

/**
 * 分页查询留言信息
 * */
export function getMessageList (options: MessageListOptions) {
    const { pageNo, pageSize } = options
    let listParams = [(pageNo - 1) * pageSize, pageSize] // 分页参数
    let listSqlStr = 'SELECT id, uid, content, name, ctime FROM `tbl_messages` ORDER BY ctime DESC LIMIT ?, ?;'
    let totalSqlStr: string = 'SELECT COUNT(id) as total FROM `tbl_messages`'

    const result = promisePoolQuery(listSqlStr, listParams)
    console.log('promise query: ', result)

    const listPro = new Promise((resolve, reject) => {
        poolQuery(listSqlStr, listParams)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })

    const totalPro = new Promise((resolve, reject) => {
        poolQuery(totalSqlStr, [])
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })

    return new Promise((resolve, reject) => {
        Promise.all([listPro, totalPro])
            .then(([list, totalRes]) => {
                resolve({
                    list,
                    // @ts-ignore
                    total: totalRes[0].total || 0
                })
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 新增留言信息
 * */
export function addMessage() {}


/**
 * 删除留言信息
 * */
export function deleteMessage() {}

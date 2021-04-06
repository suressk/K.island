import {poolQuery, promisePoolQuery} from '../dao/DBUtil'
import {MessageListOptions, AddMessageOpt, IdsOptions} from '../common/types'
import {v4 as uuid} from 'uuid'

/**
 * 分页查询留言信息
 * */
export async function getMessageList(options: MessageListOptions) {
    const {pageNo, pageSize} = options
    let listParams = [(pageNo - 1) * pageSize, pageSize] // 分页参数
    let listSqlStr = 'SELECT id, uid, content, name, ctime FROM `tbl_messages` ORDER BY ctime DESC LIMIT ?, ?;'
    let totalSqlStr: string = 'SELECT COUNT(id) as total FROM `tbl_messages`'


    try {
        const [list] = await promisePoolQuery(listSqlStr, listParams)
        const [total] = await promisePoolQuery(totalSqlStr, [])
        // @ts-ignore
        return { list, total: total[0].total || 0 }
    } catch (err) {
        return err
    }

    // const listPro = new Promise((resolve, reject) => {
    //     poolQuery(listSqlStr, listParams)
    //         .then(result => {
    //             resolve(result)
    //         })
    //         .catch(error => {
    //             reject(error)
    //         })
    // })
    //
    // const totalPro = new Promise((resolve, reject) => {
    //     poolQuery(totalSqlStr, [])
    //         .then(result => {
    //             resolve(result)
    //         })
    //         .catch(error => {
    //             reject(error)
    //         })
    // })
    //
    // return new Promise((resolve, reject) => {
    //     Promise.all([listPro, totalPro])
    //         .then(([list, totalRes]) => {
    //             resolve({
    //                 list,
    //                 // @ts-ignore
    //                 total: totalRes[0].total || 0
    //             })
    //         })
    //         .catch(err => {
    //             reject(err)
    //         })
    // })
}


/**
 * 新增留言信息
 * */
export async function addMessage(options: AddMessageOpt) {
    const {name, message} = options
    const ctime = Date.now()
    const uid = uuid()

    const sqlStr = 'INSERT INTO `tbl_messages` (uid, name, content, ctime) VALUES (?, ?, ?, ?);'
    const params = [uid, name, message, ctime]

    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, params)
            .then(result => {
                resolve(result)
            }, error => {
                reject(error)
            })
    })
}


/**
 * 删除留言信息
 * */
export function deleteMessage(options: IdsOptions) {
    const { ids } = options
    let sqlStr = 'DELETE FROM `tbl_messages` WHERE id IN ('
    const params = ids.map(() => ('?'))
    let str = params.join(',')
    sqlStr = sqlStr + str + ');'

    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, ids)
            .then(result => {
                resolve(result)
            }, error => {
                reject(error)
            })
    })
}

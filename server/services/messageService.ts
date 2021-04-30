import {poolQuery, promisePoolQuery} from '../db/DBUtil'
import {QueryMessageParams, AddMessageParams, IdList} from '../common/types'
import {v4 as uuid} from 'uuid'
import {getTableDeleteSqlStr} from '../utils/util'

/**
 * 分页查询留言信息
 * */
export async function getMessageList(options: QueryMessageParams) {
    const {pageNo, pageSize} = options
    let listParams = [(pageNo - 1) * pageSize, pageSize] // 分页参数
    let listSqlStr = 'SELECT id, uid, content, name, ctime FROM `tbl_messages` ORDER BY ctime DESC LIMIT ?, ?;'
    let totalSqlStr: string = 'SELECT COUNT(id) as total FROM `tbl_messages`'

    try {
        const [list] = await promisePoolQuery(listSqlStr, listParams)
        const [totalRes] = await promisePoolQuery(totalSqlStr, [])

        return {
            list,
            /* @ts-ignore */
            total: totalRes.length ? totalRes[0].total : (list.length || 0)
        }
    } catch (err) {
        return err
    }
}


/**
 * 新增留言信息
 * */
export async function addMessage(options: AddMessageParams) {
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
export function deleteMessages(options: IdList) {
    const { ids } = options
    // let sqlStr = 'DELETE FROM `tbl_messages` WHERE id IN ('
    // const params = ids.map(() => ('?'))
    // let str = params.join(',')
    // sqlStr = sqlStr + str + ');'
    const sqlStr = getTableDeleteSqlStr(ids, '`tbl_messages`', 'id')

    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, ids)
            .then(result => {
                resolve(result)
            }, error => {
                reject(error)
            })
    })
}

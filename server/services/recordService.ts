import { createConnection, connectQueryPro } from '../dao/DBUtil'
import {getUpdateRecordParams, mapCreateTime, mapYearGroup} from '../utils/util'
import { v4 as uuid } from 'uuid'
import {
    QueryListOptions,
    RecordIdOptions,
    AddRecordOptions,
    UpdateRecordOptions, ArticleListItem,
} from '../common/types'

/**
 * sql 语句
 * */
const sqlStrObj = {
    /* 所有文章分页 => 后台查询 */
    allList: 'SELECT id, uid, title, introduce, tag, views, liked, cover, ctime, utime, is_delete FROM `tbl_records` ORDER BY ctime DESC LIMIT ?, ?;',
    allTotal: 'SELECT COUNT(uid) as total from `tbl_records`;',
    /* 按标题模糊查询 分页 */
    titleList: 'SELECT id, uid, title, introduce, tag, views, liked, cover, ctime, utime, is_delete FROM `tbl_records` WHERE `title` LIKE ? ORDER BY ctime DESC LIMIT ?, ?;',
    titleTotal: 'SELECT COUNT(uid) as total from `tbl_records` WHERE is_delete = 0 AND `title` LIKE ?;',
    /* 所有 is_delete = 0 文章分页 */
    showsList: 'SELECT id, uid, title, introduce, tag, views, liked, cover, ctime, utime FROM `tbl_records` WHERE is_delete = 0 ORDER BY ctime DESC LIMIT ?, ?;',
    showsTotal: 'SELECT COUNT(uid) as total from `tbl_records` WHERE is_delete = 0;',
    /* 按浏览量排序分页 */
    viewsList: 'SELECT id, uid, title, introduce, tag, views, liked, cover, ctime, utime, is_delete FROM `tbl_records` WHERE is_delete = 0 ORDER BY views DESC LIMIT ?, ?;',
    /* viewsTotal: '', 同 showTotal */
}

type ListParams = [number, number] | [string, number, number]

interface QueryListParams {
    listSqlStr: string
    listParams: ListParams
    totalSqlStr: string
    totalParams: string[]
}

/**
 * 获取分页查询 sql 语句及参数
 * */
function getQueryListParams(options: QueryListOptions): QueryListParams {
    const { pageNo, pageSize } = options
    let listParams: ListParams = [(pageNo - 1) * pageSize, pageSize] // 分页参数
    let listSqlStr: string
    let totalSqlStr: string
    let totalParams: string[] = []
    // 后台管理查询所有文章列表
    if (options.range && options.range === 'all') {
        listSqlStr = sqlStrObj.allList
        totalSqlStr = sqlStrObj.allTotal
        // 按 title 模糊查询
        if (options.title) {
            listSqlStr = sqlStrObj.titleList
            listParams = [`%${options.title}%`, ...listParams]
            totalSqlStr = sqlStrObj.titleTotal
            totalParams = [`%${options.title}%`]
        }
    } else if (options.index === 1) {
        listSqlStr = sqlStrObj.viewsList
        totalSqlStr = sqlStrObj.showsTotal
        totalParams = [`%${options.title}%`]
    } else {
        // 前端展示未删除文章
        listSqlStr = sqlStrObj.showsList
        totalSqlStr = sqlStrObj.showsTotal
    }

    return {
        listSqlStr,
        listParams,
        totalSqlStr,
        totalParams
    }
}

/**
 * 分页查询文章列表
 * */
export function queryRecordList (options: QueryListOptions) {
    const { listSqlStr, listParams, totalSqlStr, totalParams } = getQueryListParams(options)
    const connection = createConnection()
    connection.connect()
    // 查列表数据
    const getListPro = new Promise((resolve, reject) => {
        connection.query(listSqlStr, listParams, ((err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        }))
    })
    const getTotalPro = new Promise((resolve, reject) => {
        connection.query(totalSqlStr, totalParams, ((err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        }))
    })

    return new Promise((resolve, reject) => {
        Promise.all([getListPro, getTotalPro]).then(([list, totalRes]) => {
            // 按月分组
            if (options.group === 'MONTH') {
                resolve({
                    list: mapYearGroup(list as any),
                    // @ts-ignore
                    total: totalRes.length ? totalRes[0].total : 0
                })
            } else {
                resolve({
                    list: mapCreateTime(list as any),
                    // @ts-ignore
                    total: totalRes.length ? totalRes[0].total : 0
                })
            }
            connection.end()
        }).catch(err => {
            reject(err)
            connection.end()
        })
    })
}

/**
 * 查询文章详情信息
 * */
export function queryRecordDetail (options: RecordIdOptions) {
    const { id, uid } = options
    const sqlStr = 'SELECT id, uid, title, introduce, content, tag, views, liked, cover, music, ctime, utime FROM `tbl_records` WHERE id = ? AND uid = ?;'
    const params = [id, uid]

    return new Promise((resolve, reject) => {
        connectQueryPro(sqlStr, params)
            .then((result: any) => {
                resolve(result)
                updateViews(result[0])
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 更新浏览量
 * */
function updateViews(info: ArticleListItem) {
    const { id, uid, views } = info
    // then nothing to do
    updateRecord({ id, uid, views: views + 1 })
        .then(() => {})
        .catch(() => {})
}

/**
 * 插入（新建）文章
 * */
export function addRecord (options: AddRecordOptions) {
    const { title, tag, introduce, content, cover, music } = options
    const sqlStr = 'INSERT INTO `tbl_records` (uid, title, content, introduce, tag, cover, music, ctime, utime, views, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
    const ctime = Date.now()
    const uid = uuid()
    const params = [uid, title, content, introduce, tag, cover, music, ctime, ctime, 10, 0]
    return new Promise((resolve, reject) => {
        connectQueryPro(sqlStr, params)
            .then((result: any) => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
    // connectQuery(sqlStr, params, success, error)
}

/**
 * 修改（更新）文章信息
 * */
export function updateRecord (options: UpdateRecordOptions) {
    // 四种情况:
    // 1. 修改 is_delete —— 文章显示与否；
    // 2. 修改 views —— 文章访问量；
    // 3. 修改 liked —— 文章点赞(喜欢)量；
    // 4. 修改文章详情内容（title, tag, introduce, content, cover）
    const { sqlStr, params } = getUpdateRecordParams(options)
    // connectQuery(sqlStr, params, success, error)
    return new Promise((resolve, reject) => {
        connectQueryPro(sqlStr, params)
            .then(result => resolve(result))
            .catch(err => reject(err))
    })
}

/**
 * 删除文章 (真删除)
 * */
export function deleteRecord (options: RecordIdOptions) {
    const { id, uid } = options
    const sqlStr = 'DELETE FROM `tbl_records` WHERE id = ? and uid = ?;'
    const params = [id, uid]
    return new Promise((resolve, reject) => {
        connectQueryPro(sqlStr, params)
            .then((result: any) => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

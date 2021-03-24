import { connectQuery, createConnection } from '../dao/DBUtil'
import { v4 as uuid } from 'uuid'
import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query'
import {
    QueryListOptions,
    RecordIdOptions,
    AddRecordOptions,
    UpdateRecordOptions
} from '../common/types'
import { getUpdateRecordParams } from '../utils/util'

const sqlStrObj = {
    allRecords: 'SELECT id, uid, title, introduce, tag, views, cover, ctime, utime, is_delete FROM `records` ORDER BY ctime DESC LIMIT ?, ?',
    filterTitle: 'SELECT id, uid, title, introduce, tag, views, cover, ctime, utime, is_delete FROM `records` WHERE title LIKE %?% ORDER BY ctime DESC LIMIT ?, ?',
    filterShow: 'SELECT id, uid, title, introduce, tag, views, cover, ctime, utime FROM `records` WHERE is_delete = 0 ORDER BY ctime DESC LIMIT ?, ?',
    filterTotal: 'SELECT COUNT(uid) as total from `records` WHERE is_delete = 0'
}

type ListParams = [number, number] | [string, number, number]

/**
 * 分页查询文章列表
 * */
export function queryRecordList (
    options: QueryListOptions,
    success: (result: any) => void,
    error: (err: Query.QueryError) => void
) {
    const { pageNo, pageSize } = options
    let params: ListParams = [(pageNo - 1) * pageSize, pageSize]
    let sqlStr: string
    let sqlTotalStr: string = 'SELECT COUNT(uid) as total from `records`'
    // 后台管理查询所有文章列表
    if (options.range && options.range === 'all') {
        sqlStr = sqlStrObj.allRecords
    } else if (options.title) {
        sqlStr = sqlStrObj.filterTitle
        params = [options.title, ...params]
    } else {
        // 前端展示未删除文章
        sqlStr = sqlStrObj.filterShow
        sqlTotalStr = sqlStrObj.filterTotal
    }
    const connection = createConnection()
    connection.connect()
    // 查列表数据
    const getListPro = new Promise((resolve, reject) => {
        connection.query(sqlStr, params, ((err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        }))
    })
    const getTotalPro = new Promise((resolve, reject) => {
        connection.query(sqlTotalStr, [], ((err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        }))
    })
    Promise.all([getListPro, getTotalPro]).then(([list, totalRes]) => {
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
 * 查询文章详情信息
 * */
export function queryRecordDetail (
    options: RecordIdOptions,
    success: (result: any) => void,
    error: (err: Query.QueryError) => void
) {
    const { id, uid } = options
    const sqlStr = 'SELECT id, uid, title, introduce, content, tag, views, liked, cover, music, musicName, ctime, utime FROM `records` WHERE id = ? AND uid = ?'
    const params = [id, uid]
    connectQuery(sqlStr, params, success, error)
}

/**
 * 插入（新建）文章
 * */
export function addRecord (
    options: AddRecordOptions,
    success: (result: any) => void,
    error: (err: Query.QueryError) => void
) {
    const { title, tag, introduce, content, cover, music, musicName } = options
    const sqlStr = 'INSERT INTO records (`uid`, `title`, `content`, `introduce`, `views`, `tag`, `cover`, `music`, `musicName`, `ctime`, `utime`, `is_delete`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const ctime = new Date().getTime()
    const uid = uuid()
    const params = [uid, title, content, introduce, 10, tag, cover, music, musicName, ctime, ctime, 0]
    connectQuery(sqlStr, params, success, error)
}

/**
 * 修改（更新）文章信息
 * */
export function updateRecord (
    options: UpdateRecordOptions,
    success: (result: any) => void,
    error: (err: Query.QueryError) => void
) {
    // 四种情况:
    // 1. 修改 is_delete —— 文章显示与否；
    // 2. 修改 views —— 文章访问量；
    // 3. 修改 liked —— 文章点赞(喜欢)量；
    // 4. 修改文章详情内容（title, tag, introduce, content, cover）
    const { sqlStr, params } = getUpdateRecordParams(options)
    connectQuery(sqlStr, params, success, error)
}

/**
 * 删除文章 (真删除)
 * */
export function deleteRecord (
    options: RecordIdOptions,
    success: (result: any) => void,
    error: (err: Query.QueryError) => void
) {
    const { id, uid } = options
    const sqlStr = 'DELETE FROM records WHERE id = ? and uid = ?'
    const params = [id, uid]
    connectQuery(sqlStr, params, success, error)
}

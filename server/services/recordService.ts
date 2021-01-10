import { connectQuery } from '../dao/DBUtil'
import { v4 as uuid } from 'uuid'
import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query'
import {
    QueryListOptions,
    RecordIdOptions,
    AddRecordOptions,
    UpdateRecordOptions
} from '../common/types'
import {getUpdateRecordParams} from "../utils/util";

/**
 * 分页查询文章列表
 * */
export function queryRecordList (options: QueryListOptions, success: (result: any) => void, error: (err: Query.QueryError) => void) {
    const { pageNo, pageSize } = options
    const params = [(pageNo - 1) * pageSize, pageSize]
    let sqlStr: string
    // 后台管理查询所有文章列表
    if (options.range && options.range === 'all') {
        sqlStr = 'SELECT id, uid, title, introduce, tag, views, cover, ctime, utime, is_delete FROM `records` ORDER BY ctime DESC LIMIT ?, ?'
    } else {
        // 前端展示未删除文章
        sqlStr = 'SELECT id, uid, title, introduce, tag, views, cover, ctime, utime FROM `records` WHERE is_delete = 0 ORDER BY ctime DESC LIMIT ?, ?'
    }
    connectQuery(sqlStr, params, success, error)
}

/**
 * 查询文章详情信息
 * */
export function queryRecordDetail (options: RecordIdOptions, success: (result: any) => void, error: (err: Query.QueryError) => void) {
    const { id, uid } = options
    const sqlStr = 'SELECT id, uid, title, introduce, content, tag, views, cover, ctime, utime FROM `records` WHERE id = ? and uid = ?'
    const params = [id, uid]
    connectQuery(sqlStr, params, success, error)
}

/**
 * 插入（新建）文章
 * */
export function addRecord (options: AddRecordOptions, success: (result: any) => void, error: (err: Query.QueryError) => void) {
    const { title, tag, introduce, content, cover } = options
    const sqlStr = 'INSERT INTO records (`uid`, `title`, `content`, `introduce`, `views`, `tag`, `cover`, `ctime`, `utime`, `is_delete`) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const ctime = new Date().getTime()
    const uid = uuid()
    const params = [uid, title, content, introduce, 10, tag, cover, ctime, ctime, 0]
    connectQuery(sqlStr, params, success, error)
}

/**
 * 修改（更新）文章信息
 * */
export function updateRecord (options: UpdateRecordOptions, success: (result: any) => void, error: (err: Query.QueryError) => void) {
    // 三种情况:
    // 1. 修改 is_delete —— 文章显示与否；
    // 2. 修改 views —— 文章访问量；
    // 3. 修改文章详情内容（title, tag, introduce, content, cover）
    const { sqlStr, params } = getUpdateRecordParams(options)
    connectQuery(sqlStr, params, success, error)
}

/**
 * 删除文章
 * */
export function deleteRecord (options: RecordIdOptions, success: (result: any) => void, error: (err: Query.QueryError) => void) {
    const { id, uid } = options
    const sqlStr = 'UPDATE records SET is_delete = 1 WHERE id = ? and uid = ?'
    const params = [id, uid]
    connectQuery(sqlStr, params, success, error)
}

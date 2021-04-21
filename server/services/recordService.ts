import {poolQuery, promisePoolQuery} from '../db/DBUtil'
import {getUpdateRecordParams, mapCreateTime} from '../utils/util'
import sendMail from '../utils/sendMail'
import {authorMailInfo} from '../common/definition'
import {queryAllSubscribe} from './subscribeService'
import {SendEmailType} from '../common/types'
import {v4 as uuid} from 'uuid'
import {
    IdOption,
    RecordItem,
    GetRecordListParams,
    AddRecordParams,
    UpdateRecordParams
} from '../common/types'

/**
 * sql 语句
 * */
const listSqlObj = {
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

interface QueryListOptions {
    listSqlStr: string
    listParams: ListParams
    totalSqlStr: string
    totalParams: string[]
}

/**
 * 获取分页查询 sql 语句及参数
 * */
function getQueryListParams(options: GetRecordListParams): QueryListOptions {
    const {pageNo, pageSize} = options
    let listParams: ListParams = [(pageNo - 1) * pageSize, pageSize] // 分页参数
    let listSqlStr: string
    let totalSqlStr: string
    let totalParams: string[] = []
    // 后台管理查询所有文章列表
    if (options.range === 'all') {
        listSqlStr = listSqlObj.allList
        totalSqlStr = listSqlObj.allTotal
        // 按 title 模糊查询
        if (options.title) {
            listSqlStr = listSqlObj.titleList
            listParams = [`%${options.title}%`, ...listParams]
            totalSqlStr = listSqlObj.titleTotal
            totalParams = [`%${options.title}%`]
        }
    } else if (options.index === 1) {
        // web 首页文章按 views 排序
        listSqlStr = listSqlObj.viewsList
        totalSqlStr = listSqlObj.showsTotal
    } else {
        // 前端展示未删除文章
        listSqlStr = listSqlObj.showsList
        totalSqlStr = listSqlObj.showsTotal
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
export async function queryRecordList(options: GetRecordListParams) {
    const {listSqlStr, listParams, totalSqlStr, totalParams} = getQueryListParams(options)

    try {
        const [list] = await promisePoolQuery(listSqlStr, listParams)
        const [totalRes] = await promisePoolQuery(totalSqlStr, totalParams)

        return {
            list: mapCreateTime(list as any[]),
            // @ts-ignore
            total: totalRes.length ? totalRes[0].total : 0
        }
    } catch (err) {
        return err
    }
}

/**
 * 查询文章详情信息
 * */
export function queryRecordDetail(options: IdOption) {
    const {id, uid} = options
    const sqlStr = 'SELECT id, uid, title, introduce, content, tag, views, liked, cover, music, ctime, utime FROM `tbl_records` WHERE id = ? AND uid = ?;'
    const params = [id, uid]

    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, params)
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
function updateViews(info: RecordItem) {
    const {id, uid, views} = info
    // then nothing to do
    updateRecord({id, uid, views: views + 1})
        .then(() => undefined)
        .catch(() => undefined)
}

/**
 * 插入（新建）文章
 * */
export function addRecord(options: AddRecordParams) {
    const {title, tag, introduce, content, cover, music} = options
    const sqlStr = 'INSERT INTO `tbl_records` (uid, title, content, introduce, tag, cover, music, ctime, utime, views, liked, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
    const ctime = Date.now()
    const uid = uuid()
    const params = [uid, title, content, introduce, tag, cover, music, ctime, ctime, 10, 1, 0]
    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, params)
            .then((result: any) => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

interface EmailItemResult {
    email: string
}
/**
 * 发送发布文章通知 type: 2
 * @param {*} origin 网站路径（因为没去再查一遍，取不到文章 id，指向网站首页即可）
 * @param {*} title 文章标题
 * */
export function sendNotification(origin: string, title: string) {
    return new Promise((resolve, reject) => {
        // 查询已订阅邮箱 email
        queryAllSubscribe().then((res: any) => {
            const emailList = res.map((item: EmailItemResult) => item.email);
            const data = {
                url: origin,
                email: emailList,
                title
            }
            // TODO => 发送邮件 type: 2 （新文章通知）
            sendMail(SendEmailType.ADD_RECORD, data, authorMailInfo)
                .then(() => {
                    resolve({
                        message: 'Successfully sent the new article notification'
                    })
                })
                .catch(err => {
                    reject({
                        message: 'Something went wrong when posting the new article notification',
                        error: err
                    })
                })
        })
        .catch(err => {
            reject({
                message: 'Something went wrong when querying the subscription email',
                error: err
            })
        })
    })
}

/**
 * 修改（更新）文章信息
 * */
export function updateRecord(options: UpdateRecordParams) {
    // 四种情况:
    // 1. 修改 is_delete —— 文章显示与否；
    // 2. 修改 views —— 文章访问量；
    // 3. 修改 liked —— 文章点赞(喜欢)量； <暂时未做>
    // 4. 修改文章详情内容（title, tag, introduce, content, cover...）
    const {sqlStr, params} = getUpdateRecordParams(options)
    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, params)
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 删除文章 (真删除)
 * then => delete cover
 * */
export function deleteRecord(options: IdOption) {
    const {id, uid} = options
    const sqlStr = 'DELETE FROM `tbl_records` WHERE id = ? and uid = ?;'
    const params = [id, uid]
    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, params)
            .then((result: any) => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

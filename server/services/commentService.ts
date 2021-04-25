import {poolQuery} from '../db/DBUtil'
import {getTableDeleteSqlStr} from '../utils/util'
import {v4 as uuid} from 'uuid'
import {IdList, PageQueryParams, AddCommentParams} from '../common/types'
import {authorMailInfo} from '../common/definition'

interface QueryCommentsParams {
    articleId: number
}

/**
 * 分页查询评论信息（web）
 * */
export function getRecordComment(options: QueryCommentsParams) {
    const {articleId} = options
    // 按评论时间升序排序
    const sqlStr = `SELECT id, uid, record_id as recordId, topic_id as topicId, parent_id as parentId,
        from_name as fromName, from_email as fromEmail, to_name as toName, to_email as toEmail, content, ctime
        FROM tbl_comments WHERE record_id = ? ORDER BY ctime;`
    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, [articleId])
            .then((result: any) => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 查询所有评论（sys）
 * */
export function getAllComments(options: PageQueryParams) {
    const {pageNo, pageSize} = options
    const params = [(pageNo - 1) * pageSize, pageSize] // 分页参数
    const listStr = `
        SELECT c.id, c.uid, c.content, c.record_id as recordId, c.topic_id as topicId, c.parent_id as parentId,
        c.from_name as fromName, c.from_email as fromEmail, c.to_name as toName, c.to_email as toEmail,
        c.is_read as isRead, c.ctime, r.title FROM tbl_comments as c
        LEFT JOIN tbl_records as r ON r.id = c.record_id ORDER BY ctime DESC LIMIT ?, ?;
    `
    const totalStr = 'SELECT COUNT(id) as total FROM `tbl_comments`'

    const listPro = poolQuery(listStr, params)
    const totalPro = poolQuery(totalStr, [])

    return new Promise((resolve, reject) => {

        Promise.all([listPro, totalPro])
            .then(([listRes, totalRes]) => {
                resolve({
                    list: listRes,
                    /* @ts-ignore */
                    total: totalRes.length ? totalRes[0].total : 0
                })
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 新增评论信息 / 回复评论
 * */
export function addComment(options: AddCommentParams) {
    const {articleId, parentId, comment, fromEmail, fromName, topicId} = options
    const toName = options.toName ? options.toName : authorMailInfo.name
    const toEmail = options.toEmail ? options.toEmail : authorMailInfo.user
    const uid = uuid()
    const ctime = Date.now()
    const newTopicId = topicId === null ? uid : topicId
    const sqlStr = 'INSERT INTO `tbl_comments` (uid, record_id, parent_id, content, topic_id, from_name, from_email, ctime, to_name, to_email, is_read) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
    const params = [uid, articleId, parentId, comment, newTopicId, fromName, fromEmail, ctime, toName, toEmail, 0]

    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, params)
            .then(() => {
                resolve('Successfully posted a comment!')
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 更新评论内容
 * 1. => 已读状态
 * TODO 2. 已回复状态
 * TODO 3. 更新评论内容
 * */
export function updateComment() {

}

type DeleteCommentParams = {
    id?: number
    parentId?: number | null
} & { ids?: number[] }

/**
 * 删除评论
 * */
export function deleteComments(options: DeleteCommentParams) {
    let sqlStr: string = ''
    let params: any[] = []
    // parentId 为 null，删除一级评论（其子评论删除）
    if (options.parentId === null) {
        sqlStr = 'DELETE FROM `tbl_comments` WHERE id = ? OR parent_id = ?;'
        params = [options.id, options.id]
    }

    return new Promise((resolve, reject) => {
        // const {ids} = options
        // const sqlStr = getDeleteSqlStr(ids)
        // poolQuery(sqlStr, ids)
        //     .then(() => {
        //         resolve('')
        //     })
        //     .catch(err => {
        //         reject(err)
        //     })
    })
}

function getDeleteSqlStr(ids: number[]): string {
    switch (ids.length) {
        case 0:
            return ''
        case 1:
            return 'DELETE FROM `tbl_comments` WHERE id = ?;'
        default:
            return getTableDeleteSqlStr(ids, '`tbl_comments`', 'id')
    }
}

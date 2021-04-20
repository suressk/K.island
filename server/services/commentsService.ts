import {poolQuery} from '../db/DBUtil'
import {getTableDeleteSqlStr} from '../utils/util'
import {v4 as uuid} from 'uuid'

interface QueryCommentsParams {
    articleId: number
}

interface DeleteCommentsParams {
    ids: number[]
}

/**
 * 分页查询评论信息（前端页面）
 * */
export function getCommentList(options: QueryCommentsParams) {
    const {articleId} = options
    const sqlStr = 'SELECT c.*, r.title FROM `tbl_comments` as c LEFT JOIN `tbl_records` as r ON r.id = c.record_id WHERE c.record_id = ?;'
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
 * TODO 后台管理页面查询评论（两种方案）
 *
 * 1. 查询文章评论和回复我的评论
 * 2. 查询所有评论
 * */

interface AddCommentOption {
    articleId: number /* 文章 id */
    parentId: number | null /* 评论对象 这条评论记录的 id */
    comment: string /* 评论内容 */
    name: string /* 当前评论者 nickname */
    email: string /* 当前评论者 email */
    topicId: string /* 话题 id => 分组标识 */
    to?: string /* TODO 评论对象的 email （待定） */
}

/**
 * 新增评论信息
 * */
export function addComment(options: AddCommentOption) {
    const {articleId, parentId, comment, name, email, topicId} = options
    const uid = uuid()
    const ctime = Date.now()
    const newTopicId = topicId === null ? uid : topicId
    const sqlStr = 'INSERT INTO `tbl_comments` (uid, record_id, parent_id, content, topic_id, name, email, ctime) VALUES (?, ?, ?, ?, ?, ?, ?, ?);'
    const params = [uid, articleId, parentId, comment, newTopicId, name, email, ctime]
    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, params)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 删除评论
 * */
export function deleteComments(options: DeleteCommentsParams) {
    return new Promise((resolve, reject) => {
        const {ids} = options
        const sqlStr = getDeleteSqlStr(ids)
        poolQuery(sqlStr, ids)
            .then(() => {
                resolve('')
            }).catch(err => {
                reject(err)
            })
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

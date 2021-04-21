import {poolQuery} from '../db/DBUtil'
import {getTableDeleteSqlStr} from '../utils/util'
import {v4 as uuid} from 'uuid'
import {IdList} from '../common/types'
import {authorMailInfo} from '../common/definition'

interface QueryCommentsParams {
    articleId: number
}

/**
 * 分页查询评论信息（前端页面）
 * */
export function getRecordComment(options: QueryCommentsParams) {
    const {articleId} = options
    // const sqlStr = 'SELECT c.*, r.title FROM `tbl_comments` as c LEFT JOIN `tbl_records` as r ON r.id = c.record_id WHERE c.record_id = ?;'
    const sqlStr = 'SELECT * FROM `tbl_comments` WHERE record_id = ?;'
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
 * 查询所有评论
 * */
export function getAllComments() {}


interface AddCommentOption {
    articleId: number /* 文章 id */
    parentId: number | null /* 评论对象 这条评论记录的 id */
    comment: string /* 评论内容 */
    fromName: string /* 当前评论者 nickname */
    fromEmail: string /* 当前评论者 email */
    topicId: string /* 话题 id => 分组标识 */
    toName?: string /* TODO 评论对象的 name （待定） */
    toEmail?: string /* TODO 评论对象的 email （待定） */
}

/**
 * 新增评论信息 / 回复评论
 * */
export function addComment(options: AddCommentOption) {
    const {articleId, parentId, comment, fromEmail, fromName, topicId} = options
    const toName = options.toName ? options.toName : authorMailInfo.user
    const toEmail = options.toEmail ? options.toName : authorMailInfo.name
    const uid = uuid()
    const ctime = Date.now()
    const newTopicId = topicId === null ? uid : topicId
    const sqlStr = 'INSERT INTO `tbl_comments` (uid, record_id, parent_id, content, topic_id, from_name, from_email, ctime, to_name, to_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
    const params = [uid, articleId, parentId, comment, newTopicId, fromName, fromEmail, ctime, toName, toEmail]

    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, params)
            .then(() => {
                // 评论成功，返回文章基本信息
                resolve('Successfully added a comment!')
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 删除评论
 * */
export function deleteComments(options: IdList) {
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

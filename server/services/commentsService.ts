import { poolQuery } from '../dao/DBUtil'
import { getTableDeleteSqlStr } from '../utils/util'
import { v4 as uuid } from 'uuid'

interface QueryCommentsParams {
    articleId: number
}

interface DeleteCommentsParams {
    ids: number[]
}

/**
 * 分页查询评论信息
 * */
export function getCommentList(options: QueryCommentsParams) {
    const { articleId } = options
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

interface AddCommentOption {
    articleId: number
    parentId: number | null /*  */
    comment: string /* 评论内容 */
    name: string
    email: string
    topicId: string
}
/**
 * 新增评论信息
 * */
export function addComment(options: AddCommentOption) {
    const {articleId, parentId, comment, name, email, topicId} = options
    const uid = uuid()
    const ctime = Date.now()
    const newTopicId = topicId === null ? uuid() : topicId
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
        const { ids } = options
        const sqlStr = getDeleteSqlStr(ids)
        poolQuery(sqlStr, ids)
            .then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
    })
}

function getDeleteSqlStr(ids: number[]): string {
    const len = ids.length
    switch (len) {
        case 0:
            return ''
        case 1:
            return 'DELETE FROM `tbl_comments` WHERE id = ?;'
        default:
            return getTableDeleteSqlStr(ids, '`tbl_comments`', 'id')
    }
}

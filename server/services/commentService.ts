import {poolQuery} from '../db/DBUtil'
import {v4 as uuid} from 'uuid'
import {IdList, PageQueryParams, AddCommentParams} from '../common/types'
import {authorMailInfo} from '../common/definition'

interface QueryCommentsParams {
    articleId: number
}

type DeleteArticleCommentParams = QueryCommentsParams

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
        SELECT c.id, c.uid, c.content, c.record_id as articleId, c.uid as articleUid, c.topic_id as topicId, c.parent_id as parentId,
        c.from_name as fromName, c.from_email as fromEmail, c.to_name as toName, c.to_email as toEmail,
        c.is_read as isRead, c.ctime, r.title FROM tbl_comments as c
        LEFT JOIN tbl_records as r ON r.id = c.record_id ORDER BY  isRead, ctime DESC LIMIT ?, ?;
    `
    const totalStr = 'SELECT COUNT(id) as total FROM `tbl_comments`;'
    const unreadTotal = 'SELECT COUNT(is_read) as total FROM `tbl_comments` WHERE is_read = 0 AND to_email = ?;'

    const listPro = poolQuery(listStr, params)
    const listTotalPro = poolQuery(totalStr, [])
    const unreadPro = poolQuery(unreadTotal, [authorMailInfo.user])

    return new Promise((resolve, reject) => {

        Promise.all([listPro, listTotalPro, unreadPro])
            .then(([listRes, totalRes, unreadRes]) => {
                resolve({
                    list: listRes || [],
                    /* @ts-ignore */
                    total: totalRes.length ? totalRes[0].total : (listRes.length || 0),
                    /* @ts-ignore */
                    unread: unreadRes.length ? unreadRes[0].total : 0
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

    const isRead = toEmail === authorMailInfo.user ? 0 : 1

    const sqlStr = 'INSERT INTO `tbl_comments` (uid, record_id, parent_id, content, topic_id, from_name, from_email, ctime, to_name, to_email, is_read) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
    const params = [uid, articleId, parentId, comment, newTopicId, fromName, fromEmail, ctime, toName, toEmail, isRead]

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


function getIdsStr(ids: number[]) {
    const arr: string[] = []
    arr.length = ids.length
    arr.fill('?')
    return arr.join(',')
}

/**
 * 更新评论内容
 * 1. => 已读状态
 * TODO 2. 更新评论内容（弃）
 * */
export function readComments (options: IdList) {
    const str = getIdsStr(options.ids)
    const sqlStr = 'UPDATE `tbl_comments` SET is_read = 1 WHERE id IN (' + str + ');'
    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, options.ids)
            .then(() => {
                resolve('Successfully updated as read!')
            })
            .catch(err => {
                reject(err)
            })
    })
}

type DeleteCommentParams = {
    id: number
    parentId: number | null
}

/**
 * 删除评论
 * */
export function deleteComments(options: DeleteCommentParams) {

    const {sqlStr, params} = getDeleteCommentsProps(options)

    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, params)
            .then(() => {
                resolve('Successfully deleted comment!')
            })
            .catch(err => {
                reject({
                    message: 'Failed to delete the article comments!',
                    error: err
                })
            })
    })
}

function getDeleteCommentsProps(options: DeleteCommentParams) {
    if (options.parentId === null) {
        // parentId 为 null，即为删除一级评论（直接评论文章的评论） => 删除评论本身及所有子级评论
        return {
            sqlStr: 'DELETE FROM `tbl_comments` WHERE id = ? OR parent_id = ?;',
            params: [options.id, options.id]
        }
    } else {
        // parentId 有值（即删除子级评论，则直接删除当前 id 的评论）
        return {
            sqlStr: 'DELETE FROM `tbl_comments` WHERE id = ?;',
            params: [options.id]
        }
    }
    /**
     * TODO 考虑到多条删除的麻烦性（暂不提供多条删除功能）
     * TODO 要考虑传的 ids 需要去查询是一级还是二级评论
     * TODO 一级则要去遍历查询其子评论然后删除所有子级评论
     * */
    // if (options.ids) {
    //
    // }
    // switch (ids.length) {
    //     case 0:
    //         return ''
    //     case 1:
    //         return 'DELETE FROM `tbl_comments` WHERE id = ?;'
    //     default:
    //         return getTableDeleteSqlStr(ids, '`tbl_comments`', 'id')
    // }
}

export function deleteCommentsByArticleId(articleId: number) {
    const sqlStr = 'DELETE FROM `tbl_comments` WHERE record_id = ?;'
    return new Promise((resolve, reject) => {
        poolQuery(sqlStr, [articleId])
            .then(() => {
                resolve('Successfully deleted the article comments!')
            })
            .catch(err => {
                reject({
                    message: 'Failed to delete the article comments!',
                    error: err
                })
            })
    })
}

import {connectQueryPro} from '../dao/DBUtil'

interface QueryCommentsParams {
    articleId: number

}

interface DeleteCommentsParams {
    ids: number[]
}
/**
 * 分页查询评论信息
 * */
export function getCommentList(
    options: QueryCommentsParams
) {
    const sqlStr = 'SELECT comment.*, record.title FROM `comment` LEFT JOIN `record` ON record.id = comment.articleId;'
}

/**
 * 新增评论信息
 * */
export function addComment() {}



/**
 * 删除评论
 * */
export function deleteComments(options: DeleteCommentsParams) {
    return new Promise((resolve, reject) => {
        const { ids } = options
        const sqlStr = getDeleteSqlStr(ids)
        connectQueryPro(sqlStr, ids)
            .then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
    })
}

type SqlStr = string

function getDeleteSqlStr(ids: number[]): SqlStr {
    const len = ids.length
    switch (len) {
        case 0:
            return ''
        case 1:
            return 'DELETE FROM `comments` WHERE id = ?'
        default:
            const arr: string[] = []
            arr.length = ids.length
            arr.fill('?')
            let sqlStr = 'DELETE FROM `comments` WHERE id IN ('
            const str = arr.join(',')
            sqlStr += str + ')'
            return sqlStr
    }
}

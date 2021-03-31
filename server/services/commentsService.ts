import { connectQueryPro } from '../dao/DBUtil'

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
        connectQueryPro(sqlStr, [articleId])
            .then((result: any) => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
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

function getDeleteSqlStr(ids: number[]): string {
    const len = ids.length
    switch (len) {
        case 0:
            return ''
        case 1:
            return 'DELETE FROM `tbl_comments` WHERE id = ?;'
        default:
            const arr: string[] = []
            arr.length = ids.length
            arr.fill('?')
            let sqlStr = 'DELETE FROM `tbl_comments` WHERE id IN ('
            const str = arr.join(',')
            sqlStr += str + ');'
            return sqlStr
    }
}

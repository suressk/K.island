import {connectQueryPro} from '../dao/DBUtil'

/**
 * 分页查询评论信息
 * */
export function getCommentList() {}

/**
 * 新增评论信息
 * */
export function addComment() {}




interface DeleteCommentsParams {
    ids: number[]
}
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

import {poolQuery} from '../db/DBUtil'
import {authorMailInfo} from '../common/definition'

/**
 * 概览数据：
 * 1. 文章总数 total
 * 2. 最新文章发布时间 ctime
 * 3. 评论文章或回复我的未读评论数 unread
 * 4. 评论文章或回复我的总数
 * TODO 5. 不同类别文章数（统计）
 * */
export function getOverviewData() {
    // 文章总数（total） + 最新文章发布时间（ctime）
    // 'SELECT COUNT(id) AS total, ctime FROM tbl_records ORDER BY ctime DESC LIMIT 0, 1;'

    // unread comments（评论文章或回复我的未读评论数）
    // 'SELECT COUNT(is_read) as unread FROM `tbl_comments` WHERE is_read = 0 AND to_email = ?;'
    // SELECT COUNT(id) as total, (SELECT COUNT(id) as unread FROM `tbl_comments` WHERE is_read = 0 AND to_email = ?) as unread FROM `tbl_comments` WHERE to_email = ?;

    const articleStr = 'SELECT COUNT(id) AS total, ctime FROM `tbl_records` ORDER BY ctime DESC LIMIT 0, 1;'
    const unreadStr = 'SELECT COUNT(id) as comments, (SELECT COUNT(id) as unread FROM `tbl_comments` WHERE is_read = 0 AND to_email = ?) as unread FROM `tbl_comments` WHERE to_email = ?;'

    const {user} = authorMailInfo

    const articlePro = poolQuery(articleStr, [])
    const unreadPro = poolQuery(unreadStr, [user, user])

    return new Promise((resolve, reject) => {
        Promise.all([articlePro, unreadPro])
            .then(([articleRes, unreadRes]) => {
                resolve({
                    /* @ts-ignore */
                    total: articleRes.length ? articleRes[0].total : 0,
                    /* @ts-ignore */
                    ctime: articleRes.length ? articleRes[0].ctime : 0,
                    /* @ts-ignore */
                    unread: unreadRes.length ? unreadRes[0].unread : 0,
                    /* @ts-ignore */
                    comments: unreadRes.length ? unreadRes[0].comments : 0
                })
            })
            .catch(error => {
                reject({
                    status: 500,
                    message: 'Overview data query failed',
                    error
                })
            })
    })
}
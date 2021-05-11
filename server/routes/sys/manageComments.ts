import express from 'express'
import {SendEmailType} from '../../common/subscribeTypes'
import {authEmail, authorMailInfo, origin} from '../../common/definition'
import sendMail from '../../utils/sendMail'
import {writeHead, writeResult} from '../../utils/writeResponse'
import {getAllComments, deleteComments, readComments, addComment} from '../../services/commentService'

const router = express.Router()

/**
 * 查询所有评论列表
 * */
router.get('/list', (req, res) => {
    const {pageNo, pageSize} = req.query
    getAllComments({
        pageNo: Number(pageNo),
        pageSize: Number(pageSize)
    }).then((result: any) => {
        writeHead(res, 200)
        writeResult(res, true, 'Successfully queried the comment list', result)
    }).catch(error => {
        writeHead(res, 500)
        writeResult(res, false, 'Comment fetching failed', error)
    })
})

/**
 * 更新评论（标记为已读）
 * */
router.put('/read', (req, res) => {
    const ids = req.body.ids as number[]
    if (ids.length === 0) {
        writeHead(res, 416)
        writeResult(res, false, "The parameter of 'ids' is a empty Array")
        return
    }
    readComments({ids})
        .then(() => {
            writeHead(res, 200)
            writeResult(res, true, 'Successfully read these comment')
        })
        .catch(error => {
            writeHead(res, 500)
            writeResult(res, false, 'Failed to read these comment', error)
        })
})

/**
 * 回复评论
 * */
router.post('/reply', (req, res) => {
    try {
        const {
            toName,
            toEmail,
            topicId,
            parentId,
            comment,
            articleId,
            articleUid,
            articleTitle,
            id,
            isRead
        } = req.body
        
        const replyPro = addComment({
            fromName: authorMailInfo.name,
            fromEmail: authorMailInfo.user,
            toName,
            toEmail,
            topicId,
            parentId,
            comment,
            articleId
        })

        replyPro.then(() => {
            // 自己回复自己的（也存在这情况），不发送回复信息邮件
            if (!toEmail || toEmail === authEmail.qq || toEmail === authEmail.outlook) {
                writeHead(res, 200)
                writeResult(res, true, 'Successfully replied the comment')
                return
            }

            const info = {
                name: toName,
                title: articleTitle,
                email: toEmail,
                url: `${origin}/article/${articleUid}_${articleId}`
            }

            const mailPro = sendMail(SendEmailType.ADD_COMMENT, info, authorMailInfo)

            if (isRead === 1) {
                mailPro.then(() => {
                    writeHead(res, 200)
                    writeResult(res, true, 'Successfully replied to the comment and sent the notify email')
                }).catch(error => {
                    writeHead(res, 200)
                    writeResult(res, false, 'Successfully replied to the comment, but failed to send the notify email', error)
                })
                return
            }

            // update the unread comment
            const readPro = readComments({ids: [id]})

            Promise.all([mailPro, readPro])
                .then(([mailRes, readRes]) => {
                    writeHead(res, 200)
                    writeResult(res, true, 'Successfully replied to the comment and sent the notify email')
                })
                .catch(error => {
                    writeHead(res, 200)
                    writeResult(res, false, 'Successfully replied to the comment, but...', error)
                })
        })
        .catch(err => {
            writeHead(res, 500)
            writeResult(res, false, 'Something wrong with replying to a comment', err)
        })
    } catch (error) {
        writeHead(res, 500)
        writeResult(res, false, 'Failed to reply to the comment', error)
    }
})

/**
 * 删除评论（只支持单条评论删除 => 删除一级评论可连带删除其所有子评论）
 * */
router.delete('/delete', (req, res) => {
    const id: number = req.body.id
    const parentId: number | null = req.body.parentId
    deleteComments({id, parentId})
        .then(() => {
            writeHead(res, 200)
            writeResult(res, true, 'Successfully deleted the comment', {})
        })
        .catch(error => {
            writeHead(res, 500)
            writeResult(res, false, 'Failed to delete the comment', error)
        })
})

export default router

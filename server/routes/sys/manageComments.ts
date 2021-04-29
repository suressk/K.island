import express from 'express'
import {SendEmailType} from '../../common/subscribeTypes'
import {authEmail, authorMailInfo, origin} from '../../common/definition'
import sendMail from '../../utils/sendMail'
import {writeHead, writeResult} from '../../utils/writeResponse'
import {getAllComments, deleteComments, updateComment, addComment} from '../../services/commentService'

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
        writeResult(res, true, 'Query the comment list successfully', result)
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
    updateComment({ids})
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
            articleTitle
        } = req.body

        addComment({
            fromName: authorMailInfo.name,
            fromEmail: authorMailInfo.user,
            toName,
            toEmail,
            topicId,
            parentId,
            comment,
            articleId
        }).then(() => {
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

            sendMail(SendEmailType.ADD_COMMENT, info, authorMailInfo)
                .then(() => {
                    writeHead(res, 200)
                    writeResult(res, true, 'Successfully replied the comment and sent the notify email')
                })
                .catch(error => {
                    writeHead(res, 200)
                    writeResult(res, true, 'Successfully replied the comment, but failed to send the notify email', error)
                })
        })
        .catch(err => {
            writeHead(res, 500)
            writeResult(res, false, 'Something wrong with posting a comment', err)
        })
    } catch (error) {
        writeHead(res, 500)
        writeResult(res, false, 'Failed to reply', error)
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

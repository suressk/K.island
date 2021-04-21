import express from 'express'
import {addComment} from '../../services/commentService'
import {writeHead, writeResult} from '../../utils/writeResponse'
import sendMail from '../../utils/sendMail'
import {SendEmailType} from '../../common/types'
import {authorMailInfo} from '../../common/definition'

const router = express.Router()

/**
 * 评论文章 / 回复评论
 * */
router.post('/add', (req, res) => {
    try {
        const {
            fromName,
            fromEmail,
            toName,
            toEmail,
            articleId,
            topicId,
            parentId,
            comment,
            articleUid,
            articleTitle
        } = req.body
        console.log('Request Body: ', fromName, fromEmail, articleId, topicId, parentId, comment)
        addComment({
            fromName,
            fromEmail,
            toName,
            toEmail,
            articleId,
            topicId,
            parentId,
            comment
        }).then(() => {
            writeHead(res, 200)
            writeResult(res, true, 'Congratulations！You have posted a comment')
            // 评论文章或者回复 小K. 的，不发送回复信息邮件
            if (toEmail === authorMailInfo.user) return

            const info = {
                name: toName,
                title: articleTitle,
                url: `${req.headers.origin}/article/${articleUid}_${articleId}` /* 邮件跳转文章详情页 */
            }
            sendMail(SendEmailType.ADD_COMMENT, info, authorMailInfo)
                .then(res => {
                    console.dir(res)
                    console.log('邮件发送成功!')
                })
        }).catch(err => {
            writeHead(res, 500)
            writeResult(res, false, 'Something wrong with adding a comment', err)
        })
    } catch (error) {
        writeHead(res, 500)
        writeResult(res, false, 'Something wrong', error)
    }
})

export default router

import express from 'express'
import { addComment } from '../../services/commentsService'
import {writeHead, writeResult} from "../../utils/writeResponse";

const router = express.Router()

/**
 * 评论文章 / 回复评论
 * */
router.post('/add', (req, res) => {
    // const name = req.body.name
    // const email = req.body.email
    try {
        const { name, email, articleId, topicId, parentId, comment } = req.body
        console.log('Request Body: ', name, email, articleId, topicId, parentId, comment)
        addComment({
            name,
            email,
            articleId,
            topicId,
            parentId,
            comment
        }).then(() => {
            writeHead(res, 200)
            writeResult(res, true, 'Congratulations！You have posted a comment')
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

import express from 'express'
import {getAllComments, deleteComments} from '../../services/commentService'
import {writeHead, writeResult} from "../../utils/writeResponse";

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
 * 更新评论已读
 * */
router.put('/update', (req, res) => {

})

/**
 * 删除评论
 * */
router.delete('/delete', (req, res) => {
    const ids = req.body.ids
    deleteComments({ids})
        .then(() => {
            writeHead(res, 200)
            writeResult(res, true, 'Successfully deleted', {})
        })
        .catch(error => {
            writeHead(res, 500)
            writeResult(res, false, 'Failed to delete', error)
        })
})

export default router

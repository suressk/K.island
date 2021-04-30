import express from 'express'
import {deleteSubscribes, querySubscribeList} from '../../services/subscribeService'
import {writeHead, writeResult} from '../../utils/writeResponse'

const router = express.Router()

/**
 * 查询所有评论列表
 * (可通过 email 精确匹配，模糊查询)
 * */
router.get('/list', (req, res) => {
    const {pageNo, pageSize, email} = req.query

    querySubscribeList({
        pageNo: Number(pageNo),
        pageSize: Number(pageSize),
        email: email ? `%${email}%` : '%%'
    }).then((result: any) => {
        writeHead(res, 200)
        writeResult(res, true, 'Successfully queried the subscriptions！', result)
    }).catch(error => {
        writeHead(res, 500)
        writeResult(res, false, 'Something wrong with querying the subscriptions！', error)
    })
})

/**
 * 删除订阅信息
 * */
router.delete('/delete', (req, res) => {
    // const id = req.body.id as number
    // const email = req.body.email as string

    const ids = req.body.ids as number[]

    deleteSubscribes({
        ids
    }).then(() => {
        writeHead(res, 200)
        writeResult(res, true, `Successfully deleted the subscriptions！`)
    }).catch(error => {
        writeHead(res, 500)
        writeResult(res, false, 'Something wrong with deleting the subscriptions！', error)
    })
})

export default router

import express from 'express'
import {querySubscribeList} from '../../services/subscribeService'// , deleteSubscribe
import {writeHead, writeResult} from '../../utils/writeResponse'

const router = express.Router()

/**
 * 后台管理订阅信息
 * */

/**
 * 查询订阅信息列表
 * */
router.get('/list', (req, res) => {
    // @ts-ignore
    querySubscribeList(req.query)
        .then((result: any) => {
            writeHead(res, 200)
            writeResult(res, true, '订阅信息列表查询成功！', {
                list: result.list,
                total: result.total
            })
        }).catch(error => {
            writeHead(res, 200)
            writeResult(res, false, '订阅信息列表查询失败咯！', error)
        })
})

/**
 * 删除订阅信息
 * */
router.delete('/delete', (req, res) => {
    console.log('delete subscribe query: ', req.query)
    console.log('delete subscribe body: ', req.body)
    const email = req.query.email as string
    writeHead(res, 200)
    writeResult(res, true, `${email} successfully deleted`)
    // deleteSubscribe({
    //     id: 1,
    //     email
    // }).then(() => {
    //     writeHead(res, 200)
    //     writeResult(res, true, `${email} successfully deleted`)
    // }).catch(error => {
    //     writeHead(res, 500)
    //     writeResult(res, false, `${email} deletion failed`, error)
    // })
})

export default router

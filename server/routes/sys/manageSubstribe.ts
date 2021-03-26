/**
 * 后台管理系统端
 * */
import express from 'express'
import { verifyTokenResponse } from '../../utils/util'
import { querySubscribeList } from '../../services/subscribeService'
import {writeHead, writeResult} from '../../utils/writeResponse'

const router = express.Router()

/**
 * 查询订阅信息列表
 * */
router.get('/list', (req, res) => {
    // verifyTokenResponse(req, res, () => {
    // })
    // @ts-ignore
    querySubscribeList(req.query, result => {
        writeHead(res, 200)
        res.write(writeResult(true, '订阅信息列表查询成功！', { list: result }))
        res.end()
    }, error => {
        writeHead(res, 200)
        res.write(writeResult(false, '订阅信息列表查询失败咯！', error))
        res.end()
    })
})

/**
 * 删除订阅信息
 * */
router.delete('/delete', (req, res) => {

})

export default router

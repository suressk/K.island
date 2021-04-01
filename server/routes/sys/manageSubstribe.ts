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
    // @ts-ignore
    querySubscribeList(req.query)
        .then(result => {
            writeHead(res, 200)
            writeResult(res, true, '订阅信息列表查询成功！', { list: result })
        }).catch(error => {
            writeHead(res, 200)
            writeResult(res, false, '订阅信息列表查询失败咯！', error)
        })
})

/**
 * 删除订阅信息
 * */
router.delete('/delete', (req, res) => {

})

export default router

/**
 * 后台管理系统端
 * */
import express from 'express'
import { verifyTokenResponse } from '../../utils/util'
import { querySubscribeList } from '../../services/back/subscribeService'

const router = express.Router()

/**
 * 查询订阅信息列表
 * */
router.get('/list', (req, res) => {
    verifyTokenResponse(req, res, () => {
        // @ts-ignore
        querySubscribeList(req.query, result => {

        }, error => {

        })
    })
})

/**
 * 删除订阅信息
 * */
router.delete('/delete', (req, res) => {
    verifyTokenResponse(req, res, () => {

    })
})

export default router

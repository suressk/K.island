import express from 'express'
import { queryRecordListResp, queryRecordDetailResp } from '../recordResponse'

const router = express.Router()

// 请求文章列表
router.get('/list', (req, res) => {
    queryRecordListResp(req, res, undefined)
})

router.get('/detail', (req, res) => {
    queryRecordDetailResp(req, res)
})

export default router

import express from 'express'
import { recordListResponse, recordDetailResponse } from '../recordResponse'

const router = express.Router()

// 请求文章列表
router.get('/list', (req, res) => {
    recordListResponse(req, res, undefined)
})

router.get('/detail', (req, res) => {
    recordDetailResponse(req, res)
})

export default router

import express from 'express'
import { recordListResponse } from '../common'

const router = express.Router()

// 请求文章列表
router.get('/list', (req, res) => {
    recordListResponse(req, res, undefined)
})
// router.get('/detail', (req, res) => {})

export default router

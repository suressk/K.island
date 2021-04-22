import express from 'express'

const router = express.Router()

/**
 * 查询所有评论列表
 * (可通过 email 精确匹配，模糊查询)
 * */
router.get('/list', (req, res) => {

})

/**
 * 删除订阅信息
 * */
router.delete('/delete', (req, res) => {

})

export default router

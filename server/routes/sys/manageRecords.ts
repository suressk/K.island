import express from 'express'
import { addRecord, updateRecord, deleteRecord } from '../../services/recordService'
import { writeHead, writeResult } from '../../utils/writeResponse'
import { recordDetailResponse, recordListResponse } from '../common'
// import { verifyTokenResponse } from '../../utils/util'

const router = express.Router()

// 查询文章列表
router.get('/list', (req, res) => {
    recordListResponse(req, res, 'all')
    // verifyTokenResponse(req, res, () => {
    // })
})

// 查询文章详情
router.get('/detail', (req, res) => {
    recordDetailResponse(req, res)
    // verifyTokenResponse(req, res, () => {
    // })
})

// 新增文章
router.post('/add', (req, res) => {
    addRecord(req.body, result => {
        writeHead(res, 200)
        res.write(writeResult(true, 'Successfully added !', result))
        res.end()
    }, err => {
        writeHead(res, 500)
        res.write(writeResult(false, 'Fail to added !', err))
        res.end()
    })
    // verifyTokenResponse(req, res, () => {
    // })
})

// 修改文章详情
router.put('/update', (req, res) => {
    updateRecord(req.body, result => {
        writeHead(res, 200)
        res.write(writeResult(true, 'Successfully updated', result))
        res.end()
    }, err => {
        writeHead(res, 500)
        res.write(writeResult(false, '文章修改失败啦！', err))
        res.end()
    })
    // verifyTokenResponse(req, res, () => {
    // })
})

// 删除文章
router.delete('/delete', (req, res) => {
    deleteRecord(req.body, result => {
        writeHead(res, 200)
        res.write(writeResult(true, '文章删除成功！', result))
        res.end()
    }, err => {
        writeHead(res, 500)
        res.write(writeResult(false, '文章删除失败！', err))
        res.end()
    })
    // verifyTokenResponse(req, res, () => {
    // })
})

export default router

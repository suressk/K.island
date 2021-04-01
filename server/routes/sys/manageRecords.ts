import express from 'express'
import { addRecord, updateRecord, deleteRecord } from '../../services/recordService'
import { writeHead, writeResult } from '../../utils/writeResponse'
import { recordDetailResponse, recordListResponse } from '../common'

const router = express.Router()

/**
 * 查询文章列表
 * */
router.get('/list', (req, res) => {
    recordListResponse(req, res, 'all')
})

/**
 * 查询文章详情
 * */
router.get('/detail', (req, res) => {
    recordDetailResponse(req, res)
})

/**
 * 新增文章
 * */
router.post('/add', (req, res) => {
    addRecord(req.body)
        .then((result: any) => {
            writeHead(res, 200)
            writeResult(res, true, 'Successfully added', result)
        })
        .catch(err => {
            writeHead(res, 500)
            writeResult(res, false, 'Failed to add record', err)
        })
})

/**
 * 修改文章详情
 * */
router.put('/update', (req, res) => {
    updateRecord(req.body)
        .then((result: any) => {
            writeHead(res, 200)
            writeResult(res, true, 'Successfully updated', result)
        })
        .catch(err => {
            writeHead(res, 500)
            writeResult(res, false, 'Failed to update record', err)
        })
})

/**
 * 删除文章
 * */
router.delete('/delete', (req, res) => {
    deleteRecord(req.body)
        .then((result: any) => {
            writeHead(res, 200)
            writeResult(res, true, 'Successfully deleted', result)
        }).catch(err => {
            writeHead(res, 500)
            writeResult(res, false, 'Failed to delete the record', err)
        })
})

export default router

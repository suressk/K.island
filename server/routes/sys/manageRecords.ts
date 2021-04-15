import express from 'express'
import { addRecord, updateRecord, deleteRecord } from '../../services/recordService'
import { imageService } from '../../services/imageService'
import { writeHead, writeResult } from '../../utils/writeResponse'
import { recordDetailResponse, recordListResponse } from '../recordResponse'

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
        .then(() => {
            writeHead(res, 200)
            writeResult(res, true, 'Successfully added')
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
        .then(() => {
            writeHead(res, 200)
            writeResult(res, true, 'Successfully updated')
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
    const relativePath = req.body.relativePath
    const id = req.body.id
    const uid = req.body.uid

    const delCoverPro = new Promise((resolve, reject) => {
        imageService(relativePath)
            .then(() => {
                resolve('Successfully deleted the cover')
            })
            .catch(err => {
                if (err === 'not exist') {
                    reject({
                        message: "The cover doesn't exist",
                        error: {}
                    })
                } else {
                    reject({
                        message: err.message,
                        error: err
                    })
                }
            })
    })

    const delRecordPro = new Promise((resolve, reject) => {
        deleteRecord({ id, uid })
            .then(() => {
                resolve('Successfully deleted the record')
            }).catch(err => {
                reject({
                    message: 'Failed to delete the record',
                    error: err
                })
            })
    })

    Promise.all([delCoverPro, delRecordPro])
        .then(() => {
            writeHead(res, 200)
            writeResult(res, true, 'Successfully deleted the record and the cover')
        })
        .catch(err => {
            writeHead(res, 500)
            writeResult(res, false, err.message, err.error)
        })
})

export default router

import express from 'express'
import {addRecord, updateRecord, deleteRecord, sendNotification} from '../../services/recordService'
import {imageService} from '../../services/imageService'
import {writeHead, writeResult} from '../../utils/writeResponse'
import {queryRecordListResp, queryRecordDetailResp} from '../recordResponse'

const router = express.Router()

/**
 * 查询文章列表
 * */
router.get('/list', (req, res) => {
    queryRecordListResp(req, res, 'all')
})

/**
 * 查询文章详情
 * */
router.get('/detail', (req, res) => {
    queryRecordDetailResp(req, res)
})

/**
 * 新增文章
 * */
router.post('/add', (req, res) => {
    const addRecordPro = addRecord(req.body)

    // 新增文章失成功
    addRecordPro.then(() => {
        /**
         * 给订阅者发送通知
         * */
        sendNotification(req.headers.origin as string, req.body.title)
            .then((result: any) => {
                writeHead(res, 200)
                writeResult(res, true, 'Successfully added the article, ' + result.message)
            })
            .catch(err => {
                writeHead(res, 200)
                writeResult(res, true, 'Successfully added the article, ' + err.message, err)
            })
    })
    // 新增文章失败
    addRecordPro.catch(err => {
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
        deleteRecord({id, uid})
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

import express from 'express'
import {addRecord, updateRecord, deleteRecord, sendNotification} from '../../services/recordService'
import {uploadService} from '../../services/uploadService'
import {deleteCommentsByArticleId} from '../../services/commentService'
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

    // 新增文章成功
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
                writeResult(res, false, 'Successfully added the article, ' + err.message, err)
            })
    })
    // 新增文章失败
    addRecordPro.catch(err => {
        writeHead(res, 500)
        writeResult(res, false, 'Failed to add the record', err)
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
    const id = req.body.id as number
    const uid = req.body.uid

    const delCoverPro = new Promise((resolve, reject) => {
        uploadService(relativePath)
            .then(() => {
                resolve('Successfully deleted the cover.')
            })
            .catch(err => {
                if (err === 'not exist') {
                    resolve(`The cover doesn't exist, maybe you have deleted before.`)
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
                resolve('Successfully deleted the record.')
            }).catch(err => {
                reject({
                    message: 'Failed to delete the record.',
                    error: err
                })
            })
    })

    const delCommentsPro = deleteCommentsByArticleId(id)

    Promise.all([delCoverPro, delRecordPro, delCommentsPro])
        .then(([coverMsg, recordMsg, commentMsg]) => {
            writeHead(res, 200)
            writeResult(res, true, `${recordMsg} \r\n ${coverMsg} \r\n ${commentMsg}`)
        })
        .catch(err => {
            writeHead(res, 500)
            writeResult(res, false, err.message, err.error)
        })
})

export default router

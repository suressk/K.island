/**
 * admin 首页预览数据接口
 * */
import express from 'express'
import {getOverviewData} from '../../services/overviewService'
import {writeHead, writeResult} from '../../utils/writeResponse'

const router = express.Router()

/**
 * 首页概览数据
 * */
router.get('/view', (req, res) => {
    getOverviewData()
        .then((result: any) => {
            writeHead(res, 200)
            writeResult(res, true, 'Successfully querying overview data', result)
        })
        .catch(err => {
            writeHead(res, err.status)
            writeResult(res, false, err.message, err.error)
        })
})

export default router

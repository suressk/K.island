import { queryRecordDetail, queryRecordList } from '../services/recordService'
import { writeHead, writeResult } from '../utils/writeResponse'
import { Request, Response } from 'express'
import { mapCreateTime, mapYearGroup } from '../utils/util'

/**
 * res => article list
 * */
export function recordListResponse (req: Request, res: Response, range: string | undefined) {
    const { pageNo, pageSize } = req.query
    queryRecordList({
        pageNo: Number(pageNo),
        pageSize: Number(pageSize),
        range
    }, result => {
        // success
        writeHead(res, 200)
        res.write(writeResult(true, '查询成功！', {
            list: mapYearGroup(result.list),
            total: result.total
        }))
        res.end()
    }, err => {
        // fail
        writeHead(res, 500)
        res.write(writeResult(false, '文章列表查询失败', err))
        res.end()
    })
}

/**
 * res => article content detail
 * */
export function recordDetailResponse (req: Request, res: Response) {
    const { id, uid } = req.query
    if (typeof uid === 'string') {
        queryRecordDetail({
            id: Number(id),
            uid
        }, result => {
            writeHead(res, 200)
            res.write(writeResult(true, '查询成功！',  mapCreateTime(result)[0]))
            res.end()
        }, err => {
            writeHead(res, 500)
            res.write(writeResult(false, '文章详情查询失败！', err))
            res.end()
        })
    }
}

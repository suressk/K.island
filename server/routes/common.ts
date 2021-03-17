import { queryRecordDetail, queryRecordList } from '../services/recordService'
import { writeHead, writeResult } from '../utils/writeResponse'
import { Request, Response } from 'express'
import { mapCreateTime, mapYearGroup } from '../utils/util'

/**
 * 响应文章列表
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
 * 响应文章详情
 * */
export function recordDetailResponse (req: Request, res: Response) {
    const { id, uid } = req.query
    queryRecordDetail({
        id: Number(id),
        uid: uid as string
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

import { queryRecordDetail, queryRecordList } from '../services/recordService'
import { writeHead, writeResult } from '../utils/writeResponse'
import { Request, Response } from 'express'

export function recordListResponse (req: Request, res: Response, range: string | undefined) {
    queryRecordList({
        ...req.body,
        range
    }, result => {
        writeHead(res, 200)
        res.write(writeResult(true, '查询成功！', result))
        res.end()
    }, err => {
        writeHead(res, 500)
        res.write(writeResult(false, '文章列表查询失败咯~', err))
        res.end()
    })
}

// 响应文章详情
export function recordDetailResponse (req: Request, res: Response) {
    queryRecordDetail({
        ...req.body
    }, result => {
        writeHead(res, 200)
        res.write(writeResult(true, '查询成功！', result))
        res.end()
    }, err => {
        writeHead(res, 500)
        res.write(writeResult(false, '文章详情查询失败！', err))
        res.end()
    })
}

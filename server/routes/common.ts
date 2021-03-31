import { queryRecordDetail, queryRecordList, updateRecord } from '../services/recordService'
import { writeHead, writeResult } from '../utils/writeResponse'
import { Request, Response } from 'express'
import { mapCreateTime } from '../utils/util'
import {ArticleListItem} from '../common/types'

interface ListResult {
    list: ArticleListItem[]
    total: number
}

/**
 * 响应文章列表
 * */
export function recordListResponse (req: Request, res: Response, range: string | undefined) {
    const { pageNo, pageSize } = req.query
    const index = req.query.index ? Number(req.query.index) : undefined
    queryRecordList({
        ...req.query,
        pageNo: Number(pageNo),
        pageSize: Number(pageSize),
        range,
        index
    // @ts-ignore
    }).then(({ list, total }: ListResult) => {
        // success
        writeHead(res, 200)
        res.write(writeResult(true, '查询成功！', {
            list,
            total
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
    }).then((result: any) => {
        writeHead(res, 200)
        res.write(writeResult(true, '查询成功！',  mapCreateTime(result)[0]))
        res.end()
    }).catch(err => {
        writeHead(res, 500)
        res.write(writeResult(false, '文章详情查询失败！', err))
        res.end()
    })
}

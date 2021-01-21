import multer from 'multer'
import { v4 as uuid } from 'uuid'
import { Request, Response } from 'express'
import { CallBack, UpdateRecordOptions } from '../common/types'
import { verifyToken } from './jwt'
import { writeHead, writeResult } from './writeResponse'

const imgSuffixReg = /[.][a-z]+/

/**
 * 创建图片存储处理函数
 * */
export function createMulterStorage (dir: string) {
    return multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './images/' + dir) // 图片存储路径
        },
        filename(req, file, cb) {
            const matchRes = file.originalname.match(imgSuffixReg)
            if (matchRes !== null) {
                file.filename = uuid() + matchRes[0]
                cb(null, file.filename)
            }
        }
    })
}

/**
 * 跨域配置
 * */
const WHITE_LIST = ['http://localhost:8080', 'http://localhost:8888', '*']

/**
 * 创建跨域处理函数
 * */
export function createCorsOptionsDelegate (req: Request, callback: CallBack) {
    let corsOptions: { origin: boolean }
    const reqOrigin: string | undefined = req.header('Origin')
    if (reqOrigin && WHITE_LIST.includes(reqOrigin)) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions);
}

export function verifyTokenResponse (req: Request, res: Response, callback: () => void) {
    const verified = verifyToken(req)
    if (verified === null) {
        writeHead(res, 200)
        res.write(writeResult(false, '看看是不是 Token 失效啦？'))
        res.end()
    } else {
        callback()
    }
}

export function getUpdateRecordParams (options: UpdateRecordOptions) {
    const { id, uid } = options
    let sqlStr!: string
    const params: any[] = []
    const utime = new Date().getTime()
    if (options.is_delete) {
        sqlStr = 'UPDATE records SET is_delete = ?, utime = ? WHERE id = ? and uid = ?'
        params.push(options.is_delete)
    } else if (options.views) {
        sqlStr = 'UPDATE records SET views = ?, utime = ? WHERE id = ? and uid = ?'
        params.push(options.views)
    } else {
        sqlStr = 'UPDATE records SET title = ?, tag = ?, introduce = ?, content = ?, cover = ?, utime = ? WHERE id = ? and uid = ?'
        params.push(options.title, options.tag, options.introduce, options.content, options.cover)
    }
    params.push(utime, id, uid)
    return {
        sqlStr,
        params
    }
}

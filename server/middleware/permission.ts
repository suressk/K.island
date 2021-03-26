import { verifyToken } from '../utils/jwt'
import { writeHead, writeResult } from '../utils/writeResponse'
import { Request, Response, NextFunction } from 'express'
/**
 * 校验 token 权限中间件
 * */
export default function verifyPermission (
    req: Request,
    res: Response,
    next: NextFunction
) {
    new Promise((resolve, reject) => {
        const verified = verifyToken(req)
        if (verified !== null) {
            resolve('Have permission')
        } else {
            reject()
        }
    }).then(() => {
        next()
    }).catch(() => {
        writeHead(res, 403)
        res.write(writeResult(false, "Sorry! You have no permissions!", {}))
        res.end()
    })
}

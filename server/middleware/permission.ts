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
            resolve('pass')
        } else {
            reject()
        }
    }).then(() => {
        next()
    }).catch(() => {
        writeHead(res, 403)
        writeResult(res, false, "Sorry! You have no permissions!")
    })
}

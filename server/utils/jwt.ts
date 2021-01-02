import jwt from 'jsonwebtoken'
import { Request } from 'express'
import { UserInfo } from '../common/types'
// import fs from 'fs'
// const CERT = fs.readFileSync(__dirname + '../private.key');

// 加密密钥，一般应该是用一个专门的文件存储密钥
const CERT = 'fb0f25325ef08a5cfc740d51f0_www.suressk.com'

/**
 * 颁发 token
 * @param {*} info 携带信息（{ username: '', password: '' }）
 * @param {*} expireTime 过期时间（s）
 */
export function publishToken (info: UserInfo, expireTime: number = 3600) {
    return jwt.sign(info, CERT, {
        expiresIn: expireTime
    })
}

/**
 * 验证 token 信息
 * @param {*} req
 * */
export function verifyToken (req: Request) {
    let token: string | undefined
    // 尝试从 header 中获取 => 请求头添加 authorization 字段存放 token 信息
    token = req.headers.authorization
    // // 从 cookie 中获取 => req.cookies 为 undefined
    // token = req.cookies.token
    if (!token) {
        return null
    }
    // authorization: Bearer token
    const tokenArr: string[] = token.split(' ')
    token = tokenArr.length === 1 ? tokenArr[0] : tokenArr[1]
    try {
        return jwt.verify(token, CERT)
    } catch {
        return null
    }
}

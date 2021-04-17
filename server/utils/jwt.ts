import jwt from 'jsonwebtoken'
import {Request} from 'express'
import {UserInfo} from '../common/types'
import {CERT} from '../common/definition'

// import fs from 'fs'
// const CERT = fs.readFileSync(__dirname + '../private.key');

// 加密密钥，一般应该是用一个专门的文件存储密钥

export const expireTime = 3600 * 24 * 7 // token 过期时间（7天，单位为 s）

/**
 * 颁发 token
 * @param {*} info 携带信息（{ username: '', password: '' }）
 * @param {*} expiresIn 过期时间（number: 3600 <s> 或 表示时间跨度的 string：'7d', '1h' ...）
 */
export function publishToken(info: UserInfo, expiresIn: string | number = expireTime) {
    return jwt.sign(info, CERT, {expiresIn})
}

/**
 * 验证 token 信息
 * @param {*} req
 * */
export function verifyToken(req: Request) {
    let token: string | undefined
    // 尝试从 header 中获取 => 请求头添加 authorization 字段存放 token 信息
    token = req.headers.authorization
    // 从 cookie 中获取 => req.cookies 为 undefined
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

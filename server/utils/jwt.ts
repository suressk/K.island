import jwt from 'jsonwebtoken'
// import fs from 'fs'
// const CERT = fs.readFileSync(__dirname + '../private.key');

// 加密密钥，一般应该是有专门的 .key 文件存储密钥
const CERT = 'fb0f25325ef08a5cfc740d51f0_www.suressk.com'

/**
 * 颁发 token
 * @param {*} expireTime 过期时间（s）
 * @param {*} info 携带信息（{ username: '', password: '' }）
 */
export function publishToken (expireTime: number = 3600, info: object = {}) {
    return jwt.sign(info, CERT, {
        expiresIn: expireTime
    })
}

/**
 * 验证 token 信息
 * @param {*} token
 * */
export function verifyToken (token: string) {}

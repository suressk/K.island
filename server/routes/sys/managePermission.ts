import {Request, Response} from 'express'
import { login } from '../../services/loginService'
import { writeHead, writeResult } from '../../utils/writeResponse'
import { publishToken } from '../../utils/jwt'
const cookieKey = 'token'
const expireTime = 3600 * 24 // 过期时间(s) - 1D

export function Login (req: Request, res: Response) {
    login(req.body)
        .then((result: any) => {
            const { username, password } = req.body
            // 未查询到 username 的用户
            if (result.length === 0) {
                writeHead(res, 200)
                writeResult(res, false, `未匹配到用户：${username} ，检查一下是不是用户名拼写错误？`)
            } else if (password === result[0].password) {
                // 用户名和密码均匹配 - 颁发 token
                const token = publishToken({
                    username,
                    password
                })
                // 添加到 cookie
                res.cookie(cookieKey, token, {
                    maxAge: expireTime * 1000,
                    path: "/"
                })
                // 添加 authorization
                res.header("authorization", token)
                writeHead(res, 200)
                writeResult(res, true, "Successful", { token, expireTime })
            } else {
                writeHead(res, 200)
                writeResult(res, false, 'Password error')
            }
        })
        .catch(err => {
            writeHead(res, 500)
            writeResult(res, false, "Failed to sign in", err)
        })
}

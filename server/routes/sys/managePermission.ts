import {Request, Response} from 'express'
import { login } from '../../services/permissionService'
import { writeHead, writeResult } from '../../utils/writeResponse'
import { publishToken, verifyToken } from '../../utils/jwt'
const cookieKey = 'token'
const expireTime = 3600 * 24 // 过期时间(s) - 1D
// const router = express.Router()

export function Login (req: Request, res: Response) {
    login(req.body).then((result: any) => {
        const { username, password } = req.body
        // 未查询到 username 的用户
        if (result.length === 0) {
            writeHead(res, 200)
            res.write(writeResult(false, `未匹配到用户：${username} ，检查一下是不是用户名拼写错误？`))
            res.end()
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
            res.write(writeResult(true, "Successful", { token, expireTime }))
            res.end()
        } else {
            writeHead(res, 200)
            res.write(writeResult(false, 'Password error'))
            res.end()
        }
    }).catch(err => {
        writeHead(res, 500)
        res.write(writeResult(false, "Failed to sign in", err))
        res.end()
    })
}

// 后台管理系统登录
// router.post('/', (req, res) => {
//
// })

// 后台管理退出登录
// router.post('/logout', (req, res) => {
//     const verifyRes = verifyToken(req)
//     /**
//      * verifyRes = {
//      *     username: string,
//      *     password: string,
//      *     exp: number, // 过期时间（s）
//      *     iat: number // 颁发时间（s）
//      * }
//      * */
//     writeHead(res, 200)
//     res.send(verifyRes)
// })

// export default router

import express from 'express'
import { login } from '../services/permissionService'
import { writeResult } from '../utils/writeResponse'
import { publishToken, verifyToken } from '../utils/jwt'
const cookieKey = 'token'
const expireTime = 3600 // 过期时间 - 1h
const router = express.Router()

// 后台管理系统登录
router.post('/login', (req, res) => {
    login(req.body, result => {
        const { username, password } = req.body
        // 未查询到 username 的用户
        if (result.length === 0) {
            res.writeHead(200, { 'Content-Type':'text/html;charset=utf-8' })
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
            res.writeHead(200, { 'Content-Type':'text/html;charset=utf-8' })
            res.write(writeResult(true, "登录成功", { token, expireTime }))
            res.end()
        } else {
            res.writeHead(200, { 'Content-Type':'text/html;charset=utf-8' })
            res.write(writeResult(false, '您的密码貌似填错了呢'))
            res.end()
        }
    }, err => {
        res.writeHead(500, { 'Content-Type':'text/html;charset=utf-8' })
        res.write(writeResult(false, "呀！出错啦！去看看响应体的错误信息吧", err))
        res.end()
    })
})

// 后台管理退出登录
router.post('/logout', (req, res) => {
    const verifyRes = verifyToken(req)
    console.log(verifyRes)
    /**
     * verifyRes = {
     *     username: '',
     *     password: '',
     *     exp: '', // 过期时间（s）
     *     iat: '' // 颁发时间（s）
     * }
     * */
    res.send(verifyRes)
})

export default router

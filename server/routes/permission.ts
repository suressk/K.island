import express from 'express'
import { login } from '../services/permissionService'
import { writeResult } from '../utils/writeResponse'

const router = express.Router()

router.post('/login', (req, res) => {
    login(req.body, result => {
        const { username, password } = req.body
        // 未查询到 username 的用户
        if (!result.length) {
            res.writeHead(200)
            res.write(writeResult(false, `未匹配到用户：${username} ，检查一下是不是用户名拼写错误？`))
            res.end()
        } else if (password === result[0].password) {
            // 用户名和密码均匹配

        }
    }, err => {

    })
})

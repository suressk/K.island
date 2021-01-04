import express from 'express'
import { addRecord } from '../../services/recordService'
import { verifyToken } from '../../utils/jwt'
import {writeHead, writeResult} from '../../utils/writeResponse'

const router = express.Router()

router.post('/add', (req, res) => {
    const verified = verifyToken(req)
    if (verified === null) {
        writeHead(res, 200)
        res.write(writeResult(false, 'Token 失效或无 Token'))
        res.end()
    } else {
        addRecord(req.body, result => {
            writeHead(res, 200)
            res.write(writeResult(true, '文章上传成功啦！', result))
            res.end()
        }, err => {
            writeHead(res, 500)
            res.write(writeResult(false, '哇哦~ 文章上传失败啦！去看看哪里出问题了吧', err))
            res.end()
        })
    }

})

export default router

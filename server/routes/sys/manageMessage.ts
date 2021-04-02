import express from 'express'
import { getMessageList } from '../../services/messageService'
import { MessageListOptions } from '../../common/types'
import { writeHead, writeResult } from '../../utils/writeResponse'

const router = express.Router()


router.get('/list', (req, res) => {
    const { pageNo, pageSize } = req.query
    if (!pageNo || !pageSize) {
        writeHead(res, 416)
        writeResult(res, true, 'The parameter of pageNo or pageSize cannot be lack')
        return
    }
    getMessageList({
        pageNo: +pageNo,
        pageSize: +pageSize
    })
    .then((result: any) => {
        writeHead(res, 200)
        writeResult(res, true, '留言列表查询成功！', result)
    })
    .catch(error => {
        writeHead(res, 500)
        writeResult(res, false, '留言列表查询失败！', error)
    })
})

export default router

import express from 'express'
import {getMessageList, addMessage} from '../../services/messageService'
import {writeHead, writeResult} from '../../utils/writeResponse'

const router = express.Router()

/**
 * get message list
 * */
router.get('/list', (req, res) => {
    const pageNo = req.query.pageNo as string,
        pageSize = req.query.pageSize as string
    getMessageList({
        pageNo: +pageNo,
        pageSize: +pageSize
    }).then((result: any) => {
        writeHead(res, 200)
        writeResult(res, true, 'Successfully got the message list~', result)
    }).catch(error => {
        writeHead(res, 500)
        writeResult(res, false, 'Something wrong happened with getting the message list~', error)
    })
})

/**
 * add a new message
 * */
router.post('/add', (req, res) => {
    const name = req.body.name as string,
        message = req.body.message as string
    addMessage({name, message})
        .then(() => {
            writeHead(res, 200)
            writeResult(res, true, 'Successfully left a message~')
        })
        .catch(error => {
            writeHead(res, 500)
            writeResult(res, false, 'Message failed~', error)
        })
})

export default router

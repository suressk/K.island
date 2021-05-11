import express from 'express'
import {getMessageList, deleteMessages} from '../../services/messageService'
import {writeHead, writeResult} from '../../utils/writeResponse'

const router = express.Router()

/**
 * get message list
 * */
router.get('/list', (req, res) => {
    const {pageNo, pageSize} = req.query
    if (!pageNo || !pageSize) {
        writeHead(res, 416)
        writeResult(res, true, 'The parameters of pageNo or pageSize cannot be lack')
        return
    }
    getMessageList({
        pageNo: +pageNo,
        pageSize: +pageSize
    })
    .then((result: any) => {
        writeHead(res, 200)
        writeResult(res, true, 'Successfully got the message list~', result)
    })
    .catch(error => {
        writeHead(res, 500)
        writeResult(res, false, 'Something wrong happened with querying the message list!', error)
    })
})

/**
 * delete messages
 * */
router.delete('/delete', (req, res) => {
    const ids = req.body.ids
    deleteMessages({ids})
        .then(() => {
            writeHead(res, 200)
            writeResult(res, true, 'Successfully deleted', {})
        })
        .catch(error => {
            writeHead(res, 500)
            writeResult(res, false, 'Failed to delete the messages', error)
        })
})

export default router

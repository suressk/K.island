import express from 'express'
import { querySubscribeInfo, addSubscribeInfo } from '../../services/subscribeService'
import { writeHead, writeResult } from '../../utils/writeResponse'

const router = express.Router()

// 查询订阅信息是否存在（即是否已订阅）
router.get('/check', (req, res) => {

})

// 新增订阅
router.post('/add', (req, res) => {
    const pro = new Promise((resolve, reject) => {
        // 查询此邮箱是否存在
        querySubscribeInfo({
            email: req.body.email,
            name: req.body.name
        },
        result => {
            // 邮箱已存在
            if (result.length > 0) {
                reject({
                    status: 416,
                    success: false,
                    msg: '此邮箱已经订阅了哦~ 是你忘记了，还是写错邮箱辣？^_^'
                })
            } else {
                resolve({})
            }
        },
        error => {
            reject({
                status: 500,
                success: false,
                msg: 'Something error in querying subscription information',
                data: error
            })
        })
    })

    pro.then(() => {
        // 新增订阅
        addSubscribeInfo({
            email: req.body.email,
            name: req.body.name
        }, result => {
            writeHead(res, 200)
            writeResult(true, '小K. <K.island> 欢迎您', result)
        }, err => {
            writeHead(res, 500)
            writeResult(err.success, '小K.很遗憾地告诉您：小栈订阅失败了！麻烦联系小K.说明一下哟~',err)
        })
    }).catch(err => {
        writeHead(res, err.status)
        writeResult(err.success, err.msg)
    })
})

// 移除订阅
router.delete('/delete', (req, res) => {

})

export default router

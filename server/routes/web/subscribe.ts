import express from 'express'
import {querySubscribeInfo, addSubscribeInfo, verifyEmailCode} from '../../services/subscribeService'
import { writeHead, writeResult } from '../../utils/writeResponse'
import sendMail from '../../utils/subscribe'

const router = express.Router()

// 新增订阅
router.post('/add', (req, res) => {
    const email = req.body.email
    const name = req.body.name
    // 1. 查询此邮箱是否存在
    const pro = new Promise((resolve, reject) => {
        querySubscribeInfo({
            email,
            name
        },
        result => {
            // 邮箱已存在
            if (result.length > 0) {
                reject({
                    status: 416,
                    success: false,
                    msg: '此邮箱已经订阅了哦~ 是你忘记了吗？'
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

    // 2. 发送邮箱验证
    pro.then(() => {
        sendMail(1, { email, name }, {
                email: 'sure_k@qq.com',
                user: '',
                pass: '',
                emailType: 'QQ',
                name: '小 K.'
            }
        )
    }).catch(err => {
        writeHead(res, err.status)
        writeResult(err.success, err.msg, err.data)
    })
})

/**
 * 邮箱验证
 * */
router.post('/verify', (req, res) => {
    verifyEmailCode(req.body)
        .then(() => {
            // success 验证邮箱成功
            // 新增订阅
            addSubscribeInfo({
                email: req.body.email,
                name: req.body.name
            }).then((result: any) => {
                writeHead(res, 200)
                writeResult(true, '小K. <<K.island>> 欢迎您', result)
            }).catch(err => {
                writeHead(res, 500)
                writeResult(err.success, '小K.很遗憾地告诉您：小栈订阅失败了！麻烦联系一下小K.哟~', err)
            })
        })
        .catch(err => {
            writeHead(res, 500)
            writeResult(true, err.message, err)
        }
    )
})

export default router

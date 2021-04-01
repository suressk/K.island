import express from 'express'
import {querySubscribeInfo, addVerifyCodeInfo, addSubscribeInfo, verifyEmailCode} from '../../services/subscribeService'
import { writeHead, writeResult } from '../../utils/writeResponse'
import sendMail from '../../utils/subscribe'
import { authQQPass } from '../../common/definition'
import {SubscribeInfo, EmailTipType} from '../../common/types'
import {createRandomVerifyCode} from '../../utils/util'

const router = express.Router()

// 新增订阅
router.post('/add', (req, res) => {
    const email = req.body.email
    // const name = req.body.name
    // 1. 查询此邮箱是否存在
    const pro = new Promise((resolve, reject) => {
        querySubscribeInfo({ email })
            .then((result: any) => {
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
            })
            .catch(error => {
                reject({
                    status: 500,
                    success: false,
                    msg: 'Something error in querying subscription information',
                    data: error
                })
            })
        })

    // 'stack_surek@outlook.com'
    const userEmail = 'sure_k@qq.com'

    // 2. 发送邮箱验证
    pro.then(() => {
        // 随机验证码
        const verifyCode = createRandomVerifyCode()

        const auth = {
            // email: 'sure_k@qq.com',
            user: userEmail,
            pass: authQQPass,
            emailType: 'QQ',
            name: '小 K.'
        }
        const info = {
            email,
            url: `${req.headers.origin}/subscription/verify?email=${email}`,
            code: verifyCode
        }
        // console.log(JSON.stringify(req.headers))
        sendMail(EmailTipType.VERIFY_EMAIL, info, auth as SubscribeInfo)
            .then(() => {
                /**
                 * result: {
                 *     accepted: [the email],
                 *     envelop: {
                 *         from: auth email,
                 *         to: [the email]
                 *     },
                 *     ... // others msg
                 * }
                 * */
                // 表存储验证码信息
                addVerifyCodeInfo({
                    code: verifyCode,
                    email
                }).then(() => undefined)

                writeHead(res, 200)
                writeResult(res, true, '邮箱验证信息已发送！快去你的邮箱验证一下吧~')
            })
            .catch(error => {
                writeHead(res, 500)
                writeResult(res, true, '邮箱验证信息发送失败！记得给小 K. 说一声哦~', error)
            })
    }).catch(err => {
        writeHead(res, err.status)
        writeResult(res, err.success, err.msg, err.data)
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
                writeResult(res, true, '小K. <<K.island>> 欢迎您', result)
            }).catch(err => {
                writeHead(res, 500)
                writeResult(res, err.success, '小K.很遗憾地告诉您：小栈订阅失败了！麻烦联系一下小K.哟~', err)
            })
        })
        .catch(err => {
            writeHead(res, 500)
            writeResult(res, false, err.message, err)
        }
    )
})

export default router

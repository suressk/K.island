import express from 'express'
import {SubscribeInfo, EmailTipType} from '../../common/types'
import {
    querySubscribeInfo,
    addVerifyCodeInfo,
    addSubscribeInfo,
    checkVerificationCode
} from '../../services/subscribeService'
import {writeHead, writeResult} from '../../utils/writeResponse'
import {createRandomVerifyCode} from '../../utils/util'
import sendMail from '../../utils/subscribe'
import {authMailInfo} from '../../utils/mail'
import {v4 as uuid} from 'uuid'
// import {authPass, authEmail} from '../../common/definition'

const router = express.Router()

/**
 * 新增订阅
 * */
router.post('/add', (req, res) => {
    const email = req.body.email
    // const name = req.body.name
    // 1. 查询此邮箱是否存在
    const pro = new Promise((resolve, reject) => {
        querySubscribeInfo({email})
            .then((result: any) => {
                // 邮箱已存在
                if (result && result.length > 0) {
                    reject({
                        // status: 416,
                        status: 200,
                        success: false,
                        message: '你的邮箱已经订阅过小栈了~ 不用重复订阅的',
                        error: {}
                    })
                } else {
                    resolve(true)
                }
            })
            .catch(error => {
                reject({
                    status: 500,
                    success: false,
                    message: 'Something error in querying subscription information',
                    error: error
                })
            })

    })

    // 2. 发送邮箱验证
    pro.then(() => {
        // 随机验证码
        const verifyCode = createRandomVerifyCode()
        const uid = uuid()

        const info = {
            uid,
            email,
            url: `${req.headers.origin}/subscription/verify?email=${email}`,
            code: verifyCode
        }
        /**
         * sendMail.then:
         *
         * result: {
         *     accepted: [the email],
         *     envelop: {
         *         from: auth email,
         *         to: [the email]
         *     },
         *     ... // others msg
         * }
         * */
        sendMail(EmailTipType.VERIFY_EMAIL, info, authMailInfo as SubscribeInfo)
            .then(() => {
                // 表存储验证码信息
                addVerifyCodeInfo({
                    code: verifyCode,
                    email,
                    uid
                }).then(() => {
                    writeHead(res, 200)
                    writeResult(res, true, '邮箱验证信息已发送！快去你的邮箱验证一下吧~')
                }, err => {
                    writeHead(res, 200)
                    writeResult(res, false, '貌似出错了', err)
                })
            })
            .catch(error => {
                writeHead(res, 200)
                writeResult(res, false, '邮箱验证信息发送失败！记得给 小K. 说一声哦~', error)
            })
    }).catch(err => {
        writeHead(res, err.status)
        writeResult(res, false, err.message, err.error)
    })
})

/**
 * 邮箱验证
 * */
router.post('/verify', (req, res) => {
    checkVerificationCode(req.body)
        .then(() => {
            // 邮箱验证成功 => 新增订阅
            addSubscribeInfo({
                email: req.body.email,
                name: req.body.name
            }).then(() => {
                writeHead(res, 200)
                writeResult(res, true, '恭喜你成功订阅 小K. 的小栈！若要取消订阅，请联系 小K.')
            }).catch(err => {
                writeHead(res, 500)
                writeResult(res, err.success, '小K. 很遗憾地告诉您：小栈订阅失败了！麻烦联系一下 小K.', err)
            })
        })
        .catch(err => {
            writeHead(res, err.status)
            writeResult(res, false, err.message, err.error)
        })
})

export default router

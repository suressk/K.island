import nodemailer from 'nodemailer'
import { SubscribeInfo } from '../../common/types'
import { createOption } from './subscribeOptions'

/**
 * 订阅
 * @param {*} type 类型：1 => 订阅验证; 2 => 订阅通知; 3 => 评论通知
 * @param {*} data
 * @param {*} info
 * */
async function subscribe(type: number, data: any, info: SubscribeInfo) {
    const mode = {
        'QQ': 'smtp.qq.com',
        '163': 'smtp.163.com',
        'GMAIL': 'smtp.gmail.com'
    }

    const transporter = nodemailer.createTransport({
        // @ts-ignore
        host: mode[info.base.emailType],
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: info.administrator.user, // generated ethereal user
            pass: info.administrator.pass, // generated ethereal password
        },
    })

    await transporter.sendMail(
        createOption(type, data, info),
        (err, res) => {
            if (err) {
                console.log('send email error: ', err)
            } else {
                console.log('Message sent: ', res.response)
            }
        }
    )
    // 关闭连接池
    transporter.close()
}

export default subscribe

import nodemailer from 'nodemailer'
import { SubscribeInfo, SubscribeTipInfo } from '../common/types'
import { createRandomVerifyCode } from './util'

const wishStr = `
    <div style='background: #eff5fb;border-left: 4px solid #c2e1ff;padding: 20px;margin-top: 30px;border-radius: 0 10px 10px 0;font-size: 0.8rem;color: #7d7f7f;line-height: 1.5;'>
        - If we don’t have a chance to meet, then I’m here to wish you good morning, good afternoon and good night~<br>
        - May the beauty of the world arrive as expected~<br>
        - Remember to smile and say: I'm fine.(Just for myself - K.)
    </div>
`

const serviceMap = {
    qq: 'QQ',
    163: '163',
    gmail: 'Gmail',
    outlook: 'Outlook365'
}

interface SendEmailInfo {
    url: string
    email?: string
    name?: string
    title?: string
    code?: string
}

/**
 * send email
 * @param {*} type 类型：1 => 订阅验证; 2 => 发布新文章通知; 3 => 评论通知
 * @param {*} info
 * @param {*} auth
 * */
export default function sendMail(type: number, info: SendEmailInfo, auth: SubscribeInfo) {

    const transporter = nodemailer.createTransport({
        // host: mode[info.emailType],
        service: serviceMap.qq,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: auth.user, // generated ethereal user
            pass: auth.pass, // generated ethereal password
        }
    })

    return new Promise((resolve, reject) => {
        transporter.sendMail(
            createOption(type, info, auth),
            (err, res) => {
                // send failed
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            }
        )
        // 关闭连接池
        transporter.close()
    })
}

/**
 * 创建 option
 * */
function createOption(type: number, info: SendEmailInfo, auth: SubscribeInfo) {
    const { subject, html } = createTipInfo(type, info, auth)

    return {
        from: `${auth.name} <${auth.user}>`,
        to: info.email,
        subject,
        html
    }
}

/**
 * 创建邮件信息内容
 * */
function createTipInfo(type: number, info: SendEmailInfo, auth: SubscribeInfo): SubscribeTipInfo {
    switch (type) {
        case 1:
            return {
                subject: 'K.island 发来的邮箱订阅验证~',
                html: `
                    <div style='margin: 20px auto;max-width:800px;letter-spacing: 1px;padding: 30px;box-shadow: 0 0 10px #eee;'>
                        <h2 style='font-size: 1.2rem;font-weight: 400;'>你好吖~</h2>
                        <p style='text-indent: 2em;color:#303030;font-size: 0.8rem;line-height: 1.5;'>佛曰：前世的五百次回眸才换得今世的擦肩而过。感谢遇见~</p>
                        <p style='text-indent: 2em;font-size: 0.8rem;line-height: 1.5;margin-top: 20px;'><a href='${info.url}' style='text-indent: 2em;color: #0095d9;'>点我进行邮箱验证（1小时内有效）~</a></p>
                        <p style='text-indent: 2em;font-size: 0.8rem;line-height: 1.5;margin-top: 20px;'>验证码：<span style="color: #0095d9;font-size: 1.2rem;">${info.code}</span></p>
                        <p style='text-align: right;margin-top: 40px;font-size:0.8rem'>┣ ${auth.name} ┫</p>
                        ${wishStr}
                    </div>
                `
            }
        case 2:
            return {
                subject: '小 K. 发布了新的文章，要不来看看？',
                html: `
                    <div style='padding: 30px;color: #303030;border-radius: 8px;box-shadow: 0 0 10px #eee;'>
                        <h2 style='font-weight: 400;font-size: 1rem;'>来自 小K. 的问候~</h2>
                        <p style='text-indent: 2em;color:#303030;font-size: 0.8rem;line-height: 24px;'>
                            小 K. 偷偷告诉你，新的小文已发布，要不要来看一看辣？！《<a href='${info.url}' style='color: #0095d9;'>${info.title}</a>》，希望你喜欢，期待你的评论哦~
                        </p>
                        <p style='text-align: right;margin-top: 40px;font-size:0.8rem'>┣ ${auth.name} ┫</p>
                        ${wishStr}
                    </div>
                `
            }
        case 3:
            return {
                subject: info.title + ' | ' + auth.name,
                html: `
                    <div style='padding: 30px;color: #303030;border-radius: 8px;box-shadow: 0 0 10px #eee;'>
                        <h2 style='font-weight: 400;font-size: 1rem;'>hi，${info.name}，有一条最新'岛语'哦</h2>
                        <p style='text-indent: 2em;color:#303030;font-size: 0.8rem;line-height: 24px;'>
                            小 K. 提醒您，您在《<a href='${info.url}' style='color: #0095d9;'>${info.title}</a>》小文中的评论有了一条新的回复哦，回来看看TA是不是对你说了什么悄悄话吖~
                        </p>
                        <p style='text-align: right;margin-top: 40px;font-size:0.8rem'>┣ ${auth.name} ┫</p>
                        ${wishStr}    
                    </div>
                `
            }
        default:
            return {
                subject: '',
                html: ''
            }
    }
}

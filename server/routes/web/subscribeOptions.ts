import { SubscribeInfo } from '../../common/types'

/**
 * 创建 option
 * type: 1: 订阅验证; 2: 订阅通知; 3: 评论通知;
 * */
export function createOption(type: number, data: any, info: SubscribeInfo) {
    const { subject, html } = createTipInfo(type, data, info)

    return {
        from: `${info.administrator.name} <${info.administrator.email}>`,
        to: data.email,
        subject,
        html
    }
}

interface TipInfo {
    subject: string;
    html: string;
}

/**
 * 创建邮箱的 options
 * type: 1: 订阅验证; 2: 订阅通知; 3: 评论通知;
 * */
function createTipInfo(type: number, data: any, info: SubscribeInfo): TipInfo {
    switch (type) {
        case 1:
            return {
                subject: 'K.island 发来的邮箱订阅的验证~',
                html: `
                    <div style="margin: 20px auto;max-width:800px;letter-spacing: 1px;padding: 30px;box-shadow: 0 0 10px #eee;">
                        <h2 style="font-size: 1.2rem;font-weight: 400;">你好吖~</h2>
                        <p style="text-indent: 2em;color:#303030;font-size: 0.8rem;line-height: 1.5;">
                            佛曰：前世的五百次回眸才换得今世的擦肩而过。感谢遇见~
                            <a href="${data.url}">点我进行验证（1小时内有效）~</a>
                            Fighting~
                        </p>
                        <p style="text-align: right;margin-top: 40px;font-size:0.8rem">—— ${info.administrator.name}</p>
                        <div style="background: #eff5fb;border-left: 4px solid #c2e1ff;padding: 20px;margin-top: 30px;border-radius: 10px;font-size: 0.8rem;color: #7d7f7f;line-height: 1.5;">
                            If we don’t have a chance to meet, then I’m here to wish you good morning, good afternoon and good night~<br>
                            May the beauty of the world arrive as expected~<br>
                            Remember to smile and say: I'm fine.(Just for myself - K.)
                        </div>
                    </div>
                `
            }
        case 2:
            return {
                subject: '小 K. 发布了新的文章，要不来看看？',
                html: `
                    <div style="padding: 30px;color: #303030;border-radius: 8px;box-shadow: 0 0 10px #eee;">
                        <h2 style="font-weight: 400;font-size: 1rem;">来自 小K. 的问候~</h2>
                        <p style="text-indent: 2em;color:#303030;font-size: 0.8rem;line-height: 24px;">
                            小 K. 的小驿站，给你带来一刻美好的消息，新的小文已发布，要不要来看一看辣？！《<a href="${data.url}">${data.title}</a>》，希望你喜欢，期待你的评论哦~
                        </p>
                        <p style="text-align: right;margin-top: 40px;font-size:0.8rem">—— ${info.administrator.name}</p>
                        <div style="background: #eff5fb;border-left: 4px solid #c2e1ff;padding: 20px;margin-top: 30px;border-radius: 10px;font-size: 0.8rem;color: #7d7f7f;line-height: 24px;">
                            If we don’t have a chance to meet, then I’m here to wish you good morning, good afternoon and good night~<br>
                            May the beauty of the world arrive as expected~<br>
                            Remember to smile and say: I'm fine.(Just for myself - K.)
                        </div>
                    </div>
                `
            }
        case 3:
            return {
                subject: data.title + ' | ' + info.administrator.name,
                html: `
                    <div style="padding: 30px;color: #303030;border-radius: 8px;box-shadow: 0 0 10px #eee;">
                        <h2 style="font-weight: 400;font-size: 1rem;">hi，${data.name}，有一条最新岛"语"哦</h2>
                        <p style="text-indent: 2em;color:#303030;font-size: 0.8rem;line-height: 24px;">
                            小 K. 的小驿站提醒您，您在《<a href="${data.url}">${data.title}</a>》小文中有了一条新的回复哦，回来看看TA是不是对你说了什么悄悄话吖~
                        </p>
                        <p style="text-align: right;margin-top: 40px;font-size:0.8rem">—— ${info.administrator.name}</p>
                        <div style="background: #eff5fb;border-left: 4px solid #c2e1ff;padding: 20px;margin-top: 30px;border-radius: 10px;font-size: 0.8rem;color: #7d7f7f;line-height: 24px;">
                            If we don’t have a chance to meet, then I’m here to wish you good morning, good afternoon and good night~<br>
                            May the beauty of the world arrive as expected~<br>
                            Remember to smile and say: I'm fine.(Just for myself - K.)
                        </div>
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

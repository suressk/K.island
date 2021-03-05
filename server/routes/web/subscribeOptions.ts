import { SubscribeInfo } from '../../common/types'

export const options = []

/**
 * 创建验证邮箱的 options
 * */
function createVerifyOption(type: number, data: any, info: SubscribeInfo) {
    return {
        from: `${info.administrator.name} <${info.administrator.email}>`,
        to: data.email,
        subject: 'K.island 发来的邮箱订阅的验证~',
        html: `
            <div style="margin: 20px auto;max-width:800px;letter-spacing: 1px;padding: 30px;box-shadow: 0 0 10px #eee;">
                <h2 style="font-size: 1.2rem;font-weight: 400;">你好吖~</h2>
                <p style="text-indent: 2em;color:#303030;font-size: 0.8rem;line-height: 1.5;">
                    佛曰：前世五百次的回眸才换得今世的擦肩而过。感谢遇见~
                    <a href="${data.url}">点我进行验证（1小时内有效）~</a>
                    Fighting~
                </p>
                <p style="text-align: right;margin-top: 40px;font-size:0.8rem">—— ${info.administrator.name}</p>
                <div style="background: #eff5fb;border-left: 4px solid #c2e1ff;padding: 20px;margin-top: 30px;border-radius: 10px;font-size: 0.8rem;color: #7d7f7f;line-height: 1.5;">
                    如果我们没有机会见面，那我在这儿提前预祝你早安、午安以及晚安~<br>
                    愿所有的美好如约而至，愿所有的黑暗都能看到希望，我们微笑前行~<br>
                    人生没有完美，也许有些遗憾才美~ 永远相信美好的事情即将发生~
                </div>
            </div>
        `
    }
}

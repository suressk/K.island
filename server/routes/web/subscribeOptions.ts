import { SubscribeInfo } from '../../common/types'

export const options = []

/**
 * 创建验证邮箱的 options
 * */
function createVerifyOption(type: number, data: any, info: SubscribeInfo) {
    return {
        from: `${info.administrator.name} <${info.administrator.email}>`,
        to: data.email,
    }
}

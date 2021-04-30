/**
 * 订阅类型定义
 * */

// 删除订阅信息参数
// export interface DeleteSubscribeParams {
//     id: number
//     email: string
// }

// 生成邮件信息类型
export interface CreateSubscribeEmailInfo {
    subject: string
    html: string
}

// type EmailType = 'QQ' | '163' | 'GMAIL' | 'OUTLOOK'
// 发送邮件 author 邮箱信息
export interface AuthSubscribeInfo {
    user: string
    pass: string
    name: string
    email?: string
    uid?: string
    // emailType: EmailType
}

// 验证邮箱验证码参数
export interface VerifyCodeParams {
    email: string
    code: string
}

// 发送邮件信息类型
export enum SendEmailType {
    VERIFY_EMAIL = 1,
    ADD_RECORD,
    ADD_COMMENT
}
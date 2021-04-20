/**
 * 订阅类型定义
 * */

import {PageQueryParams} from './commonTypes'

// 查询订阅列表参数（TODO email 可作为过滤条件，免去多页翻页查找要移除订阅的 email）
export interface QuerySubscribeParams extends PageQueryParams {
    email?: string
}

// 删除订阅信息参数
export interface DeleteSubscribeParams {
    id: number
    email: string
}

// 生成邮件信息类型
export interface SubscribeTipInfo {
    subject: string
    html: string
}

// 发送邮件信息类型
export enum EmailTipType {
    VERIFY_EMAIL = 1,
    ADD_RECORD,
    ADD_COMMENT
}

// 验证邮箱验证码参数
export interface VerifyCodeParams {
    email: string
    code: string
}
export interface CorsOption {
    origin: boolean
}

export interface UserInfo {
    username: string
    password: string
}

export interface IdsOptions {
    ids: number[]
}

// 分页查询参数
interface PageQueryParams {
    pageNo: number
    pageSize: number
}

/**
 * 文章管理 相关请求参数类型定义
 * */
export interface QueryRecordListOptions extends PageQueryParams {
    range?: string
    title?: string
    index?: number
    group?: string
}

export interface RecordIdOptions {
    id: number
    uid: string
}

// 分页查询订阅列表
export type QuerySubscribeListOptions = PageQueryParams

export interface DeleteSubscribeOptions {
    id: number
    email: string
}

// 分页查询【留言】列表
export type MessageListOptions = PageQueryParams


export interface AddMessageOpt {
    name: string
    message: string
}

/**
 * 数据库 records 表存储字段
 * */
interface RecordInfo {
    id?: number
    uid?: string
    title?: string
    tag?: string
    introduce?: string
    cover?: string
    ctime?: number
    utime?: number
    views?: number
    liked?: number
    is_delete?: number
    content?: string
    music?: string
}

export interface ArticleListItem extends RecordInfo {
    id: number
    uid: string
    title: string
    tag: string
    introduce: string
    views: number
    cover: string
    ctime: number
    utime: number
}

// extends RecordInfo
export interface AddRecordOptions {
    title: string
    tag: string
    introduce: string
    content: string
    cover: string
    music: string
    liked?: number
}

export interface UpdateRecordOptions extends RecordInfo {
    id: number
    uid: string
}

// type EmailType = 'QQ' | '163' | 'GMAIL' | 'OUTLOOK'

/**
 * 订阅信息
 * */
export interface SubscribeInfo {
    user: string
    pass: string
    name: string
    email?: string
    uid?: string
    // emailType: EmailType
}

export interface SubscribeTipInfo {
    subject: string
    html: string
}

export interface CheckVerificationCodeOptions {
    email: string
    code: string
}

export enum EmailTipType {
    VERIFY_EMAIL = 1,
    NEW_RECORD,
    NEW_COMMENT
}

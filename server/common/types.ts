export interface CorsOption {
    origin: boolean
}

export type CallBack = (arg0: null, arg1: CorsOption) => void

export interface UserInfo {
    username: string
    password: string
}

// 分页查询参数
interface PageQueryParams {
    pageNo: number
    pageSize: number
}

/**
 * 文章管理 相关请求参数类型定义
 * */
export interface QueryListOptions extends PageQueryParams {
    range?: string
    title?: string
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
    musicName?: string
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
    musicName: string
}

export interface UpdateRecordOptions extends RecordInfo {
    id: number
    uid: string
}

/**
 * 订阅信息
 * */
export interface SubscribeInfo {
    administrator: {
        user: string
        pass: string
        name: string
        email: string
    },
    base: {
        emailType: string
    }
}

export interface SubscribeTipInfo {
    subject: string
    html: string
}

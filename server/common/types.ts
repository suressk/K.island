export interface CorsOption {
    origin: boolean
}

export type CallBack = (arg0: null, arg1: CorsOption) => void

export interface UserInfo {
    username: string;
    password: string;
}

interface PageQueryParams {
    pageNo: number; // 当前页码
    pageSize: number; // 每页数量
}

/**
 * 文章管理 相关请求参数类型定义
 * */
export interface QueryListOptions extends PageQueryParams {
    range?: string;
}
export interface RecordIdOptions {
    id: number;
    uid: string;
}

// 分页查询订阅列表
export type QuerySubscribeListOptions = PageQueryParams

export interface DeleteSubscribeOptions {
    id: number;
    email: string;
}


// export interface RecordItem {
//     id: number;
//     uid: string;
//     title: string;
//     tag: string;
//     introduce: string;
//     cover: string;
//     ctime: number;
//     utime: number;
//     views: number;
//     is_delete?: number;
//     // content?: string;
// }

export interface AddRecordOptions {
    title: string;
    tag: string;
    introduce: string;
    content: string;
    cover: string;
}

export interface UpdateRecordOptions {
    id: number;
    uid: string;
    title?: string;
    tag?: string;
    introduce?: string;
    content?: string;
    cover?: string;
    is_delete?: number;
    views?: number;
}


export interface SubscribeInfo {
    administrator: {
        user: string;
        pass: string;
        name: string;
        email: string;
    },
    base: {
        emailType: string;
    }
}

export interface SubscribeTipInfo {
    subject: string;
    html: string;
}

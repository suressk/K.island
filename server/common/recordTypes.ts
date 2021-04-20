/**
 * 文章管理相关类型定义
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

// 文章列表 item
export interface RecordItem extends RecordInfo {
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

// 新增文章参数
export interface AddRecordParams {
    title: string
    tag: string
    introduce: string
    content: string
    cover: string
    music: string
    liked?: number
}

// 更新文章参数
export interface UpdateRecordParams extends RecordInfo {
    id: number
    email: string
}
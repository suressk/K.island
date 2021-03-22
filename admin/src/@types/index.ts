export interface TokenInfo {
    token: string
    expireTime: number
}

export interface ErrorResponse {
    code: string
    message: string
    response: Response
}

export interface ResponseData<D> {
    success: boolean
    message: string
    data: D
}

export type LoginResponse = ResponseData<TokenInfo>

export interface ArticleInfo {
    id?: number
    uid?: string
    title?: string
    tag?: string
    introduce?: string
    content?: string
    ctime?: number
    utime?: number
    is_delete?: number
    music?: string
    musicName?: string
    cover?: string
    time?: {
        year: string
        month: string
        monthNum: number
        day: string
        hour: string
        minute: string
    }
}

export interface RecordInfo extends ArticleInfo {
    title: string
    tag: string
    introduce: string
    content: string
    music: string
    musicName: string
    cover: string
}

export type MessageType = 'success' | 'warning' | 'info' | 'error'

/**
 * request params type
 * */
export interface DeleteImageParams {
    relativePath: string
}

export interface LoginParams {
    username: string
    password: string
}

export interface NewArticleParams extends ArticleInfo {
    content: string
}

export interface QueryArticleListParams {
    pageNo: number
    pageSize: number
    title?: string
}

export interface ArticleIds {
    id: number
    uid: string
}

export interface UpdateArticleParams extends ArticleInfo {
    id: number
    uid: string
}

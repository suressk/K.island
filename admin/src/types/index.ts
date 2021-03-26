import { TableState } from 'ant-design-vue/es/table/interface'

export interface LoginInfo {
    username: string
    password: string
}

export interface TokenInfo {
    token: string
    expireTime: number
}

export interface ErrorResponse {
    code: string
    message: string
    response: Response
}

export interface ResponseData<D> extends PromiseLike<any>{
    success: boolean
    message: string
    data: D
}

export interface ListRes<T> {
    list: T
    total: number
}

export type RecordListResponseData = ResponseData<ListRes<YearDataList<RecordItem>>>

export type LoginResponse = ResponseData<TokenInfo>

/**
 * 文章相关
 * */
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

export interface YearDataList<T> {
    [prop: string]: T[];
}

export interface RecordInfo extends ArticleInfo {
    title: string
    tag: string
    introduce: string
    content: string
    music: string
    cover: string
}

/**
 * 文章列表 item
 * */
export interface RecordItem extends ArticleInfo {
    id: number
    uid: string
    title: string
    introduce: string
    tag: string
    views: number
    cover: string
    ctime: number
    utime: number
    is_delete: number
    show?: boolean
    createTime?: string
    updateTime?: string
}

export type Pagination = TableState['pagination']

/**
 * message board type
 * */
export interface MsgListItem {
    id: number
    name: string
    message: string
    ctime: number
}

/**
 * comment board type
 * */
export interface CommentItem {
    id: number
    name: string
    email: string
    comment: string
    ctime: number
    parentId?: number
    to?: string
}

export interface DeleteCommentsParams {
    ids: number[]
}

/**
 * request params type
 * */
export interface PageQueryParams {
    pageNo: number
    pageSize: number
}

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

export interface QueryArticleListParams extends PageQueryParams {
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

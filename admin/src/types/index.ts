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

export interface ResponseData<D> {
    success: boolean
    message: string
    data: D
}

export interface ListRes<T> {
    list: T
    total: number
}

type IdsListParam = {
    ids: number[]
}

export interface CommentListRes extends ListRes<CommentItem[]> {
    unread: number
}

export type RecordListResponseData = ResponseData<ListRes<YearDataList<RecordItem>>>

export type LoginResponse = ResponseData<TokenInfo>
// export type LoginResponse = {
//     success: boolean
//     message: string
//     data: TokenInfo
// }

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
    content: string
    ctime: number
}

/**
 * comment board type
 * */
export interface CommentItem {
    id: number
    uid: string
    parentId: null | number
    topicId: string
    articleId: number
    articleUid: string
    title: string
    fromName: string
    fromEmail: string
    toName: string
    toEmail: string
    content: string
    ctime: number
    isRead: number
}

/**
 * subscribe board type
 * */
export type SubscribeItem = {
    id: number
    uid: string
    email: string
    name: string
    ctime: number
}


/**
 * request params type
 * */
export type DeleteCommentsParams = {
    id: number
    parentId: number | null
}

export type ReplyCommentParams = {
    id: number
    parentId: number
    topicId: string
    toName: string
    toEmail: string
    isRead: number
    comment: string
    articleId: number
    articleUid: string
    articleTitle: string
}

export type ReadCommentsParams = IdsListParam

export type DeleteMessagesParams = IdsListParam

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

export interface DeleteRecordParams extends ArticleIds {
    relativePath?: string
}

export interface UpdateArticleParams extends ArticleInfo {
    id: number
    uid: string
}

export interface QuerySubscribeParams extends PageQueryParams {
    email?: string
}

export type DeleteSubscribeParams = IdsListParam

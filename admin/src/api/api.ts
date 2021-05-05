import {
  getAction,
  postAction,
  putAction,
  postUploadImage,
  deleteAction
} from './manage'
import {
  DeleteImageParams,
  LoginParams,
  NewArticleParams,
  QueryArticleListParams,
  ArticleIds,
  UpdateArticleParams,
  PageQueryParams,
  DeleteRecordParams,
  ReplyCommentParams,
  DeleteCommentsParams,
  DeleteMessagesParams,
  ReadCommentsParams,
  QuerySubscribeParams,
  DeleteSubscribeParams
} from '../types'

// 登录
export const login = (params: LoginParams) => postAction('/login', params)
// const logout = (params: LoginInfo) => postAction('/logout', params)

// 首页概览
export const getOverviewData = () => getAction('/overview/view')

// 文章管理
export const addRecord = (params: NewArticleParams) => postAction('/records/add', params)
export const getRecordList = (params: QueryArticleListParams) => getAction('/records/list', params)
export const getRecordDetail = (params: ArticleIds) => getAction('/records/detail', params)
export const deleteRecord = (params: DeleteRecordParams) => deleteAction('/records/delete', params)
export const updateRecord = (params: UpdateArticleParams) => putAction('/records/update', params)

// 上传封面图
export const uploadCover = (fileData: FormData) => postUploadImage('/upload/cover', fileData)
// 删除封面图
export const deleteCover = (data: DeleteImageParams) => deleteAction('/upload/delete', data)
// 上传文章插图
// export const uploadIllustration = (fileData: FormData) => postUploadImage('/upload/plate', fileData)


// 留言信息
export const getMessageList = (params: PageQueryParams) => getAction('/messages/list', params)
export const deleteMessages = (data: DeleteMessagesParams) => deleteAction('/messages/delete', data)

// 评论信息
export const getCommentList = (params: PageQueryParams) => getAction('/comments/list', params)
export const replyComment = (data: ReplyCommentParams) => postAction('/comments/reply', data)
export const deleteComments = (data: DeleteCommentsParams) => deleteAction('/comments/delete', data)
export const readComments = (data: ReadCommentsParams) => putAction('/comments/read', data)

// 订阅信息
export const getSubscribeList = (params: QuerySubscribeParams) => getAction('/subscribes/list', params)
export const deleteSubscribes = (params: DeleteSubscribeParams) => deleteAction('/subscribes/delete', params)
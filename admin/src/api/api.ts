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
  DeleteCommentsParams,
  DeleteMessagesParams
} from '../types'

// 登录
export const login = (params: LoginParams) => postAction('/sys/login', params)
// const logout = (params: LoginInfo) => postAction('/sys/logout', params)

// 文章管理
export const addRecord = (params: NewArticleParams) => postAction('/sys/records/add', params)
export const getRecordList = (params: QueryArticleListParams) => getAction('/sys/records/list', params)
export const getRecordDetail = (params: ArticleIds) => getAction('/sys/records/detail', params)
export const deleteRecord = (params: DeleteRecordParams) => deleteAction('/sys/records/delete', params)
export const updateRecord = (params: UpdateArticleParams) => putAction('/sys/records/update', params)

// 上传封面图
export const uploadCover = (fileData: FormData) => postUploadImage('/sys/images/upload_cover', fileData)
// 删除封面图
export const deleteCover = (data: DeleteImageParams) => deleteAction('/sys/images/delete', data)
// 上传文章插图
// export const uploadIllustration = (fileData: FormData) => postUploadImage('/sys/images/upload_plate', fileData)


// 查询留言信息
export const getMessageList = (params: PageQueryParams) => getAction('/sys/messages/list', params)
export const deleteMessages = (data: DeleteMessagesParams) => deleteAction('/sys/messages/delete', data)

// 查询评论信息
export const getCommentList = (params: PageQueryParams) => getAction('/sys/comments/list', params)
export const deleteComments = (data: DeleteCommentsParams) => deleteAction('/sys/comments', data)

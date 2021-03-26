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
  PageQueryParams
} from '../types'

// 登录
export const login = (params: LoginParams) => postAction('/login', params)
// const logout = (params: LoginInfo) => postAction('/logout', params)

// 文章管理
export const addRecord = (params: NewArticleParams) => postAction('/sys/record/add', params)
export const getRecordList = (params: QueryArticleListParams) => getAction('/sys/record/list', params)
export const getRecordDetail = (params: ArticleIds) => getAction('/sys/record/detail', params)
export const deleteRecord = (params: ArticleIds) => deleteAction('/sys/record/delete', params)
export const updateRecord = (params: UpdateArticleParams) => putAction('/sys/record/update', params)

// 上传封面图
export const uploadCover = (fileData: FormData) => postUploadImage('/sys/image/upload_cover', fileData)
// 上传文章插图
export const uploadIllustration = (fileData: FormData) => postUploadImage('/sys/image/upload_plate', fileData)

// 删除图片
export const deleteImage = (data: DeleteImageParams | undefined) => deleteAction('/sys/image/delete', data)

// 查询留言信息
export const getMessageList = (params: PageQueryParams) => getAction('/sys/message', params)

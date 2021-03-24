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
  UpdateArticleParams
} from '../types'

// 登录
export const login = (params: LoginParams) => postAction('/sys/login', params)
// const logout = (params: LoginInfo) => postAction('/sys/logout', params)

// 文章管理
export const addRecord = (params: NewArticleParams) => postAction('/back/record/add', params)
export const getRecordList = (params: QueryArticleListParams) => getAction('/back/record/list', params)
export const getRecordDetail = (params: ArticleIds) => getAction('/back/record/detail', params)
export const deleteRecord = (params: ArticleIds) => deleteAction('/back/record/delete', params)
export const updateRecord = (params: UpdateArticleParams) => putAction('/back/record/update', params)

// 上传封面图
export const uploadCover = (fileData: FormData) => postUploadImage('/image/upload/cover', fileData)
// 上传文章插图
export const uploadIllustration = (fileData: FormData) => postUploadImage('/image/upload/illustration', fileData)

// 删除图片
export const deleteImage = (data: DeleteImageParams | undefined) => deleteAction('/image/delete', data)

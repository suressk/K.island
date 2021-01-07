/* eslint-disable */
import { postAction, postUploadImage, deleteAction } from '@/api/manage'
// import axios from 'axios'

// types
import { DeleteImageParams, LoginInfo, RecordInfo } from '@/types/paramsType'

// const postCompressImage = (params: FormData) => axios('https://zhitu.isux.us/index.php/preview/imgcompress', {
//   data: params,
//   method: 'post',
//   headers: {
//     'Content-Type': 'multipart/form-data'
//   }
// })

// 登录
const login = (params: LoginInfo) => postAction('/sys/login', params)
const logout = (params: LoginInfo) => postAction('/sys/logout', params)

// 新增文章
const addRecord = (params: RecordInfo) => postAction('/back/record/add', params)

// 上传封面图
const uploadCover = (fileData: FormData) => postUploadImage('/image/upload/cover', fileData)
// 上传文章插图
const uploadIllustration = (fileData: FormData) => postUploadImage('/image/upload/illustration', fileData)

// 删除图片
const deleteImage = (data: DeleteImageParams | undefined) => deleteAction('/image', data)

export {
  login,
  logout,
  addRecord,
  uploadCover,
  uploadIllustration,
  deleteImage
}

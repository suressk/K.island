import { postAction, postUploadImage, deleteAction, getAction } from '@/api/manage'

// @types
import { DeleteImageParams, LoginInfo, RecordInfo, GetListParams, RecordIds } from '@/@types'

// const postCompressImage = (params: FormData) => axios('https://zhitu.isux.us/index.php/preview/imgcompress', {
//   data: params,
//   method: 'post',
//   headers: {
//     'Content-Type': 'multipart/form-data'
//   }
// })

// 登录
export const login = (params: LoginInfo) => postAction('/sys/login', params)
// const logout = (params: LoginInfo) => postAction('/sys/logout', params)

// 文章管理
export const addRecord = (params: RecordInfo) => postAction('/back/record/add', params)
export const getRecordList = (params: GetListParams) => getAction('/back/record/list', params)
export const getRecordDetail = (params: RecordIds) => getAction('/back/record/detail', params)

// 上传封面图
export const uploadCover = (fileData: FormData) => postUploadImage('/image/upload/cover', fileData)
// 上传文章插图
export const uploadIllustration = (fileData: FormData) => postUploadImage('/image/upload/illustration', fileData)

// 删除图片
export const deleteImage = (data: DeleteImageParams | undefined) => deleteAction('/image', data)

// export {
//   login,
//   logout,
//   addRecord,
//   uploadCover,
//   uploadIllustration,
//   deleteImage
// }

/* eslint-disable */
import { getAction, postAction } from '@/api/manage'
import axios from 'axios'

import { LoginInfo, RecordInfo } from '@/types/record'

const getBg = (params: string | object) => getAction('/images/bg.webp', params = {})
const getHello = (params: string | object | undefined) => getAction('/', params = {})

const postCompressImage = (params: FormData) => axios('https://zhitu.isux.us/index.php/preview/imgcompress', {
  data: params,
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

// 登录 后台
const backLogin = (params: LoginInfo) => postAction('/sys/login', params)
const backLogout = (params: LoginInfo) => postAction('/sys/logout', params)

const addRecord = (params: RecordInfo) => postAction('/back/record/add', params)

export {
  getBg,
  getHello,
  postCompressImage,
  backLogin,
  backLogout,
  addRecord
}

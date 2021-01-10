import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElNotification } from 'element-plus'
import { getStorageToken } from '@/utils/util'
import { ResponseData, ErrorResponse } from '@/@types'

/* eslint-disable */
// @ts-ignore
const BASE_URL = window.__CONFIG.domainURL

const service: AxiosInstance = axios.create({
  baseURL: BASE_URL || '/',
  timeout: 9000
})

const handleError = (err: ErrorResponse) => {
  if (err.code === 'ECONNABORTED' && err.message.includes('timeout')) {
    ElNotification({
      type: 'error',
      title: 'Timeout',
      message: 'Timeout, Please Wait For Trying Again Later...'
    })
  }
  if (err.response) {
    // @ts-ignore
    const data = err.response.data
    const status = err.response.status
    switch (status) {
      case 403:
        ElNotification({
          type: 'error',
          title: status + '',
          message: 'Access Denied, Please Wait For Trying Again Later...'
        })
        break
      case 404:
        ElNotification({
          type: 'error',
          title: status + '',
          message: 'Resource Not Found...'
        })
        break
      case 500:
        ElNotification({
          type: 'error',
          title: status + '',
          message: 'Server Internal Error, Please Concat Author...'
        })
        break
      default:
        ElNotification({
          type: 'error',
          title: status + '',
          message: data.message,
          duration: 4
        })
        break
    }
  }
  return Promise.reject(err)
}

/**
 * request interceptor
 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.method === 'get') {
      config.params = {
        _t: Math.floor(Date.now() / 1000),
        ...config.params
      }
    }
    const token: string | null = getStorageToken()
    if (token) {
      config.headers.authorization = token
    }
    return config
  },
  err => Promise.reject(err)
)

/**
 * response interceptor
 */
// @ts-ignore
service.interceptors.response.use((resp): Promise<ResponseData> => {
  // const data = resp.data.data;
  // if (data.token) {
  //   // LocalStorage 存储 token
  //   setStorageToken(data.token)
  // }
  return resp.data
}, handleError)

export { service as axios }

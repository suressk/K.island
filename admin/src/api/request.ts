import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { notification } from 'ant-design-vue'
import { getStorageToken } from '../utils/util'
import { ResponseData, ErrorResponse } from '../types'

const service: AxiosInstance = axios.create({
  baseURL: 'http://localhost:9527' || '/',
  timeout: 9000
})

const handleError = (err: ErrorResponse) => {
  if (err.code === 'ECONNABORTED' && err.message.includes('timeout')) {
    notification({
      type: 'error',
      title: 'Timeout',
      message: 'Request Timeout, Please Wait For Trying Again Later...'
    })
  }
  if (err.response) {
    // @ts-ignore
    const data = err.response.data
    const status = err.response.status
    switch (status) {
      case 403:
        notification({
          type: 'error',
          title: status + '',
          message: 'Token Expired...'
        })
        break
      case 404:
        notification({
          type: 'error',
          title: status + '',
          message: 'Resource Not Found...'
        })
        break
      case 500:
        notification({
          type: 'error',
          title: status + '',
          message: 'Server Internal Error...'
        })
        break
      default:
        notification({
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
service.interceptors.response.use((resp: AxiosResponse): AxiosResponse<ResponseData<object>> => {
  // const data = resp.data.data;
  // if (data.token) {
  //   // LocalStorage 存储 token
  //   setStorageToken(data.token)
  // }
  return resp.data
}, handleError)

export { service as axios }

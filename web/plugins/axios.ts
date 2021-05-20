/**
 * @nuxt/axios 封装
 * store, router, redirect, req,
 * */
import { AxiosResponse } from 'axios'
import { ErrorResponse, ResponseRes } from '~/types'

export const domainUrl = 'http://localhost:9527' // 默认请求路径

// @ts-ignore
export default function({ app: { $axios } }) {
  $axios.defaults.baseURL = domainUrl

  // response拦截器，数据返回后，可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(
    <D>(response: AxiosResponse): AxiosResponse<ResponseRes<D>> => response.data,
    // @ts-ignore 直接返回接口返回的错误信息
    (error: ErrorResponse) => Promise.reject(error.response?.data)
  )
}

/**
 * @nuxt/axios 封装
 * store, router, redirect, req,
 * */
import { AxiosResponse } from 'axios'
import { ErrorResponse, ResponseRes } from '~/types'

// @ts-ignore
export default function ({ app: { $axios } }) {
  // $axios.defaults.baseURL = 'https://www.suressk.com' // 默认请求路径
  $axios.defaults.baseURL = 'http://localhost:9527' // 默认请求路径

  // response拦截器，数据返回后，可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse<ResponseRes> => response.data,
    // @ts-ignore 直接返回接口返回的错误信息
    (error: ErrorResponse) => Promise.reject(error.response?.data)
  )
}

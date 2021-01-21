/**
 * @nuxt/axios 封装
 * store, router,
 * */
import { AxiosResponse } from 'axios'
import { ErrorResponse } from '@/@types'

// @ts-ignore
export default function ({ redirect, req, app: { $axios } }) {
  // $axios.defaults.baseURL = 'https://www.suressk.com' // 默认请求路径
  $axios.defaults.baseURL = 'http://localhost:9527' // 默认请求路径
  // if (process.server) {
  //   // 获取服务端的token
  //   const token = getCookie.getcookiesInServer(req).token
  // }
  // request拦截器
  $axios.onRequest(() => {
    if (process.client) {
      // 客户端下，请求进度条开始
      // NProgress.start()
    }
    // 将获取到token加入到请求头中
    // config.headers.common.Authorization = token
  })

  // response拦截器，数据返回后，可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(
    (response: AxiosResponse) => {
      if (process.client) {
        // 客户端下， 请求进度条结束
        // NProgress.done()
      }
      return response.data
      // return response
      // if (response.data.code === 401) {
      //   // 返回401，token验证失败，清除客户端cookie
      //   // Cookie.remove('token')
      //   // 重定向到登录页面， 这里做一个判断，容错：req.url 未定义
      //   if (req.url) {
      //     redirect('/sign?ref=' + req.url)
      //   } else {
      //     redirect('/sign')
      //   }
      // } else if (response.data.code === 404) {
      //   // 重定向到404页面
      //   redirect('/404')
      // } else {
      //   // 请求接口数据正常，返回数据
      //   return response.data
      // }
    },
    (error: ErrorResponse) => {
      if (process.client) {
        // NProgress.done()
      }
      if (error.response.status === 500) {
        redirect('/')
      }
      if (error.response.status === 404) {
        redirect('/404')
      }
      return Promise.reject(error.response) // 返回接口返回的错误信息
    })
}

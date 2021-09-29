/**
 * nuxt.config.js
 * 此 plugin ssr 置为 false
 * 如若置为 true，服务器环境下无 document 对象会报错
 * */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

export default ({ app: { router } }: any) => {
  // 前置守卫 => loader 显示加载状态
  router.beforeEach((to: any, from: any, next: () => void) => {
    NProgress.start()
    next()
  })

  // 后置守卫 => loader 隐藏
  router.afterEach(() => {
    // to: any, from: any
    // console.log('afterEach from: ', from)
    // console.log('afterEach to: ', to)
    NProgress.done()
  })
}

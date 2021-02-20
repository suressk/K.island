import Vue from 'vue'
import { NotifyOptions, createNotify } from '../utils/notify'
import { ILoadImageItem } from '~/@types'
import Notification from '../components/notification'

// // @ts-ignore
// import { ComponentInternalInstance } from '@vue/runtime-core'

// 存储所有 notify 弹窗 Element 元素
const notifications: HTMLElement[] = []
let notifyContainer: HTMLElement | undefined

const common = {
  // @ts-ignore
  install (Vue) {
    // 节流
    Vue.prototype.$throttle = (fn: Function, delay: number = 3000) => {
      // let flag = true
      // let timer: any
      // return function (...args: any[]) {
      //   if (flag) {
      //     flag = false
      //     timer && clearTimeout(timer)
      //     timer = setTimeout(() => {
      //       // @ts-ignore
      //       fn.apply(this, args)
      //       flag = true
      //     }, interval)
      //   }
      // }
      let timer: null | number = null
      let startTime: number
      return function (...args: any[]) {
        // @ts-ignore
        const ctx = this,
          now = new Date().getTime()
        if (startTime && now < startTime + delay) {
          if (timer) clearTimeout(timer)
          timer = window.setTimeout(() => {
            startTime = now
            fn.apply(ctx, args)
          }, delay)
        } else {
          startTime = now
          fn.apply(ctx, args)
        }
      }
    }

    // 防抖
    Vue.prototype.$debounce = (fn: Function, delay: number, immediate: boolean) => {
      let timer: null | number = null
      return function () {
        // @ts-ignore
        let ctx = this
        let callNow
        if (timer) clearTimeout(timer)
        if (immediate) {
          callNow = !timer
          if (callNow) {
            fn.apply(ctx, arguments)
          }
          timer = window.setTimeout(() => {
            timer = null
          }, delay)
        } else {
          timer = window.setTimeout(() => {
            fn.apply(ctx, arguments)
          }, delay)
        }
      }
    }
    /**
     * options
      {
        type: 'success',
        title: 'Notify',
        message: 'Attention Please'
      }
    */
    // Message Notification - Native JS achieve
    Vue.prototype.$notify = (options: NotifyOptions) => {
      if (typeof window == undefined) return
      const defaultTimeout = 5000
      if (notifyContainer === undefined) {
        notifyContainer = document.createElement('div')
        notifyContainer.className = 'notify-container'
        document.body.appendChild(notifyContainer)
      }
      const notifyEl = createNotify(options)
      notifications.push(notifyEl)
      notifyContainer.appendChild(notifyEl)
      new Promise((resolve) => {
        setTimeout(() => {
          notifyEl.classList.remove('notify-enter')
        }, 100)
        setTimeout(() => {
          notifyEl.classList.add('notify-enter')
        }, defaultTimeout - 600)
        setTimeout(() => {
          const index = notifications.findIndex(item => item === notifyEl)
          notifyContainer && notifyContainer.removeChild(notifyEl)
          notifications.splice(index, 1) // 移除 notifyEl
          resolve(1)
        }, defaultTimeout)
      }).then(() => {
        // console.log('success: ', val);
        if (notifications.length === 0) {
          notifyContainer && document.body.removeChild(notifyContainer)
          notifyContainer = undefined
        }
      })
    }
    // Message Notification Vue.extend() API achieve
    Vue.prototype.$notification = (options: NotifyOptions) => {
      Notification(options)
    }

    function getWin(type: string) {
      // @ts-ignore
      return document.documentElement[type] || document.body[type]
    }
    // 设置滚动条位置
    Vue.prototype.$scroll = (domSelector: string, type: string, speed = 10) => {
      // DOM元素 计算位置
      const dom = document.querySelector(domSelector) as HTMLElement
      const top = dom.offsetTop
      let target: number
      if (type === 'top') {
        target = 0
      } else if (type === 'comment') {
        const commentDom = <HTMLElement>document.querySelector('.comment-form')
        const h = commentDom.offsetHeight
        target = top - getWin('clientHeight') + h
      } else {
        
      }
    }

    /**
     * 首页图片懒加载
     */
    let listenList: ILoadImageItem[] = []

    Vue.directive('lazy', {
      inserted: (el: HTMLImageElement, binding: { value: any }) => {
        const src = binding.value
        listenList.push({ el, src })
        window.addEventListener('scroll', watch)
        lazyLoadImg({ el, src })
      },
      unbind: () => {
        window.removeEventListener('scroll', watch)
      }
    })

    // 使用函数，切换路由，可清除监听事件
    const watch = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      Vue.prototype.$throttle(() => listenList.map(img => lazyLoadImg(img)) , 50)()
    }

    // 图片懒加载
    const lazyLoadImg = (loadItem: ILoadImageItem) => {
      const { el, src } = loadItem
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      const elTop = el.getBoundingClientRect().top
      const show = elTop <= windowHeight + 500 // 屏幕高度 + 500px 范围内加载
      if (src && show) {
        let img = new Image()
        img.src = src
        img.onload = e => {
          el.src = src
          const index = listenList.indexOf(loadItem)
          index > -1 && listenList.splice(index, 1)
        }
      }
    }
  }
}

Vue.use(common)

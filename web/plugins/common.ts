import Vue from 'vue'
import { NotifyOptions, createNotify } from '../uitls/notify'
import Notification from '../components/notification'

// @ts-ignore
import { ComponentInternalInstance } from '@vue/runtime-core'

// 存储所有 notify 弹窗 Element 元素
const notifications: HTMLElement[] = []
let notifyContainer: HTMLElement | undefined

const common = {
  // @ts-ignore
  install (Vue: ComponentInternalInstance) {
    // 防抖函数
    Vue.prototype.$throttle = (fn: Function, interval: number) => {
      let flag = true
      let timer: any
      return function (...args: any[]) {
        if (flag) {
          flag = false
          timer && clearTimeout(timer)
          timer = setTimeout(() => {
            // @ts-ignore
            fn.apply(this, args)
            flag = true
          }, interval)
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
    // 消息提示弹窗
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

    Vue.prototype.$notification = (options: NotifyOptions) => {
      Notification(options)
    }
  }
}

Vue.use(common)

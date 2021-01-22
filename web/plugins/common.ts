import Vue from 'vue'
import { NotifyOptions, CreateNotify } from '@/uitls'

// @ts-ignore
import { ComponentInternalInstance } from '@vue/runtime-core'

const notifications: any[] = [] // 存储所有 notify 弹窗
let notifyContainer: HTMLElement | undefined

const common = {
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

    // 消息提示弹窗
    Vue.prototype.$notify = (options = {}) => {
      if (typeof window == undefined) return
      if (notifyContainer === undefined) {
        notifyContainer = document.createElement('div')
        notifyContainer.className = 'notify-container'
      }
      // let verticalOffset = 0 // 默认垂直偏移为 0
      // const 
      const curPositionNotifications = notifications.forEach((item, index) => {
        
      })
    }
  }
}

Vue.use(common)

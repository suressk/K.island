import Vue from 'vue'
// @ts-ignore
import { ComponentInternalInstance } from '@vue/runtime-core'

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
  }
}

Vue.use(common)

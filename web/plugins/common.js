import Vue from 'vue'

const common = {
  install (Vue) {
    // 防抖函数
    Vue.prototype.$throttle = (fn, interval) => {
      let flag = true
      let timer = null
      return function (...args) {
        if (flag) {
          flag = false
          timer && clearTimeout(timer)
          timer = setTimeout(() => {
            fn.apply(this, args)
            flag = true
          }, interval)
        }
      }
    }
  }
}

Vue.use(common)

import Vue from 'vue'
import { ILoadImageItem, NotificationOptions } from '~/@types'
import Notification from '~/components/notification'
import { throttle, debounce, singleScroll, addListener, removeListener } from '~/utils/util'
// import { ComponentInstance } from '@nuxtjs/composition-api'

const common = {
  // @ts-ignore
  install (Vue) {
    // 节流
    Vue.prototype.$throttle = throttle

    // 防抖
    Vue.prototype.$debounce = debounce

    // Message Notification Vue.extend() API achieve
    Vue.prototype.$notification = (options: NotificationOptions) => {
      Notification(options)
    }

    // 设置滚动条位置
    Vue.prototype.$singleScroll = singleScroll

    /** 首页图片懒加载 */
    let listenList: ILoadImageItem[] = []

    Vue.directive('lazy', {
      inserted: (el: HTMLImageElement, binding: { value: any }) => {
        const src = binding.value
        listenList.push({ el, src })
        addListener(window, 'scroll', watch)
        lazyLoadImg({ el, src })
      },
      unbind: () => {
        removeListener(window, 'scroll', watch)
      }
    })

    // 使用函数，切换路由，可清除监听事件
    const watch = () => {
      // const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      throttle(() => listenList.map(img => lazyLoadImg(img)) , 50)()
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
        img.onload = () => {
          el.src = src
          const index = listenList.indexOf(loadItem)
          index > -1 && listenList.splice(index, 1)
        }
      }
    }
  }
}

Vue.use(common)

import Vue from 'vue'
import { ILoadImageItem } from '~/@types'
import Confirm from "~/components/popConfirm";
import {
  throttle,
  debounce,
  singleScroll,
  addListener,
  removeListener,
  getWindowProp
} from '~/utils/util'

const common = {
  // @ts-ignore
  install (Vue) {
    // 节流
    Vue.prototype.$throttle = throttle

    // 防抖
    Vue.prototype.$debounce = debounce

    // 设置滚动条位置
    Vue.prototype.$singleScroll = singleScroll

    // 确认弹框
    Vue.prototype.$confirm = Confirm

    /** 首页图片懒加载 */
    const listenList: ILoadImageItem[] = []

    Vue.directive('lazy', {
      inserted: (el: HTMLImageElement, binding: { value: any }) => {
        const src = binding.value
        listenList.push({ el, src })
        addListener(window, 'scroll', watch)
        lazyLoadImg({ el, src })
      }
    })

    // 使用函数，切换路由，可清除监听事件
    const watch = () => {
      throttle(() => listenList.map(img => lazyLoadImg(img)) , 100)()
    }

    // 图片懒加载
    const lazyLoadImg = (loadItem: ILoadImageItem) => {
      const { el, src } = loadItem
      const windowHeight = getWindowProp('clientHeight')
      const elInfo = el.getBoundingClientRect()
      const show = elInfo.bottom + 100 > 0 && elInfo.top - windowHeight < 0
      if (src && show) {
        let img = new Image()
        img.src = src
        img.onload = () => {
          el.src = src
          const index = listenList.indexOf(loadItem)
          index > -1 && listenList.splice(index, 1)
          // 监听列表为空时移除滚动条监听
          if (listenList.length === 0) {
            removeListener(window, 'scroll', watch)
          }
        }
      }
    }
  }
}

Vue.use(common)

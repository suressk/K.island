import { throttle, addListener, removeListener, getWindowProp } from '~/utils/util'

export default {
  data() {
    return {
      scrollerIsBottom: false,
      currentScrollTop: null,
      scrollDirection: null,
      scrollFunc: () => {}
    }
  },
  methods: {
    handleScroll() {
      /**
       * scrollTop: 滚动条滚动距离
       * scrollHeight: 整屏高度（含不可见区域）
       * clientHeight: 可视区高度
       * */
      const props = ['scrollTop', 'scrollHeight', 'clientHeight']
      // @ts-ignore
      const [scrollTop, scrollHeight, windowH] = props.map(prop => getWindowProp(prop))

      if (scrollHeight === windowH) {
        return
      }
      // @ts-ignore
      this.currentScrollTop = scrollTop
      // @ts-ignore
      this.scrollerIsBottom = ((scrollTop + windowH) >= (scrollHeight - 10))
    }
  },
  beforeMount() {
    // @ts-ignore
    this.scrollFunc = throttle(this.handleScroll, 100)
    // @ts-ignore
    addListener(window, 'scroll', this.scrollFunc)
    // @ts-ignore
    this.handleScroll()
  },
  beforeDestroy() {
    // @ts-ignore
    removeListener(window, 'scroll', this.scrollFunc)
  },
  watch: {
    currentScrollTop(top: number, lastTop: number) {
      if (top === null || top === undefined) {
        return
      }
      // @ts-ignore
      this.scrollDirection = (top - lastTop < 0) ? 'top' : 'bottom'
    }
  }
}

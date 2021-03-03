import {
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  getCurrentInstance
} from '@nuxtjs/composition-api'
import {
  preventDefault,
  throttle,
  getCurrentTime,
  removeListener,
  plainArticleList
} from '~/utils/util'
import RainInit from '~/components/rainEffect'
import Notification from '../components/notification'

/**
 * 首页 composition-api 代码风格 写法抽离
 */
export default function useIndex() {
  const vm = getCurrentInstance()!.proxy
  // @ts-ignore
  const axios = vm.$axios
  const sceneHeight = ref<string>('100%')
  const sceneWidth = ref<string>('100%')
  const showNav = ref<boolean>(false)
  /**
   * -1 无可加载更多内容
   *  0 可加载更多内容
   *  1 正在加载...
   * */
  const loadStatus = ref<number>(0)
  const today = ref<string>('')
  const curPage = ref<number>(1)

  function init() {
    sceneHeight.value = document.documentElement.clientHeight + 'px'
    sceneWidth.value = document.documentElement.clientWidth + 'px'
  }

  function handleToggleNav() {
    showNav.value = !showNav.value
    // 菜单可见
    if (showNav.value) {
      // addListener(document, 'touchmove', preventDefault)
      document.addEventListener('touchmove', preventDefault, {passive: false})
    } else {
      removeListener(document, 'touchmove', preventDefault)
    }
    // 下拉菜单可见 => 整页不可滚动
    document.body.style.overflowY = showNav.value ? 'hidden' : ''
  }

  async function handleLoadMore() {
    curPage.value += 1
    try {
      loadStatus.value = 1
      const res = await axios('/records/list', {
        params: {
          pageNo: curPage.value,
          pageSize: 10
        }
      })
      if (res.succss) {
        // @ts-ignore
        vm.articleList = [...vm.articleList, ...plainArticleList(res.data)]
      }
      // @ts-ignore
      if (vm.articleList.length === res.total) {
        nextTick(() => {
          loadStatus.value = -1
        })
      } else {
        nextTick(() => {
          loadStatus.value = 0
        })
      }
    } catch (e) {
      Notification({
        title: 'Error',
        type: 'error',
        message: 'Fail to load more article, please contact the website owner, thanks ~'
      })
      nextTick(() => {
        loadStatus.value = 0
      })
    }
  }

  onMounted(() => {
    today.value = getCurrentTime()
    RainInit()
    const windowResize = throttle(init, 100)
    window.onresize = () => {
      windowResize()
    }
  })

  onBeforeUnmount(() => {
    window.onresize = null
    document.body.style.overflowY = ''
  })

  return {
    today,
    showNav,
    loadStatus,
    sceneHeight,
    sceneWidth,
    handleToggleNav,
    handleLoadMore
  }
}

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
  plainArticleList,
  failLoadNotify
} from '~/utils/util'
import RainInit from '~/components/rainEffect'

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

  let loadingTimer: number = 0

  function init() {
    sceneHeight.value = document.documentElement.clientHeight + 'px'
    sceneWidth.value = document.documentElement.clientWidth + 'px'
  }

  function nextChangeLoadStatus(data: any) {
    // @ts-ignore
    vm.articleList = [...vm.articleList, ...plainArticleList(data.list)]
    // @ts-ignore 总条数
    if (vm.articleList.length === data.total) {
      nextTick(() => {
        loadStatus.value = -1
      })
    } else {
      curPage.value += 1
      nextTick(() => {
        loadStatus.value = 0
      })
    }
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

  // TODO =========================================================================== 加载更多 待处理
  async function handleLoadMore() {
    const start = Date.now()
    try {
      // loading
      loadStatus.value = 1
      const { success, data } = await axios('/records/list', {
        params: {
          pageNo: curPage.value + 1,
          pageSize: 10
        }
      })
      const end = Date.now()
      if (success) {
        // 500ms 加载状态
        if (end - start >= 500) {
          nextChangeLoadStatus(data)
        } else {
          if (loadingTimer) clearTimeout(loadingTimer)
          loadingTimer = window.setTimeout(() => {
            nextChangeLoadStatus(data)
          }, 500)
        }
      }
    } catch (e) {
      if (loadingTimer) clearTimeout(loadingTimer)
      loadingTimer = window.setTimeout(() => {
        failLoadNotify('more article')
        nextTick(() => {
          loadStatus.value = 0
        })
      }, 500)
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

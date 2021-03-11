import {
  ref,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
  nextTick
} from '@nuxtjs/composition-api'
import {
  preventDefault,
  throttle,
  getCurrentTime,
  removeListener,
  plainArticleList,
  commitMutations
} from '~/utils/util'
import RainInit from '~/components/rainEffect/index'
import { useState } from '~/utils/useStore'
import {
  M_SET_LOAD_STATUS,
  M_SET_CURRENT_PAGE,
  LOADING,
  LOAD_MORE,
  NO_MORE, LOAD_STATUS, CURRENT_PAGE, TOTAL_ITEMS
} from '~/store/mutation-types'

/**
 * 首页 composition-api 代码风格 写法抽离
 */
export default function useIndex() {
  const vm = getCurrentInstance()!.proxy
  // @ts-ignore
  const axios = vm.$axios
  const sceneHeight = ref<number>(0)
  const sceneWidth = ref<number>(0)
  const showNav = ref<boolean>(false)

  const loadStatus = useState(vm.$store, LOAD_STATUS)
  const curPage = useState(vm.$store, CURRENT_PAGE)
  const totalItems = useState(vm.$store, TOTAL_ITEMS)
  const today = ref<string>('')

  /**
   * 加载更多是在浏览器端，用 number 类型也可
   * window.setTimeout() 才返回 number 类型
   * */
  let loadingTimer: any = 0

  function init() {
    sceneHeight.value = window.innerHeight
    sceneWidth.value = window.innerWidth
  }

  function nextChangeLoadStatus(data: any) {
    // @ts-ignore
    vm.articleList = [...vm.articleList, ...plainArticleList(data.list)]
    // @ts-ignore 总条数 还有更多
    if (vm.articleList.length < data.total) {
      // 当前页 +1
      commitMutations<number>(vm.$store, CURRENT_PAGE, curPage.value + 1)
      nextTick(() => {
        commitMutations<number>(vm.$store, M_SET_LOAD_STATUS, LOAD_MORE)
      })
      return
    }
    // 到头了~
    nextTick(() => {
      commitMutations<number>(vm.$store, M_SET_LOAD_STATUS, NO_MORE)
    })
  }

  function handleToggleNav() {
    showNav.value = !showNav.value
    // 菜单可见
    if (showNav.value) {
      document.documentElement.scrollTop = document.body.scrollTop = 0
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
      // loading status
      commitMutations<number>(vm.$store, M_SET_LOAD_STATUS, LOADING)
      const { success, data } = await axios('/records/list', {
        params: {
          pageNo: curPage.value,
          pageSize: 10
        }
      })
      const end = Date.now()
      if (success) {
        // 500ms 加载状态
        if (end - start > 500) {
          nextChangeLoadStatus(data)
        } else {
          if (loadingTimer) clearTimeout(loadingTimer)
          loadingTimer = setTimeout(() => {
            nextChangeLoadStatus(data)
          }, 500)
        }
      }
    } catch (e) {
      if (loadingTimer) clearTimeout(loadingTimer)
      loadingTimer = setTimeout(() => {
        nextTick(() => {
          commitMutations<number>(vm.$store, M_SET_LOAD_STATUS, NO_MORE)
        })
      }, 500)
    }
  }

  onMounted(() => {
    init()
    RainInit()
    today.value = getCurrentTime()
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
    totalItems,
    showNav,
    loadStatus,
    sceneHeight,
    sceneWidth,
    handleToggleNav,
    handleLoadMore
  }
}

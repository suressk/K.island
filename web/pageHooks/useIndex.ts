import {
  ref,
  Ref,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
  nextTick
} from '@nuxtjs/composition-api'
import {
  throttle,
  getCurrentTime,
  addListener,
  removeListener,
  commitMutations,
  errorNotify,
  useState,
  waitForCalling
} from '~/utils'
import {
  M_SET_LOAD_STATUS,
  M_SET_CURRENT_PAGE,
  LOADING,
  HAS_MORE,
  NO_MORE,
  CURRENT_PAGE,
  TOTAL_ITEMS
} from '~/store/mutation-types'
import rainInit, { loadTextures } from '~/components/rainEffect'
import { ArticleItem, ArticleDetail } from '~/types'

/**
 * 首页 composition-api 代码风格 写法抽离
 */
export default function useIndex() {
  const vm = getCurrentInstance()!.proxy
  const axios = vm.$axios
  const sceneHeight = ref<string>('100%')
  const sceneWidth = ref<string>('100%')
  const showNav = ref<boolean>(false)

  // const loadStatus = useState(vm.$store, LOAD_STATUS)
  const curPage = useState(vm.$store, CURRENT_PAGE)
  const totalItems = useState(vm.$store, TOTAL_ITEMS)
  const today = ref<string>('')

  const articleList: Ref<ArticleItem[]> = ref([])

  /**
   * 加载更多是在浏览器端，用 number 类型也可
   * window.setTimeout() 才返回 number 类型
   * */
  let loadingTimer: any = 0

  function pageInit() {
    sceneHeight.value = document.documentElement.clientHeight + 'px'
    sceneWidth.value = document.documentElement.clientWidth + 'px'
    // rainInit('coverContainer')
  }

  const resizeListener = throttle(pageInit, 100)

  function init() {
    loadTextures().then(() => {
      rainInit('coverContainer')
      pageInit()
    })
    // 加载首屏数据（解决服务端渲染导致回到首页会 vuex 状态重置而重复加载文章列表的问题）
    handleLoadMore()
    today.value = getCurrentTime()
    addListener(window, 'resize', resizeListener)

    /**
     * 页面初始化滚动禁止
     */
    showNav.value = false
    document.body.style.overflowY = ''
  }

  // navigation
  function handleToggleNav() {
    showNav.value = !showNav.value
    // 下拉菜单可见 => 整页不可滚动
    document.body.style.overflowY = showNav.value ? 'hidden' : ''
  }

  function nextChangeLoadStatus(data: { list: ArticleItem[], total: number }) {
    articleList.value = [...articleList.value, ...data.list]
    // 还有更多
    if (articleList.value.length < data.total) {
      // 当前页 +1
      commitMutations<number>(vm.$store, M_SET_CURRENT_PAGE, curPage.value + 1)
      nextTick(() => {
        commitMutations<number>(vm.$store, M_SET_LOAD_STATUS, HAS_MORE)
      })
      return
    }
    // 到头了~
    nextTick(() => {
      commitMutations<number>(vm.$store, M_SET_LOAD_STATUS, NO_MORE)
    })
  }

  function handleToDetail(info: ArticleItem) {
    const { uid, id } = info
    vm.$router.push({
      path: `/article/${uid}_${id}`
    })
  }

  // 事件触发跳转页面
  // function handleToPage (path: string) {
  //   vm.$router.push(path)
  //   showNav.value = false // 隐藏 nav
  //   document.body.style.overflowY = ''
  // }

  async function handleLoadMore() {
    const start = Date.now()
    try {
      // loading status
      commitMutations<number>(vm.$store, M_SET_LOAD_STATUS, LOADING)
      const { success, data } = await axios('/record/list', {
        params: {
          pageNo: curPage.value,
          pageSize: 5,
          index: 1
        }
      })
      const end = Date.now()
      if (success) {
        // 1s loading 动画
        if (end - start >= 1000) {
          nextChangeLoadStatus(data)
        } else {
          if (loadingTimer) clearTimeout(loadingTimer)
          // 1s ~ 2s loading
          loadingTimer = waitForCalling(() => nextChangeLoadStatus(data), 1000)
        }
      }
    } catch (e) {
      if (loadingTimer) clearTimeout(loadingTimer)
      loadingTimer = waitForCalling(() => {
        nextTick(() => {
          errorNotify('Something wrong with getting the article list')
          commitMutations<number>(vm.$store, M_SET_LOAD_STATUS, HAS_MORE)
        })
      }, 1000)
    }
  }

  onMounted(() => { init() })

  onBeforeUnmount(() => {
    removeListener(window, 'resize', resizeListener)
    // removeListener(document, 'touchmove', preventDefault)
    // 隐藏 nav 菜单
    showNav.value = false
    document.body.style.overflow = ''
  })

  return {
    today,
    totalItems,
    articleList,
    showNav,
    sceneHeight,
    sceneWidth,
    handleToggleNav,
    handleLoadMore,
    handleToDetail
  }
}

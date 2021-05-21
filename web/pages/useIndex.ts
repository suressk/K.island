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
  addListener,
  removeListener,
  commitMutations,
  errorNotify
} from '~/utils/util'
import {
  M_SET_LOAD_STATUS,
  M_SET_CURRENT_PAGE,
  LOADING,
  LOAD_MORE,
  NO_MORE,
  LOAD_STATUS,
  CURRENT_PAGE,
  TOTAL_ITEMS
} from '~/store/mutation-types'
import {loadTextures , rainInit} from '~/components/rainEffect'
import {useState} from '~/utils/useStore'
import {ArticleDetail} from '~/types'

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

  const loadStatus = useState(vm.$store, LOAD_STATUS)
  const curPage = useState(vm.$store, CURRENT_PAGE)
  const totalItems = useState(vm.$store, TOTAL_ITEMS)
  const today = ref<string>('')

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
    // if (showNav.value) {
    //   document.documentElement.scrollTop = document.body.scrollTop = 0
    //   document.body.style.overflowY = 'hidden'
    //   // document.addEventListener('touchmove', preventDefault, {passive: false})
    // } else {
    //   document.body.style.overflowY = ''
    //   // removeListener(document, 'touchmove', preventDefault)
    // }
  }

  function nextChangeLoadStatus(data: any) {
    // @ts-ignore
    vm.articleList = [...vm.articleList, ...data.list]
    // @ts-ignore 总条数 还有更多
    if (vm.articleList.length < data.total) {
      // 当前页 +1
      commitMutations<number>(vm.$store, M_SET_CURRENT_PAGE, curPage.value + 1)
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

  function handleToDetail(info: ArticleDetail) {
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
          errorNotify('更多文章加载失败辣，跟 小K. 说一声吧~')
          commitMutations<number>(vm.$store, M_SET_LOAD_STATUS, LOAD_MORE)
        })
      }, 500)
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
    showNav,
    loadStatus,
    sceneHeight,
    sceneWidth,
    handleToggleNav,
    handleLoadMore,
    handleToDetail
  }
}

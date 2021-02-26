import {
  ref,
  onMounted,
  onBeforeUnmount
} from '@nuxtjs/composition-api'
import { preventDefault, throttle, getCurrentTime } from '~/utils/util'
import RainInit from '~/components/rainEffect'
// import Notification from '../components/notification'

/**
 * 首页 composition-api 代码风格 写法抽离
 */
export default function useIndex() {
  const sceneHeight = ref<string>('100%')
  const sceneWidth = ref<string>('100%')
  const showNav = ref<boolean>(false)
  const loadStatus = ref<string>('loadMore')
  const curTime = ref<string>('')

  function init() {
    sceneHeight.value = document.documentElement.clientHeight + 'px'
    sceneWidth.value = document.documentElement.clientWidth + 'px'
  }

  function handleToggleNav() {
    showNav.value = !showNav.value
    // 菜单可见
    if (showNav.value) {
      document.addEventListener('touchmove', preventDefault, {passive: false})
    } else {
      document.removeEventListener('touchmove', preventDefault)
    }
    // 下拉菜单可见 => 整页不可滚动
    document.body.style.overflowY = showNav.value ? 'hidden' : ''
  }

  function handleLoadMore() {
    loadStatus.value = 'loading'
    setTimeout(() => {
      loadStatus.value = 'noMore'
    }, 6000)
    setTimeout(() => {
      loadStatus.value = 'loadMore'
    }, 8000)
  }

  onMounted(() => {
    curTime.value = getCurrentTime()
    RainInit()
    const windowResize = throttle(init, 100)
    window.onresize = () => {
      windowResize()
    }
    document.body.className = "dark"
  })

  onBeforeUnmount(() => {
    window.onresize = null
    document.body.style.overflowY = ''
  })

  return {
    curTime,
    showNav,
    loadStatus,
    sceneHeight,
    sceneWidth,
    handleToggleNav,
    handleLoadMore
  }
}

import { getCurrentInstance, ref, Ref, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api'

import {
  HAS_MORE,
  NO_MORE,
  M_SET_TOTAL_ITEMS,
  M_SET_LOAD_STATUS,
  CURRENT_PAGE,
  M_RESET_LOAD_MORE,
  M_SET_CURRENT_PAGE,
  LOAD_STATUS,
  MSG_TIP_SHOW,
  LEAVE_MSG_LIMIT,
  LOADING
} from '~/store/mutation-types'

import {
  commitMutations,
  DEFAULT_ERROR_TIP,
  errorNotify,
  getStorageItem,
  isToday,
  PAGE_SIZE,
  setStorageItem,
  successNotify,
  useState,
  warnNotify
} from '~/utils'

import { MsgListItem } from '~/types'

interface MessagesReturns {
  msgList: Ref<MsgListItem[]>
  DATE_FORMAT: string
  showTip: Ref<boolean>
  modalVisible: Ref<boolean>
  nickName: Ref<string>
  messageContent: Ref<string>
  toggleTip: (flag: boolean) => void
  showModal: () => void
  hideModal: () => void
  leaveMessage: () => Promise<void>
}

interface MsgLimitInfo {
  time: number
  name: string
}

const DATE_FORMAT = 'YYYY-MM-DD' // 时间格式
const DAY_MILLISECOND = 24 * 60 * 60 * 1000 // 一天的毫秒数

const useMessages = (): MessagesReturns => {
  const vm = getCurrentInstance()!.proxy

  const msgList = ref<MsgListItem[]>([])
  const showTip = ref<boolean>(false)
  const modalVisible = ref<boolean>(false)
  const nickName = ref<string>('')
  const messageContent = ref<string>('')

  const curPage = useState(vm.$store, CURRENT_PAGE)
  const loadStatus = useState(vm.$store, LOAD_STATUS)

  const showModal = () => {
    const localLimit = getStorageItem<MsgLimitInfo>(LEAVE_MSG_LIMIT)
    nickName.value = localLimit?.name ?? ''
    modalVisible.value = true
  }

  const hideModal = () => {
    modalVisible.value = false
    messageContent.value = ''
  }

  // 获取留言列表
  const getMessageList = async (nextPage: number = 1) => {
    commitMutations(vm.$store, M_SET_LOAD_STATUS, LOADING)
    try {
      const { success, data, message } = await vm.$axios.get('/message/list', {
        params: {
          pageNo: nextPage,
          pageSize: PAGE_SIZE
        }
      })
      if (success) {
        const { list, total } = data
        // 直接展开混合
        msgList.value = [...msgList.value, ...list]

        commitMutations(vm.$store, M_SET_TOTAL_ITEMS, total)
        // 当前页 +1
        commitMutations(vm.$store, M_SET_CURRENT_PAGE, nextPage + 1)

        // 展示条数 < 总条数
        if (msgList.value.length < total) {
          // 还有更多
          commitMutations(vm.$store, M_SET_LOAD_STATUS, HAS_MORE)
        } else {
          commitMutations(vm.$store, M_SET_LOAD_STATUS, NO_MORE)
        }
      } else {
        warnNotify(message ?? DEFAULT_ERROR_TIP)
      }
    } catch (err: any) {
      commitMutations(vm.$store, M_SET_LOAD_STATUS, HAS_MORE)
      errorNotify(err?.message ?? DEFAULT_ERROR_TIP)
    }
  }

  // 留言
  const leaveMessage = async () => {
    const localLimit = getStorageItem<MsgLimitInfo>(LEAVE_MSG_LIMIT)
    // 限定时间
    if (localLimit && isToday(localLimit.time)) {
      warnNotify('为了避免恶意或误操作留言刷屏，小K. 限定了一天只能写 1 条留言哦，明天再来叭~')
      return
    }
    try {
      const { success, message } = await vm.$axios.post('/message/add', {
        name: nickName.value,
        message: messageContent.value
      })
      if (success) {
        successNotify(message)
        setStorageItem<MsgLimitInfo>(LEAVE_MSG_LIMIT, {
          time: Date.now(),
          name: nickName.value
        })

        hideModal()

        await getMessageList()
      } else {
        warnNotify(message ?? DEFAULT_ERROR_TIP)
      }
    } catch (error: any) {
      errorNotify(error?.message ?? DEFAULT_ERROR_TIP)
    }
  }

  // 消息提示 显/隐
  const toggleTip = (flag: boolean) => {
    showTip.value = flag
    setStorageItem(MSG_TIP_SHOW, flag)
  }

  const initMsgLimit = () => {
    const localLimit = getStorageItem<MsgLimitInfo>(LEAVE_MSG_LIMIT)
    const tipMsgShow = getStorageItem<boolean>(MSG_TIP_SHOW)

    // 提示信息显隐
    showTip.value = tipMsgShow ?? true // => !null / !undefined

    // 初次加载 / 未曾留言
    if (localLimit === null) {
      const lastDay = Date.now() - DAY_MILLISECOND
      setStorageItem<MsgLimitInfo>(LEAVE_MSG_LIMIT, { time: lastDay, name: '' })
    }
  }

  // 滚动到页面底部触发加载更多
  // @ts-ignore
  watch(() => vm.scrollerIsBottom, (isBottom: boolean) => {
    if (isBottom && loadStatus.value === HAS_MORE) {
      getMessageList(curPage.value)
    }
  })

  onMounted(() => {
    getMessageList()
    initMsgLimit()
  })

  onBeforeUnmount(() => {
    commitMutations(vm.$store, M_RESET_LOAD_MORE)
  })

  return {
    showTip,
    modalVisible,
    nickName,
    messageContent,
    msgList,
    DATE_FORMAT,
    toggleTip,
    showModal,
    hideModal,
    leaveMessage
  }
}

export default useMessages
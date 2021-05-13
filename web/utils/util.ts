import { zhMonths } from './variable'
import { ArticleItem } from '~/types'
import { Store } from 'vuex'
import DAYJS from 'dayjs'
import notify from '~/components/notification'

const PRE_FIXED = 'K_'
const DATE_FORMAT = 'YYYY-MM-DD'

/**
 * Notification func
 * */
export function successNotify (message: string, duration: number = 4500) {
  return notify({
    type: 'success',
    title: 'Congratulations',
    message,
    duration
  })
}

export function warnNotify (message: string, duration: number = 4500) {
  return notify({
    type: 'warning',
    title: 'Sorry',
    message,
    duration
  })
}

export function errorNotify (message: string, duration: number = 4500) {
  return notify({
    type: 'error',
    title: 'Oops',
    message,
    duration
  })
}

/**
 * commit mutations
 * */
export function commitMutations<Payload> (
  store: Store<any>,
  type: string,
  payload?: Payload
) {
  store.commit(type, payload)
}

/**
 * 添加事件监听
 * */
export function addListener (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListener,
  useCapture: boolean = false
): void {
  element.addEventListener(event, handler, useCapture)
}

/**
 * 移除事件监听
 * */
export function removeListener (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListener
): void {
  element.removeEventListener(event, handler)
}

/**
 * 防抖
 * @param fn
 * @param delay
 * @param immediate
 */
export function debounce (fn: Function, delay: number, immediate: boolean = false) {
  let timer: any = null
  return function (...args: any[]) {
    // @ts-ignore
    const ctx = this
    let callNow
    if (timer !== null) clearTimeout(timer)
    if (immediate) {
      callNow = !timer
      if (callNow) {
        fn.apply(ctx, args)
      }
      timer = setTimeout(() => {
        timer = null
      }, delay)
    } else {
      timer = setTimeout(() => {
        fn.apply(ctx, args)
      }, delay)
    }
  }
}

export function getWindowProp(type: string) {
  // @ts-ignore
  return document.documentElement[type] || document.body[type]
}

/**
 * 滚动条滚动事件处理
 * */
let rafId = -1 // 存储调用 requestAnimationFrame() 的返回值，用于取消动画
export function singleScroll (domSelector: string, type: string = 'top', speed = 10) {
  // DOM元素 计算位置
  const dom = document.querySelector(domSelector) as HTMLElement
  const top = dom.offsetTop
  // 滚动的目标位置
  let target: number = 0
  if (type === 'top') {
    target = 0
  // } else if (type === 'comment') {
  //   // 评论
  //   const commentDom = <HTMLElement>document.querySelector('.comment-form')
  //   const commentHeight = commentDom.offsetHeight
  //   target = top - getWindowProp('clientHeight') + commentHeight
  } else {
    const index = type === 'index' ? 280 : -700
    target = top + (getWindowProp('clientHeight') / 2) + index
  }
  let lastScrollTop = 0  // 上次滚动到的位置点

  handleScroll()

  function handleScroll () {
    let scrollTop = getWindowProp('scrollTop')
    let distance = (target - scrollTop) / speed
    distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance)
    // const distance = scrollTop / speed // 减速回滚 —— 每次滚动距离
    // const distance = (scrollTop / speed) | 0 // 取整
    // const distance = ~~(scrollTop / speed) // 取整
    scrollTop = document.body.scrollTop = document.documentElement.scrollTop = scrollTop + distance

    let canceled
    switch (type) {
      case 'top':
        canceled = scrollTop === target || (lastScrollTop && (scrollTop > lastScrollTop))
        break
      // case 'comment':
      //   canceled = (lastScrollTop && scrollTop > lastScrollTop) || scrollTop <= target || scrollTop === 0
      //   break
      default:
        canceled = scrollTop <= lastScrollTop || (scrollTop + distance) >= target
    }
    // 到达目标位置或滚动滚轮取消滚动
    if (canceled) {
      window.cancelAnimationFrame(rafId)
      return
    }
    lastScrollTop = scrollTop // 记录此次滚动的位置
    rafId = window.requestAnimationFrame(handleScroll)
  }
}

/**
 * 节流
 * @param fn
 * @param delay
 */
export function throttle (fn: Function, delay: number = 3000) {
  let timer: any = null
  let startTime: number
  return function (...args: any[]) {
    // @ts-ignore
    const ctx = this
    const now = Date.now()
    if (startTime && now < startTime + delay) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        startTime = now
        fn.apply(ctx, args)
      }, delay)
    } else {
      startTime = now
      fn.apply(ctx, args)
    }
  }
}

/**
 * 阻止默认事件
 * @param e Event
 */
export function preventDefault (e: Event) {
  e.preventDefault()
}

/**
 * delay to call
 * */
export function waitForCalling(func: () => void, delay: number = 500) {
  return window.setTimeout(() => {
    func()
  }, delay)
}

/**
 * 校验 Email 格式
 * */
export function checkIsEmail (email: string): boolean {
  // const emailReg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  const emailReg = /\w+@([0-9a-zA-Z]+[-0-9a-zA-Z]*)(\.[0-9a-zA-Z]+[-0-9a-zA-Z]*)+/
  return emailReg.test(email)
}

/**
 * 获取当前时间：月 日 年 格式返回
 * */
export function getCurrentTime () {
  const date: Date = new Date()
  const year: number = date.getFullYear()
  const month: number = date.getMonth()
  const day: number = date.getDate()
  return `${zhMonths[month]} ${day}, ${year}`
}

/**
 * 获取 localstorage 存储的数据
 * */
export function getStorageItem<V> (key: string): null | V {
  const value = localStorage.getItem(PRE_FIXED + key)
  return (value ? JSON.parse(value) : null)
}

/**
 * 将数据存储到 localstorage
 * */
export function setStorageItem<V> (key: string, value: V): void {
  localStorage.setItem(PRE_FIXED + key, JSON.stringify(value))
}

/**
 * 插入 time: dateFormat() => time
 * 生成按年分组的数据
 * */
export function mapYearGroup (dataList: ArticleItem[]) {
  const data: any = {}
  const years: string[] = [] // 所有年份
  dataList.forEach(item => {
    if (!years.includes(item.time.year)) {
      years.push(item.time.year)
    }
  })
  const yearLen = years.length
  // 年份从大到小排序
  years.sort((a, b) => Number(b) - Number(a))
  for (let i = 0; i < yearLen; i++) {
    const sortData = dataList.filter(item => item.time.year === years[i])
    // 月份从大到小排序
    sortData.sort((a, b) => (b.time.monthNum - a.time.monthNum))
    data[years[i]] = sortData
  }
  return data
}

interface YearData<T> {
  [prop: string]: T[];
}

/**
 * create article list
 * example:
 * data: {
 *   2020: {
 *     Jan: [{}, {}, {}],
 *     Feb: [{}]
 *   },
 *   2021: {
 *     May: [{}, {}]
 *   }
 * }
 * */
export function createArticleListData (records: YearData<ArticleItem>) {
  const result: any = {}
  for (const yearStr in records) {
    result[yearStr] = createMonthGroup(records[yearStr])
  }
  return result
}

/**
 * 创建月分组
 * */
function createMonthGroup (data: ArticleItem[]) {
  const result: any = {}
  data.forEach(item => {
    const { time: { month } } = item // 'Jan'
    if (result[month] === undefined) {
      result[month] = [] // { Jan: [] }
    }
    result[month].push(item)
  })
  return result
}

/**
 * 平铺按年分组的文章列表
 * */
export function plainArticleList (records: YearData<ArticleItem>) {
  const years = Object.keys(records)
  const len = years.length
  const result: ArticleItem[] = []
  for (let i = 0; i < len; i++) {
    result.push(...records[years[i]])
  }
  return result
}

/**
 * 判断是否是今天（年月日 => 日期同一天）
 * */
export function isToday(time: number): boolean {
  const now = DAYJS(Date.now()).format(DATE_FORMAT).split('-') // today
  const other = DAYJS(new Date(time)).format(DATE_FORMAT).split('-') // anotherDay
  const today = {
    year: now[0],
    month: now[1],
    day: now[2]
  }
  const otherDay = {
    year: other[0],
    month: other[1],
    day: other[2]
  }
  return (today.year === otherDay.year &&
    today.month === otherDay.month &&
    today.day === otherDay.day);
}

/**
 * 解析查询参数
 * */
export function parseLocationSearch () {
  const searchStr = decodeURIComponent(location.search)
  const obj: any = {}
  if (searchStr) {
    const searchArr = searchStr.slice(1).split('&')
    searchArr.forEach(item => {
      const resArr = item.split('=')
      obj[resArr[0]] = resArr[1]
    })
    // return obj
  }
  return obj
}

import { zhMonths } from './variable'
import { ArticleItem } from '~/@types'
import { Store } from 'vuex'
// import dayjs from 'dayjs'

/**
 * commit mutations
 * */
export function commitMutations<Payload> (store: Store<any>, type: string, payload?: Payload) {
  if (payload) {
    store.commit(type, payload)
  } else {
    store.commit(type)
  }
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

function getWindowProp(type: string) {
  // @ts-ignore
  return document.documentElement[type] || document.body[type]
}

let rafId = -1

export function singleScroll (domSelector: string, type: string, speed = 10) {
  // DOM元素 计算位置
  const dom = document.querySelector(domSelector) as HTMLElement
  const top = dom.offsetTop
  // 滚动的目标位置
  let target: number
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

  // rafId = window.requestAnimationFrame(handleScroll)

  handleScroll()

  function handleScroll () {
    let scrollTop = getWindowProp('scrollTop')
    let len = (target - scrollTop) / speed
    // const distance = scrollTop / speed // 减速回滚 —— 每次滚动距离
    // const distance = (scrollTop / speed) | 0 // 取整
    // const distance = ~~(scrollTop / speed) // 取整
    // const distance = Math.floor(scrollTop / speed)
    len = len > 0 ? Math.ceil(len) : Math.floor(len)
    scrollTop = document.body.scrollTop = document.documentElement.scrollTop = scrollTop + len

    let canceled
    if (type === 'top') {
      canceled = scrollTop === target || (lastScrollTop && scrollTop > lastScrollTop)
    // } else if (type === 'comment') {
    //   canceled = (lastScrollTop && scrollTop > lastScrollTop) || scrollTop <= target || scrollTop === 0
    } else {
      canceled = scrollTop <= lastScrollTop || (scrollTop + len) >= target
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
 * 校验 Email 格式
 * */
export function checkEmail (email: string): boolean {
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
export function getStorageValue (key: string): null | string {
  return localStorage.getItem('K_' + key)
}

/**
 * 将数据存储到 localstorage
 * */
export function setStorageValue (key: string, value: string): void {
  localStorage.setItem('K_' + key, value)
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
  const years = Object.keys(records)
  const result: any = {}
  years.forEach(year => {
    result[year] = createMonthGroup(records[year])
  })
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

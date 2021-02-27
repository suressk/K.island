import { zhMonths } from './variable'
// import dayjs from 'dayjs'

/**
 * 添加事件监听
 * */
export function addListener (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListener,
  useCapture: boolean = false
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture)
  }
}

/**
 * 移除事件监听
 * */
export function removeListener (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListener
): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler)
  }
}

/**
 * 防抖
 * @param fn
 * @param delay
 * @param immediate
 */
export function debounce (fn: Function, delay: number, immediate: boolean = false) {
  let timer: null | number = null
  return function (...args: any[]) {
    // @ts-ignore
    let ctx = this
    let callNow
    if (timer !== null) clearTimeout(timer)
    if (immediate) {
      callNow = !timer
      if (callNow) {
        fn.apply(ctx, args)
      }
      timer = window.setTimeout(() => {
        timer = null
      }, delay)
    } else {
      timer = window.setTimeout(() => {
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
  let target: number // 滚动的目标位置
  if (type === 'top') {
    target = 0
  } else if (type === 'comment') {
    // 评论
    const commentDom = <HTMLElement>document.querySelector('.comment-form')
    const commentHeight = commentDom.offsetHeight
    target = top - getWindowProp('clientHeight') + commentHeight
  } else {
    const index = type === 'index' ? 280 : -700
    target = top + (getWindowProp('clientHeight') / 2) + index
  }
  let lastScrollTop = 0  // 上次滚动到的位置点

  rafId = window.requestAnimationFrame(handleScroll)

  function handleScroll () {
    let scrollTop = getWindowProp('scrollTop')
    let len = (target - scrollTop) / speed
    // const distance = scrollTop / speed // 减速回滚 —— 每次滚动距离
    // const distance = (scrollTop / speed) | 0 // 取整
    // const distance = ~~(scrollTop / speed) // 取整
    // const distance = Math.floor(scrollTop / speed)
    len = len > 0 ? Math.ceil(len) : Math.floor(len)
    scrollTop = document.body.scrollTop = document.documentElement.scrollTop = scrollTop + len

    let result
    if (type === 'top') {
      result = scrollTop === target || (lastScrollTop && scrollTop > lastScrollTop)
    } else if (type === 'comment') {
      result = (lastScrollTop && scrollTop > lastScrollTop) || scrollTop <= target || scrollTop === 0
    } else {
      result = scrollTop <= lastScrollTop || (scrollTop + len) >= target
    }
    // 到达目标位置或滚动滚轮取消滚动
    if (result) {
      window.cancelAnimationFrame(rafId)
      return
    }
    lastScrollTop = scrollTop // 记录此次滚动的位置
    window.requestAnimationFrame(handleScroll)
  }
}

/**
 * 节流
 * @param fn
 * @param delay
 */
export function throttle (fn: Function, delay: number = 3000) {
  let timer: null | number = null
  let startTime: number
  return function (...args: any[]) {
    // @ts-ignore
    const ctx = this
    const now = new Date().getTime()
    if (startTime && now < startTime + delay) {
      if (timer) clearTimeout(timer)
      timer = window.setTimeout(() => {
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
  return `${zhMonths[month]} ${day} ${year}`
}

/**
 * 获取 localstorage 存储的数据
 * */
export function getLocalStorage (key: string): null | string {
  return localStorage.getItem(key)
}

/**
 * 将数据存储到 localstorage
 * */
export function setLocalStorage (key: string, value: string): void {
  localStorage.setItem(key, value)
}

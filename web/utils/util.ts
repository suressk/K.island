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
export function debounce (fn: Function, delay: number, immediate: boolean) {
  let timer: null | number = null
  return function () {
    // @ts-ignore
    let ctx = this
    let callNow
    if (timer) clearTimeout(timer)
    if (immediate) {
      callNow = !timer
      if (callNow) {
        fn.apply(ctx, arguments)
      }
      timer = window.setTimeout(() => {
        timer = null
      }, delay)
    } else {
      timer = window.setTimeout(() => {
        fn.apply(ctx, arguments)
      }, delay)
    }
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
    const ctx = this,
      now = new Date().getTime()
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

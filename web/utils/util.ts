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

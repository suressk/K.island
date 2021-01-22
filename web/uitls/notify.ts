import { NotifyOptions } from './index'
/**
 * 创建 Notify 组件
 */
export function CreateNotify (options: NotifyOptions): HTMLElement {
    const className = `notify notify-${options.type}`
    const el = document.createElement('div')
    el.className = className
    const header = document.createElement('div')
    header.className = 'notify-header'
    header.innerText = options.title
    const body = document.createElement('div')
    body.className = 'notify-header'
    body.innerText = options.message
    el.appendChild(header)
    el.appendChild(body)
    return el
}

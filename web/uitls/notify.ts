// import { NotifyOptions } from './index'
export interface NotifyOptions {
    type: 'success' | 'warning' | 'info' | 'error';
    title: string;
    message: string;
}

/**
 * 创建 Notify 组件
 */
export function createNotify (options: NotifyOptions): HTMLElement {
    const className = `notify notify-enter notify-${options.type}`
    const el = document.createElement('div')
    el.className = className
    const header = document.createElement('div')
    const icon = document.createElement('i')
    icon.className = 'iconfont icon-notice'
    header.className = 'notify-header'
    const titleNode = document.createTextNode(options.title)
    header.appendChild(icon)
    header.appendChild(titleNode)
    const body = document.createElement('div')
    body.className = 'notify-body'
    body.innerText = options.message
    el.appendChild(header)
    el.appendChild(body)
    return el
}

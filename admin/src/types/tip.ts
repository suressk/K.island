import { VNode } from 'vue'

export interface ConfirmOptions {
    content: string
    onOk: (...args: any[]) => any
    onCancel: (...args: any[]) => any
    type?: MessageType,
    icon?: VNode,
    title?: string
    okText?: string
    cancelText?: string
}

export type MessageType = 'success' | 'warning' | 'info' | 'error'

export type IconType = MessageType

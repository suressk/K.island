import { VNode } from 'vue'

export interface ConfirmOptions {
    type: MessageType,
    content: string
    onOk: (...args: any[]) => any
    onCancel: (...args: any[]) => any
    icon?: VNode,
    title?: string
    okText?: string
    cancelText?: string
}

export type MessageType = 'success' | 'warning' | 'info' | 'error'

export type IconType = MessageType


export interface ConfirmOptions {
    content: string
    onOk: (...args: any[]) => any
    onCancel: (...args: any[]) => any
    title?: string
    okText?: string
    cancelText?: string
}

export type MessageType = 'success' | 'warning' | 'info' | 'error'

export type IconType = MessageType

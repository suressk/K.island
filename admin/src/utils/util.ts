import { notification, Modal } from 'ant-design-vue'
import { ACCESS_TOKEN } from '../store/mutation-types'
import {
    TokenInfo,
    YearDataList,
    RecordItem
} from '../types'
import { ConfirmOptions, MessageType } from '../types/tip'

/**
 * Notification 消息通知
 * @param {*} type 提示类型
 * @param {*} message 提示标题
 * @param {*} description 提示信息内容
 * @param {*} duration 持续时长（s）
 * */
export function Notify (
    type: MessageType = 'success',
    message: string,
    description: string,
    duration = 4.5
) {
    notification[type]({ message, description, duration })
}

/**
 * 确认
 * */
export function Confirm (options: ConfirmOptions) {
    Modal.confirm({
        centered: true,
        content: options.content,
        onOk: options.onOk,
        onCancel: options.onCancel,
        title: options.title,
        okText: options.okText,
        cancelText: options.cancelText
    })
}

/**
 * LocalStorage 存储 token 信息
 * @param {*} info ({ token: string, expireTime: number }) token 信息
 * */
export function setStorageToken (info: TokenInfo): void {
    const now: number = new Date().getTime()
    const tokenInfo: string = JSON.stringify({
        token: info.token,
        expireTime: now + info.expireTime * 1000
    })
    localStorage.setItem(ACCESS_TOKEN, tokenInfo)
}

/**
 * 获取并校验 token 是否存在或已过期
 * 过期则从 LocalStorage 中移除 token
 * */
export function getStorageToken (): null | string {
    const tokenInfoStr: null | string = localStorage.getItem(ACCESS_TOKEN)
    // token 存在
    if (tokenInfoStr !== null) {
        const { token, expireTime }: TokenInfo = JSON.parse(tokenInfoStr)
        const now: number = new Date().getTime()
        // 未过期
        if (expireTime > now) {
            return token
        }
        // token 过期 => 移除 token
        localStorage.removeItem(ACCESS_TOKEN)
    }
    return null
}

export function setStorageItem (name: string, value: string): void {
    localStorage.setItem(name, value)
}

export function getStorageItem (name: string): null | string {
    return localStorage.getItem(name)
}

/**
 * 移除 LocalStorage 中的相关项
 * */
export function removeStorageItem (name: string): void {
    const infoStr: null | string = localStorage.getItem(name)
    if (infoStr) {
        localStorage.removeItem(name)
    }
}

/**
 * 设置 cookie
 * @param {*} name cookie 名
 * @param {*} value cookie 值
 * @param {*} expireTime cookie 过期时长（s）
 * */
export function setCookie (name: string, value: string, expireTime: number) {
    const expire: Date = new Date()
    expire.setTime(expire.getTime() + expireTime * 1000)
    document.cookie = name + '=' + escape(value) + ';path=/' + ';expires=' + expire.toUTCString()
}

export function getCookie (name: string): string | null {
    const matchRes: null | string[] = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
    if (matchRes !== null) {
        return matchRes[2]
    } else {
        return null
    }
}

export function deleteCookie (name: string): void {
    const cookieVal = getCookie(name)
    if (cookieVal !== null) {
        const expired = new Date()
        expired.setTime(expired.getTime() - 1)
        document.cookie = name + '=' + cookieVal + ';expires=' + expired.toUTCString()
    }
}

/**
 * 平铺按年分组的文章列表
 * */
export function plainArticleList (records: YearDataList<RecordItem>): RecordItem[] {
    const years = Object.keys(records)
    const len = years.length
    const result: RecordItem[] = []
    for (let i = 0; i < len; i++) {
        const list = records[years[i]].map(item => {
            return {
                ...item,
                show: item.is_delete === 0
            }
        })
        result.push(...list)
    }
    return result
}

/**
 * file 转换为 Base64 编码
 * */
function transferBase64Code (file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

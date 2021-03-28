import { notification, Modal } from 'ant-design-vue'
import { ACCESS_TOKEN, STORAGE_PREFIX } from '../store/mutation-types'
import {
    TokenInfo,
    YearDataList,
    RecordItem, Pagination
} from '../types'
import { ConfirmOptions, MessageType } from '../types/tip'
import DAYJS from 'dayjs'

/**
 * Notification 消息通知
 * @param {*} message 提示标题
 * @param {*} description 提示信息内容
 * @param {*} type 提示类型
 * @param {*} duration 持续时长（s）
 * */
export function notify (
    message: string,
    description: string,
    type: MessageType = 'info',
    duration = 4.5
) {
    notification[type]({ message, description, duration })
}

export function infoNotify(description: string) {
    notification.info({
        message: 'Something wrong~',
        description
    })
}
export function successNotify(description: string) {
    notification.success({
        message: 'Congratulations~',
        description
    })
}
export function warningNotify(description: string) {
    notification.warning({
        message: 'Sorry~',
        description
    })
}
export function errorNotify(description: string, message: string = 'Something wrong~') {
    notification.error({
        message,
        description
    })
}

/**
 * 确认
 * */
export function Confirm (options: ConfirmOptions) {
    Modal.confirm({
        centered: true,
        type: options.type,
        icon: options.icon,
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
    const KEY = STORAGE_PREFIX + ACCESS_TOKEN
    localStorage.setItem(KEY, tokenInfo)
}

/**
 * 获取并校验 token 是否存在或已过期
 * 过期则从 LocalStorage 中移除 token
 * */
export function getStorageToken (): null | string {
    const KEY = STORAGE_PREFIX + ACCESS_TOKEN
    const tokenInfoStr: null | string = localStorage.getItem(KEY)
    // token 存在
    if (tokenInfoStr !== null) {
        const { token, expireTime }: TokenInfo = JSON.parse(tokenInfoStr)
        const now: number = new Date().getTime()
        // 未过期
        if (expireTime > now) {
            return token
        }
        // token 过期 => 移除 token
        localStorage.removeItem(KEY)
    }
    return null
}

export function setStorageItem (name: string, value: string): void {
    const KEY = STORAGE_PREFIX + name
    localStorage.setItem(KEY, value)
}

export function getStorageItem (name: string): null | string {
    const KEY = STORAGE_PREFIX + name
    return localStorage.getItem(KEY)
}

/**
 * 移除 LocalStorage 中的相关项
 * */
export function removeStorageItem (name: string): void {
    const KEY = STORAGE_PREFIX + name
    const infoStr: null | string = localStorage.getItem(KEY)
    if (infoStr !== null) {
        localStorage.removeItem(KEY)
    }
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
                show: item.is_delete === 0,
                createTime: formatTime(item.ctime),
                updateTime: formatTime(item.utime)
            }
        })
        result.push(...list)
    }
    return result
}

/**
 * file 转换为 Base64 编码
 * */
export function convertAsBase64Code (file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

function formatTime (
    time: number,
    timeFormat: string = 'YYYY-MM-DD HH:mm'
) {
    return DAYJS(time).format(timeFormat)
}

interface CtimeItem {
    ctime: number
}
/**
 * format time
 * */
export function mapFormatCtimeList<T extends CtimeItem>(list: T[]) {
    return list.map(
        item => ({
            ...item,
            createTime: formatTime(item.ctime)
        })
    )
}

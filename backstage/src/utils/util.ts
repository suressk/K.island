import { ElNotification } from 'element-plus'
import { ACCESS_TOKEN } from '@/store/mutation-types'

/**
 * Notification 消息通知
 * @param {*} type 提示类型
 * @param {*} title 提示标题
 * @param {*} message 提示信息内容
 * @param {*} duration 持续时长（s）
 * */
export function Notify (type = 'success', title: string, message: string, duration = 3000) {
  /* eslint-disable */
  // @ts-ignore
  ElNotification({ type, title, message, duration })
}

interface TokenInfo {
  token: string; // token 本身
  expireTime: number; // 过期时间（s）
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

/**
 * 移除 LocalStorage 的 token 信息
 * */
export function removeStorageToken (): void {
  const tokenInfoStr: null | string = localStorage.getItem(ACCESS_TOKEN)
  if (tokenInfoStr) {
    localStorage.removeItem(ACCESS_TOKEN)
  }
}

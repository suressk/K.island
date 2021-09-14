// import { TokenInfo } from '@/types'
import { STORAGE_PREFIX } from '@/types/constant'

// LocalStorage 操作
/**
 * @description localStorage 存储一项
 * @author Saul
 * @date 14/09/2021
 * @export
 * @template V
 * @param {string} name item key
 * @param {V} value item value
 * @param {number} expired expired time
 */
export function setStorageItem<V>(name: string, value: V, expired: number): void {
  const [KEY, EXPIRED_KEY] = getStorageKey(name)
  localStorage.setItem(KEY, JSON.stringify(value))
  if (expired) {
    const expiredTime = Date.now() + expired
    localStorage.setItem(EXPIRED_KEY, JSON.stringify(expiredTime))
  }
}

export function getStorageItem<V>(name: string): null | V {
  const [KEY, EXPIRED_KEY] = getStorageKey(name)
  const expired = localStorage.getItem(EXPIRED_KEY)
  // 已过期，移除
  if (expired && JSON.parse(expired) < Date.now()) {
    delStorageItem(name)
    return null
  }
  const value = localStorage.getItem(KEY)
  if (value !== null) {
    return JSON.parse(value) as V
  }
  return null
}

export function delStorageItem(name: string): void {
  const [KEY, EXPIRED_KEY] = getStorageKey(name)
  localStorage.removeItem(KEY)
  localStorage.removeItem(EXPIRED_KEY)
}

function getStorageKey(name: string) {
  return [STORAGE_PREFIX + name, `${STORAGE_PREFIX}${name}_expired`]
}